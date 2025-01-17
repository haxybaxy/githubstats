import { Repository } from '../../types/github';
import { CommitChart } from './CommitChart';
import { StarIcon, RepoForkedIcon } from '@primer/octicons-react';

/**
 * Props for the RepositoryCard component
 * @interface RepositoryCardProps
 * @property {Repository} repository - Repository data from GitHub containing details like name, description, stats
 * @property {string} owner - Repository owner's username
 */
export interface RepositoryCardProps {
  repository: Repository;
  owner: string;
}

/**
 * Component that displays detailed information about a GitHub repository
 *
 * Features:
 * - Repository name with direct link to GitHub
 * - Repository description with line clamping
 * - Primary programming language with color indicator
 * - Star and fork counts with links to respective pages
 * - Last update timestamp
 * - Commit activity visualization
 *
 * Visual Elements:
 * - Responsive card layout with proper spacing
 * - Dark mode support
 * - Hover states for interactive elements
 * - Color-coded language indicator
 * - Truncated description for long text
 *
 * Accessibility:
 * - Semantic HTML structure
 * - Proper ARIA labels for icons
 * - External link indicators
 * - Keyboard navigation support
 *
 * Layout Structure:
 * - Card container with rounded corners and border
 * - Flexbox layout for content organization
 * - Grid system for responsive behavior
 * - Auto-height with minimum constraints
 *
 * @param props - Component properties
 * @param props.repository - Repository data from GitHub
 * @param props.owner - Repository owner's username
 * @returns The rendered repository card
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
  <div className="h-[250px] py-4 sm:py-6 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg px-3 sm:px-4">
    <div className="flex flex-col h-full">
      <div className="flex-shrink-0">
        {/* Repository name and link */}
        <div className="flex items-center flex-wrap">
          <h2 className="text-lg sm:text-xl leading-6">
            <a
              href={repository.url}
              className="font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {repository.name}
            </a>
          </h2>
        </div>

        {/* Repository description */}
        {repository.description && (
          <p className="text-left mt-1 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {repository.description}
          </p>
        )}

        {/* Repository metadata */}
        <div className="mt-2 flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-gray-600 dark:text-gray-400">
          {/* Primary language */}
          {repository.primaryLanguage && (
            <div className="flex items-center gap-1">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: repository.primaryLanguage.color }}
                aria-hidden="true"
              />
              <span>{repository.primaryLanguage.name}</span>
            </div>
          )}

          {/* Star count */}
          {repository.stargazerCount > 0 && (
            <a
              href={`${repository.url}/stargazers`}
              className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              <StarIcon size={16} />
              <span>{repository.stargazerCount.toLocaleString()}</span>
            </a>
          )}

          {/* Fork count */}
          {repository.forkCount > 0 && (
            <a
              href={`${repository.url}/network/members`}
              className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              <RepoForkedIcon size={16} />
              <span>{repository.forkCount.toLocaleString()}</span>
            </a>
          )}

          {/* Last updated */}
          {repository.updatedAt && (
            <span>
              Updated {new Date(repository.updatedAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: new Date(repository.updatedAt).getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
              })}
            </span>
          )}
        </div>
      </div>

      <div className="mt-auto">
        <CommitChart owner={owner} repoName={repository.name} />
      </div>
    </div>
  </div>
);
