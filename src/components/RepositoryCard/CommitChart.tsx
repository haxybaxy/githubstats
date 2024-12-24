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
import type { TooltipItem } from 'chart.js';

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
    errorPolicy: 'all',
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-only',
    pollInterval: 0,
  });

  if (loading) return <div className="h-[100px] animate-pulse bg-gray-200 rounded"></div>;

  if (error) {
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

  const commits = data?.repository?.defaultBranchRef?.target?.history?.nodes;
  if (!commits) {
    return (
      <div className="h-[100px] flex items-center justify-center text-sm text-gray-500 border border-gray-200 rounded">
        No commit data available
      </div>
    );
  }

  const commitsByDay = commits.reduce((acc: { [key: string]: number }, commit: { committedDate: string }) => {
    const date = new Date(commit.committedDate).toISOString().split('T')[0];
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const dates = Array.from({ length: 90 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d.toISOString().split('T')[0];
  }).reverse();

  const chartData = {
    labels: dates,
    datasets: [
      {
        data: dates.map(date => commitsByDay[date] || 0),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.1)',
        tension: 0.4,
        fill: true,
        borderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        display: false, // Hide x-axis
      },
      y: {
        display: false, // Hide y-axis
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false, // Hide legend
      },
      tooltip: {
        enabled: true,
        callbacks: {
          title: (context: TooltipItem<'line'>[]) => {
            return new Date(dates[context[0].dataIndex]).toLocaleDateString();
          },
          label: (context: TooltipItem<'line'>) => {
            return `${context.raw} commits`;
          },
        },
        displayColors: false, // Hide color box in tooltip
      },
    },
    elements: {
      point: {
        radius: 0, // Hide points
        hoverRadius: 4, // Show points on hover
      },
    },
    interaction: {
      intersect: false,
      mode: 'nearest' as const,
    },
  };

  try {
    return (
      <div className="h-[100px] mt-4 p-2">
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
