import { Repository } from '../../types/github';
import { CommitChart } from './CommitChart';

export interface RepositoryCardProps {
  repository: Repository;
  owner: string;
}

export const RepositoryCard = ({ repository, owner }: RepositoryCardProps) => (
  <div className="bg-white p-6 rounded-lg shadow-md text-left">
    <h2 className="text-xl font-semibold">
      <a href={repository.url} className="text-blue-600 hover:underline">
        {repository.name}
      </a>
    </h2>
    <p className="mt-2 text-black">{repository.description}</p>
    <div className="mt-4 flex items-center space-x-4">
      {repository.primaryLanguage && (
        <span className="flex items-center">
          <span
            className="w-3 h-3 rounded-full mr-1"
            style={{ backgroundColor: repository.primaryLanguage.color }}
          ></span>
          {repository.primaryLanguage.name}
        </span>
      )}
      <span>⭐ {repository.stargazerCount}</span>
      <span>🍴 {repository.forkCount}</span>
    </div>

    <CommitChart owner={owner} repoName={repository.name} />
  </div>
);
