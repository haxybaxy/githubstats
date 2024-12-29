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

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Title
);

/**
 * Props for the CommitChart component
 *
 * @interface CommitChartProps
 * @property {string} owner - Repository owner's username
 * @property {string} repoName - Name of the repository
 */
export interface CommitChartProps {
  owner: string;
  repoName: string;
}

/**
 * Displays a line chart showing repository commit activity over the last 90 days
 *
 * Features:
 * - Fetches commit history using GitHub GraphQL API
 * - Displays daily commit frequency as a line chart
 * - Interactive tooltips showing date and commit count
 * - Smooth line transitions with tension
 * - Area fill for visual emphasis
 * - Responsive design that maintains aspect ratio
 *
 * Visual States:
 * - Loading: Shows animated placeholder
 * - Error: Displays appropriate error message
 * - Empty: Shows message when no commit data available
 * - Rate Limited: Special message for API rate limiting
 *
 * Chart Configuration:
 * - 90-day time window
 * - Hidden axes for clean appearance
 * - No data points for smoother look
 * - Nearest point interaction mode
 * - Custom tooltip formatting
 *
 * Error Handling:
 * - API rate limit detection
 * - Rendering error fallback
 * - Console error logging
 * - Cache-first data strategy
 *
 * @param props - Component properties
 * @param props.owner - Repository owner's username
 * @param props.repoName - Name of the repository
 * @returns The rendered commit chart or appropriate fallback
 *
 * @example
 * ```tsx
 * <CommitChart owner="facebook" repoName="react" />
 * ```
 */
export const CommitChart = ({ owner, repoName }: CommitChartProps) => {
  /**
   * Fetch commit data from GitHub API with caching strategy
   * Uses cache-first policy to minimize API calls
   */
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

  // Handle loading state
  if (loading) return <div className="h-[100px] animate-pulse bg-gray-200 dark:bg-gray-800 rounded"></div>;

  // Handle error states
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

  /**
   * Process commit data into daily counts
   * Creates a mapping of dates to number of commits
   *
   * @param commits - Array of commit data from GitHub API
   * @returns Object mapping dates to commit counts
   */
  const commitsByDay = commits.reduce((acc: { [key: string]: number }, commit: { committedDate: string }) => {
    const date = new Date(commit.committedDate).toISOString().split('T')[0];
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  /**
   * Generate array of dates for the last 90 days
   * Used as x-axis labels and for data alignment
   *
   * @returns Array of ISO date strings
   */
  const dates = Array.from({ length: 90 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d.toISOString().split('T')[0];
  }).reverse();

  /**
   * Chart configuration and options
   * Defines visual appearance and behavior of the chart
   */
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

  /**
   * Chart options configuration
   */
  const options = {
    layout: {
      padding: {
        top: 20,
        bottom: 10,
      }
    },
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
          /**
           * Format the tooltip title to show the date
           */
          title: (context: TooltipItem<'line'>[]) => {
            return new Date(dates[context[0].dataIndex]).toLocaleDateString();
          },
          /**
           * Format the tooltip label to show commit count
           */
          label: (context: TooltipItem<'line'>) => {
            return `${context.raw} commits`;
          },
        },
        displayColors: false,
        backgroundColor: '#1f2937',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgb(229 231 235)',
        borderWidth: 1,
        padding: 8,
      },
    },
    elements: {
      point: {
        radius: 0, // Hide points
        hoverRadius: 0, // Hide points on hover
      },
    },
    interaction: {
      intersect: false,
      mode: 'nearest' as const,
    },
  };

  try {
    return (
      <div className="h-[100px] mt-4" data-testid="commit-chart">
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
