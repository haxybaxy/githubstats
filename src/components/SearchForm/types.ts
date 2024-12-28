export interface SearchFormProps {
  username: string;
  onUsernameChange: (username: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  placeholder: string;
  isLoading?: boolean;
  className?: string;
}

export interface SearchUser {
  login: string;
  name?: string;
  avatarUrl: string;
}
