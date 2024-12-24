import { gql } from '@apollo/client';

export const GET_USER_REPOS = gql`
query GetUserRepositories($username: String!) {
  user(login: $username) {
    # Basic user info
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

    # Contribution stats
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

    # Repository stats - added isFork: false, isArchived: false, and ownerAffiliations: OWNER
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

    # Separate queries for accurate total counts
    pullRequests {
      totalCount
    }
    issues {
      totalCount
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
