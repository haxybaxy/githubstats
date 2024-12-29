/**
 * Interface representing a GitHub repository
 *
 * Contains detailed information about a GitHub repository including
 * metadata, statistics, and language information. Used for displaying
 * repository cards and lists.
 *
 * @interface Repository
 */
export interface Repository {
  /** Unique identifier for the repository */
  id: string;

  /** Repository name */
  name: string;

  /** Repository description (can be null if not set) */
  description: string | null;

  /** Full URL to the repository on GitHub */
  url: string;

  /** Number of users who have starred the repository */
  stargazerCount: number;

  /** Number of repository forks */
  forkCount: number;

  /** ISO timestamp of the last update to the repository */
  updatedAt: string;

  /** Primary programming language information
   * @property name - Language name
   * @property color - Language color code (hex)
   */
  primaryLanguage: {
    name: string;
    color: string;
  } | null;

  /** All programming languages used in the repository
   * @property nodes - Array of language objects with name and color
   */
  languages: {
    nodes: {
      name: string;
      color: string;
    }[];
  };
}

/**
 * Interface representing a GitHub user profile
 *
 * Contains comprehensive user information including profile data,
 * statistics, contributions, and repository information. Used for
 * user profile displays and comparisons.
 *
 * @interface User
 */
export interface User {
  /** User's display name */
  name: string;

  /** GitHub username (login) */
  login: string;

  /** URL to user's avatar image */
  avatarUrl: string;

  /** User's bio/description */
  bio: string;

  /** User's location */
  location: string;

  /** User's website URL */
  websiteUrl: string;

  /** User's Twitter username */
  twitterUsername: string;

  /** Follower statistics
   * @property totalCount - Number of followers
   */
  followers: {
    totalCount: number;
  };

  /** Following statistics
   * @property totalCount - Number of users being followed
   */
  following: {
    totalCount: number;
  };

  /** Comprehensive contribution data
   * @property totalCommitContributions - Total number of commits
   * @property totalPullRequestContributions - Total number of PRs
   * @property totalIssueContributions - Total number of issues
   * @property totalRepositoryContributions - Total number of repos contributed to
   * @property contributionCalendar - Detailed contribution history
   */
  contributionsCollection: {
    totalCommitContributions: number;
    totalPullRequestContributions: number;
    totalIssueContributions: number;
    totalRepositoryContributions: number;
    contributionCalendar: {
      totalContributions: number;
      weeks: {
        contributionDays: {
          contributionCount: number;
          date: string;
        }[];
      }[];
    };
  };

  /** Repository information
   * @property totalCount - Total number of repositories
   * @property totalStargazers - Array of stargazer counts
   * @property nodes - Array of repository objects
   */
  repositories: {
    totalCount: number;
    totalStargazers: {
      stargazerCount: number;
    }[];
    nodes: Repository[];
  };

  /** Pull request statistics
   * @property totalCount - Total number of pull requests
   */
  pullRequests: {
    totalCount: number;
  };

  /** Issue statistics
   * @property totalCount - Total number of issues
   */
  issues: {
    totalCount: number;
  };

  /** Social media accounts
   * @property nodes - Array of social account objects
   */
  socialAccounts: {
    nodes: {
      provider: string;
      url: string;
    }[];
  };
}
