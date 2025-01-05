import { gql } from '@apollo/client';

/**
 * Query to fetch basic user information from GitHub
 *
 * Returns comprehensive user profile data including:
 * - Basic Information:
 *   - User's name and login
 *   - Avatar URL
 *   - Bio and location
 * - Social Links:
 *   - Website URL
 *   - Twitter username
 *   - Other social accounts (first 10)
 * - Network Statistics:
 *   - Follower count
 *   - Following count
 *
 * @example
 * ```tsx
 * const { data } = useQuery(GET_USER_INFO, {
 *   variables: { username: "octocat" }
 * });
 * ```
 */
export const GET_USER_INFO = gql`
  query GetUserInfo($username: String!) {
    user(login: $username) {
      name
      login
      avatarUrl
      url
      bio
      location
      websiteUrl
      twitterUsername
      socialAccounts(first: 10) {
        nodes {
          provider
          url
        }
      }
      followers {
        totalCount
      }
      following {
        totalCount
      }
    }
  }
`;

/**
 * Query to fetch user's contribution statistics
 *
 * Returns detailed contribution data including:
 * - Contribution Counts:
 *   - Total commit contributions
 *   - Total pull request contributions
 *   - Total issue contributions
 *   - Total repository contributions
 * - Contribution Calendar:
 *   - Daily contribution data
 *   - Weekly aggregated data
 *   - Total contributions
 * - Activity Metrics:
 *   - Pull request count
 *   - Issue count
 *
 * @example
 * ```tsx
 * const { data } = useQuery(GET_USER_CONTRIBUTIONS, {
 *   variables: { username: "octocat" }
 * });
 * ```
 */
export const GET_USER_CONTRIBUTIONS = gql`
  query GetUserContributions($username: String!) {
    user(login: $username) {
      contributionsCollection {
        totalCommitContributions
        totalPullRequestContributions
        totalIssueContributions
        totalRepositoryContributions
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
      pullRequests {
        totalCount
      }
      issues {
        totalCount
      }
    }
  }
`;

/**
 * Query to fetch user's repository information
 *
 * Returns detailed repository data including:
 * - Repository Overview:
 *   - Total repository count
 *   - Repository details for first 100 repos
 * - Repository Details:
 *   - Name and description
 *   - URL
 *   - Star and fork counts
 *   - Last update time
 * - Language Information:
 *   - Primary language with color
 *   - Top 10 languages used
 *
 * Query Parameters:
 * - Fetches first 100 repositories
 * - Sorted by stars (descending)
 * - Only includes repositories where user is owner
 * - Excludes archived repositories
 *
 *  Fetches first 100 repositories, sorted by stars
 *
 * @example
 * ```tsx
 * const { data } = useQuery(GET_USER_REPOS, {
 *   variables: { username: "octocat" }
 * });
 * ```
 */
export const GET_USER_REPOS = gql`
  query GetUserRepositories($username: String!) {
    user(login: $username) {
      repositories(
        first: 100,
        orderBy: { field: STARGAZERS, direction: DESC },
        ownerAffiliations: OWNER,
        isArchived: false
      ) {
        totalCount
        totalStargazers: nodes {
          stargazerCount
        }
        nodes {
          id
          name
          description
          url
          stargazerCount
          forkCount
          updatedAt
          primaryLanguage {
            name
            color
          }
          languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
            nodes {
              name
              color
            }
          }
        }
      }
    }
  }
`;

/**
 * Query to fetch repository commit history
 *
 * Returns commit data including:
 * - Commit dates for the default branch
 * - Limited to commits since 2024-01-01
 * - Maximum of 100 commits
 *
 * Query Parameters:
 * - Repository owner and name
 * - Date filter (since 2024-01-01)
 * - Limit of 100 commits
 *
 * @example
 * ```tsx
 * const { data } = useQuery(GET_REPO_COMMITS, {
 *   variables: {
 *     owner: "facebook",
 *     name: "react"
 *   }
 * });
 * ```
 */
export const GET_REPO_COMMITS = gql`
  query GetRepositoryCommits($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      defaultBranchRef {
        target {
          ... on Commit {
            history(first: 100, since: "2024-01-01T00:00:00Z") {
              nodes {
                committedDate
              }
            }
          }
        }
      }
    }
  }
`;

/**
 * Query to search for users as typing
 *
 * Returns basic user information for search results:
 * - Login (username)
 * - Display name
 * - Avatar URL
 *
 * Query Parameters:
 * - Search query string
 * - Limited to 5 results for performance
 * - Only returns USER type results
 *
 * @example
 * ```tsx
 * const { data } = useQuery(SEARCH_USERS, {
 *   variables: { query: "octo" }
 * });
 * ```
 */
export const SEARCH_USERS = gql`
  query SearchUsers($query: String!) {
    search(query: $query, type: USER, first: 5) {
      nodes {
        ... on User {
          login
          name
          avatarUrl
        }
      }
    }
  }
`;
