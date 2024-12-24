import { Repository } from '../../types/github';
import { CommitChart } from './CommitChart';

/**
 * Props for the RepositoryCard component
 * @interface RepositoryCardProps
 */
export interface RepositoryCardProps {
  /** Repository data from GitHub */
  repository: Repository;
  /** Repository owner's username */
  owner: string;
}

/**
 * Component that displays detailed information about a GitHub repository
 *
 * This component renders:
 * - Repository name with link
 * - Repository description
 * - Primary programming language with color indicator
 * - Star and fork counts
 * - Commit activity chart
 *
 * @param {RepositoryCardProps} props - Component properties
 * @returns {JSX.Element} The rendered repository card
 *
 * @example
 * ```tsx
 * <RepositoryCard
 *   repository={{
 *     name: "react",
 *     description: "A JavaScript library for building user interfaces",
 *     url: "https://github.com/facebook/react",
 *     stargazerCount: 12345,
 *     forkCount: 678,
 *     primaryLanguage: { name: "JavaScript", color: "#f1e05a" }
 *   }}
 *   owner="facebook"
 * />
 * ```
 */
export const RepositoryCard = ({ repository, owner }: RepositoryCardProps) => (
  <div className="bg-white p-6 rounded-lg shadow-md text-left">
    {/* Repository name and link */}
    <h2 className="text-xl font-semibold">
      <a
        href={repository.url}
        className="text-blue-600 hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {repository.name}
      </a>
    </h2>

    {/* Repository description */}
    <p className="mt-2 text-black">{repository.description}</p>

    {/* Repository statistics */}
    <div className="mt-4 flex items-center space-x-4">
      {/* Primary language indicator */}
      {repository.primaryLanguage && (
        <span className="flex items-center">
          <span
            className="w-3 h-3 rounded-full mr-1"
            style={{ backgroundColor: repository.primaryLanguage.color }}
            aria-hidden="true"
          ></span>
          {repository.primaryLanguage.name}
        </span>
      )}
      {/* Star count */}
      <span title={`${repository.stargazerCount} stars`}>
        ⭐ {repository.stargazerCount}
      </span>
      {/* Fork count */}
      <span title={`${repository.forkCount} forks`}>
        🍴 {repository.forkCount}
      </span>
    </div>

    {/* Commit activity chart */}
    <CommitChart owner={owner} repoName={repository.name} />
  </div>
);
