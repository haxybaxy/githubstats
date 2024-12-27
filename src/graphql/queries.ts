import { gql } from '@apollo/client';

/**
 * Query to fetch basic user information from GitHub
 *
 * Returns:
 * - User's name and login
 * - Avatar URL
 * - Bio and location
 * - Website and Twitter links
 * - Follower and following counts
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
 * Returns:
 * - Total commit contributions
 * - Total pull request contributions
 * - Total issue contributions
 * - Total repository contributions
 * - Contribution calendar data
 * - Pull request and issue counts
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
 * Returns:
 * - Total repository count
 * - Repository details:
 *   - Name and description
 *   - URL
 *   - Star and fork counts
 *   - Last update time
 *   - Primary language
 *   - Top 10 languages used
 *
 * @note Fetches first 100 repositories, sorted by stars
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
 * Returns:
 * - Commit dates for the default branch
 * - Limited to commits since 2024-01-01
 * - Maximum of 100 commits
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
 * Limited to 5 results for performance
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
