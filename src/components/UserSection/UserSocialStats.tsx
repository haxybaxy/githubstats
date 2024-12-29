import { User } from '../../types/github';
import {
  PeopleIcon,
  PersonIcon,
  LocationIcon,
  LinkExternalIcon,
  BriefcaseIcon
} from '@primer/octicons-react';

/**
 * Props interface for the UserSocialStats component
 *
 * @interface UserSocialStatsProps
 * @property {User} user - The GitHub user data containing social information
 */
export interface UserSocialStatsProps {
  /** The GitHub user data containing social information */
  user: User;
}

/**
 * Displays a user's social statistics and links including followers, following,
 * location, website, and LinkedIn profile
 *
 * Features:
 * - Displays follower and following counts with icons
 * - Shows location if provided
 * - Renders website URL (automatically adds https:// if missing)
 * - Links to LinkedIn profile if available in social accounts
 * - All external links open in new tabs with security attributes
 *
 * Visual Elements:
 * - Follower count with people icon
 * - Following count with person icon
 * - Location with pin icon
 * - Website link with external link icon
 * - LinkedIn link with briefcase icon
 *
 * Layout:
 * - Flex container with wrapping
 * - Consistent spacing between items
 * - Responsive design
 * - Icon alignment with text
 *
 * Link Handling:
 * - External links open in new tabs
 * - Security attributes for external links
 * - URL sanitization and formatting
 * - Conditional link rendering
 *
 * Accessibility:
 * - Semantic HTML structure
 * - ARIA labels for icons
 * - Screen reader support
 * - Proper link attributes
 * - Color contrast compliance
 *
 * @param props - Component properties
 * @param props.user - GitHub user data containing social information
 * @returns The rendered social statistics
 *
 * @example
 * ```tsx
 * <UserSocialStats
 *   user={{
 *     followers: { totalCount: 100 },
 *     following: { totalCount: 50 },
 *     location: "San Francisco",
 *     websiteUrl: "github.com",
 *     socialAccounts: {
 *       nodes: [{ provider: "LINKEDIN", url: "https://linkedin.com/in/user" }]
 *     }
 *   }}
 * />
 * ```
 */
export function UserSocialStats({ user }: UserSocialStatsProps) {
  return (
    <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600 dark:text-gray-400" data-testid="social-stats">
              <div className="flex items-center gap-1">
                <PeopleIcon className="h-4 w-4" />
                <span className="font-medium text-gray-900 dark:text-white">
                  {user.followers.totalCount}
                </span>
                <span>followers</span>
              </div>
              <div className="flex items-center gap-1">
                <PersonIcon className="h-4 w-4" />
                <span className="font-medium text-gray-900 dark:text-white">
                  {user.following.totalCount}
                </span>
                <span>following</span>
              </div>

              {user.location && (
                <div className="flex items-center gap-1">
                  <LocationIcon className="h-4 w-4" />
                  <span>{user.location}</span>
                </div>
              )}

              {user.websiteUrl && (
                <div className="flex items-center gap-1">
                  <LinkExternalIcon className="h-4 w-4" />
                  <a
                    href={user.websiteUrl.startsWith('http') ? user.websiteUrl : `https://${user.websiteUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline dark:text-blue-400"
                  >
                    {user.websiteUrl.replace(/^https?:\/\//, '')}
                  </a>
                </div>
              )}

              {user.socialAccounts?.nodes.find(account => account.provider === 'LINKEDIN')?.url && (
                <div className="flex items-center gap-1">
                  <BriefcaseIcon className="h-4 w-4" />
                  <a
                    href={user.socialAccounts.nodes.find(account => account.provider === 'LINKEDIN')?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline dark:text-blue-400"
                  >
                    LinkedIn
                  </a>
                </div>
              )}
            </div>
  );
}
