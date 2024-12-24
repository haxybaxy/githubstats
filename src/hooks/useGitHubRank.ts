import { useMemo } from 'react';

function exponentialCdf(x: number): number {
  return 1 - 2 ** -x;
}

function logNormalCdf(x: number): number {
  return x / (1 + x);
}

interface GitHubUser {
  contributionsCollection: {
    totalCommitContributions: number;
  };
  repositories: {
    totalCount: number;
    totalStargazers: { stargazerCount: number }[];
  };
  followers: {
    totalCount: number;
  };
  pullRequests: {
    totalCount: number;
  };
  issues: {
    totalCount: number;
  };
}

export function useGitHubRank(user1: GitHubUser | null, user2: GitHubUser | null) {
  return useMemo(() => {
    if (!user1 || !user2) return null;

    const calculateUserScore = (user: GitHubUser, userLabel: string) => {
      const commits = user.contributionsCollection.totalCommitContributions;
      const stars = user.repositories.totalStargazers.reduce(
        (sum, repo) => sum + repo.stargazerCount,
        0
      );
      const prs = user.pullRequests.totalCount;
      const issues = user.issues.totalCount;
      const repos = user.repositories.totalCount;
      const followers = user.followers.totalCount;
      const reviews = 0; // We don't have this data

      console.group(`${userLabel} Stats (matching UI display):`);
      console.log('Total Commits:', commits);
      console.log('Total Stars:', stars);
      console.log('Total PRs:', prs);
      console.log('Total Issues:', issues);
      console.log('Total Repositories:', repos);
      console.log('Followers:', followers);

      const COMMITS_MEDIAN = 250;
      const PRS_MEDIAN = 50;
      const ISSUES_MEDIAN = 25;
      const REVIEWS_MEDIAN = 2;
      const STARS_MEDIAN = 50;
      const FOLLOWERS_MEDIAN = 10;

      const COMMITS_WEIGHT = 2;
      const PRS_WEIGHT = 3;
      const ISSUES_WEIGHT = 1;
      const REVIEWS_WEIGHT = 1;
      const STARS_WEIGHT = 4;
      const FOLLOWERS_WEIGHT = 1;

      const TOTAL_WEIGHT =
        COMMITS_WEIGHT +
        PRS_WEIGHT +
        ISSUES_WEIGHT +
        REVIEWS_WEIGHT +
        STARS_WEIGHT +
        FOLLOWERS_WEIGHT;

      const rank =
        1 -
        (COMMITS_WEIGHT * exponentialCdf(commits / COMMITS_MEDIAN) +
          PRS_WEIGHT * exponentialCdf(prs / PRS_MEDIAN) +
          ISSUES_WEIGHT * exponentialCdf(issues / ISSUES_MEDIAN) +
          REVIEWS_WEIGHT * exponentialCdf(reviews / REVIEWS_MEDIAN) +
          STARS_WEIGHT * logNormalCdf(stars / STARS_MEDIAN) +
          FOLLOWERS_WEIGHT * logNormalCdf(followers / FOLLOWERS_MEDIAN)) /
        TOTAL_WEIGHT;

      const percentile = rank * 100;

      console.log('Individual Scores:');
      console.log('- Commit Score:', exponentialCdf(commits / COMMITS_MEDIAN));
      console.log('- PR Score:', exponentialCdf(prs / PRS_MEDIAN));
      console.log('- Issue Score:', exponentialCdf(issues / ISSUES_MEDIAN));
      console.log('- Review Score:', exponentialCdf(reviews / REVIEWS_MEDIAN));
      console.log('- Star Score:', logNormalCdf(stars / STARS_MEDIAN));
      console.log('- Follower Score:', logNormalCdf(followers / FOLLOWERS_MEDIAN));
      console.log('Final Percentile:', percentile);
      console.groupEnd();

      return percentile;
    };

    const score1 = calculateUserScore(user1, "User 1");
    const score2 = calculateUserScore(user2, "User 2");

    const winner = score1 < score2 ? 1 : 2;
    const scoreDiff = Math.abs(score1 - score2);

    console.log('Comparison Results:');
    console.log(`User 1 (${score1.toFixed(2)}) vs User 2 (${score2.toFixed(2)})`);
    console.log('Winner:', winner);
    console.log('Score Difference:', scoreDiff.toFixed(2));

    return {
      user1Score: score1,
      user2Score: score2,
      winner,
      scoreDiff
    };
  }, [user1, user2]);
}
