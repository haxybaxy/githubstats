import { useMemo } from 'react';
import { User } from '../types/github';

/**
 * Calculates the cumulative distribution function for an exponential distribution
 * @param {number} x - Input value
 * @returns {number} Probability value between 0 and 1
 */
function exponentialCdf(x: number): number {
  return 1 - 2 ** -x;
}

/**
 * Calculates the cumulative distribution function for a log-normal distribution
 * @param {number} x - Input value
 * @returns {number} Probability value between 0 and 1
 */
function logNormalCdf(x: number): number {
  return x / (1 + x);
}

/**
 * Custom hook that calculates and compares GitHub user rankings
 *
 * Features:
 * - Calculates individual scores for different metrics
 * - Applies weights to each metric
 * - Computes percentile scores
 * - Determines winner in comparison
 *
 * Metrics Used:
 * - Commit contributions
 * - Pull requests
 * - Issues
 * - Code reviews
 * - Repository stars
 * - Followers
 *
 * Score Calculation:
 * - Uses exponential CDF for activity metrics
 * - Uses log-normal CDF for popularity metrics
 * - Applies weighted averaging
 * - Converts to percentile
 *
 * @param user1 - First GitHub user data
 * @param user2 - Second GitHub user data
 * @returns Ranking results including scores and winner, or null if data missing
 *
 * @example
 * ```tsx
 * const rankingResult = useGitHubRank(user1Data, user2Data);
 * if (rankingResult) {
 *   console.log(`Winner: User ${rankingResult.winner}`);
 * }
 * ```
 */
export function useGitHubRank(user1: User | null, user2: User | null) {
  return useMemo(() => {
    if (!user1 || !user2) return null;

    /**
     * Calculates a user's score based on their GitHub metrics
     * @param {GitHubUser} user - User data to calculate score for
     * @param {string} userLabel - Label for console logging
     * @returns {number} User's percentile score
     */
    const calculateUserScore = (user: User) => {
      // Extract metrics
      const commits = user.contributionsCollection.totalCommitContributions;
      const stars = user.repositories.totalStargazers.reduce(
        (sum, repo) => sum + repo.stargazerCount,
        0
      );
      const prs = user.pullRequests.totalCount;
      const issues = user.issues.totalCount;
      const followers = user.followers.totalCount;
      const reviews = 0; // Not available in current data

      // Log user stats
      // console.group(`${userLabel} Stats (matching UI display):`);
      // console.log('Total Commits:', commits);
      // console.log('Total Stars:', stars);
      // console.log('Total PRs:', prs);
      // console.log('Total Issues:', issues);
      // console.log('Followers:', followers);

      // Define median values and weights
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

      // Calculate rank
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

      // Log individual scores
      // console.log('Individual Scores:');
      // console.log('- Commit Score:', exponentialCdf(commits / COMMITS_MEDIAN));
      // console.log('- PR Score:', exponentialCdf(prs / PRS_MEDIAN));
      // console.log('- Issue Score:', exponentialCdf(issues / ISSUES_MEDIAN));
      // console.log('- Review Score:', exponentialCdf(reviews / REVIEWS_MEDIAN));
      // console.log('- Star Score:', logNormalCdf(stars / STARS_MEDIAN));
      // console.log('- Follower Score:', logNormalCdf(followers / FOLLOWERS_MEDIAN));
      // console.log('Final Percentile:', percentile);
      // console.groupEnd();

      return percentile;
    };

    const score1 = calculateUserScore(user1);
    const score2 = calculateUserScore(user2);

    const winner = score1 < score2 ? 1 : 2;
    const scoreDiff = Math.abs(score1 - score2);

    // Log comparison results
    // console.log('Comparison Results:');
    // console.log(`User 1 (${score1.toFixed(2)}) vs User 2 (${score2.toFixed(2)})`);
    // console.log('Winner:', winner);
    // console.log('Score Difference:', scoreDiff.toFixed(2));

    return {
      user1Score: score1,
      user2Score: score2,
      winner,
      scoreDiff
    };
  }, [user1, user2]);
}
