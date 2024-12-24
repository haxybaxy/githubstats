import { gql } from '@apollo/client';

/**
 * Query to fetch basic user information
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
