import { useQuery } from '@apollo/client';
import { GET_REPO_COMMITS } from '../../graphql/queries';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Title
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Title
);

interface CommitChartProps {
  owner: string;
  repoName: string;
}

export const CommitChart = ({ owner, repoName }: CommitChartProps) => {
  const { loading, error, data } = useQuery(GET_REPO_COMMITS, {
    variables: {
      owner,
      name: repoName
    },
    errorPolicy: 'all',  // This will help handle errors more gracefully
  });

  if (loading) return <div className="h-[100px] animate-pulse bg-gray-200 rounded"></div>;

  if (error) {
    // Check if it's a rate limit error
    if (error.message.includes('API rate limit exceeded')) {
      return (
        <div className="h-[100px] flex items-center justify-center text-sm text-gray-500 border border-gray-200 rounded">
          GitHub API rate limit reached. Please try again later.
        </div>
      );
    }
    console.error('CommitChart error:', error);
    return null;
  }

  // Check if we have valid data
  const commits = data?.repository?.defaultBranchRef?.target?.history?.nodes;
  if (!commits) {
    return (
      <div className="h-[100px] flex items-center justify-center text-sm text-gray-500 border border-gray-200 rounded">
        No commit data available
      </div>
    );
  }

  // Group commits by day
  const commitsByDay = commits.reduce((acc: { [key: string]: number }, commit: any) => {
    const date = new Date(commit.committedDate).toISOString().split('T')[0];
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  // Create array of last 90 days
  const dates = Array.from({ length: 90 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d.toISOString().split('T')[0];
  }).reverse();

  const chartData = {
    labels: dates.map(date => new Date(date).toLocaleDateString()),
    datasets: [
      {
        label: 'Commits',
        data: dates.map(date => commitsByDay[date] || 0),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.1,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          precision: 0,
        },
      },
      x: {
        ticks: {
          maxTicksLimit: 12,
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          title: (context: any) => {
            return new Date(dates[context[0].dataIndex]).toLocaleDateString();
          },
          label: (context: any) => {
            return `Commits: ${context.raw}`;
          },
        },
      },
    },
  };

  try {
    return (
      <div className="h-[100px] mt-4">
        <Line data={chartData} options={options} />
      </div>
    );
  } catch (e) {
    console.error('Chart rendering error:', e);
    return (
      <div className="h-[100px] flex items-center justify-center text-sm text-gray-500 border border-gray-200 rounded">
        Error rendering chart
      </div>
    );
  }
};
