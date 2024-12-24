export interface Repository {
  id: string;
  name: string;
  description: string | null;
  url: string;
  stargazerCount: number;
  forkCount: number;
  updatedAt: string;
  primaryLanguage: {
    name: string;
    color: string;
  } | null;
  languages: {
    nodes: {
      name: string;
      color: string;
    }[];
  };
}

export interface User {
  name: string;
  login: string;
  avatarUrl: string;
  bio: string;
  location: string;
  websiteUrl: string;
  twitterUsername: string;
  followers: {
    totalCount: number;
  };
  following: {
    totalCount: number;
  };
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
  repositories: {
    totalCount: number;
    totalStargazers: {
      stargazerCount: number;
    }[];
    nodes: Repository[];
  };
  pullRequests: {
    totalCount: number;
  };
  issues: {
    totalCount: number;
  };
}
