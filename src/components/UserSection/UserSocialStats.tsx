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
 */
interface UserSocialStatsProps {
  /** The GitHub user data */
  user: User;
}

/**
 * Displays a user's social statistics and links including followers, following,
 * location, website, and LinkedIn profile
 *
 * @param props - Component properties
 * @param props.user - GitHub user data containing social information
 * @returns The rendered social statistics
 */
export function UserSocialStats({ user }: UserSocialStatsProps) {
  return (
    <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600 dark:text-gray-400">
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
