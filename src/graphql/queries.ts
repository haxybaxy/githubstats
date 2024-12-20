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

    # Repository stats
    repositories(first: 100, orderBy: { field: STARGAZERS, direction: DESC }) {
      totalCount
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
        issues {
          totalCount
        }
        pullRequests {
          totalCount
        }
      }
    }
  }
}
`;
