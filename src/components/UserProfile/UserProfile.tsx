import { User } from '../../types/github';

export interface UserProfileProps {
  user: User;
}

export const UserProfile = ({ user }: UserProfileProps) => (
  <div className="flex items-center space-x-4">
    <img
      src={user.avatarUrl}
      alt={user.login}
      className="w-20 h-20 rounded-full"
    />
    <div>
      <h2 className="text-2xl font-bold text-left">{user.name}</h2>
      <p className="text-gray-600 text-left">{user.bio}</p>
      <div className="mt-2 flex space-x-4">
        <span>👥 {user.followers.totalCount} followers</span>
        <span>👤 {user.following.totalCount} following</span>
      </div>
    </div>
  </div>
);
