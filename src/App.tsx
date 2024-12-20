import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER_REPOS } from './graphql/queries';
import { UserProfile } from './components/UserProfile';
import { StatsGrid } from './components/StatsGrid';
import { RepositoryCard } from './components/RepositoryCard';
import { SearchForm } from './components/SearchForm';
import { Repository } from './types/github';

function App() {
  const [username, setUsername] = useState('');
  const [searchExecuted, setSearchExecuted] = useState(false);

  const { loading, error, data } = useQuery(GET_USER_REPOS, {
    variables: { username },
    skip: !searchExecuted,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchExecuted(true);
  };

  const stats = data?.user ? [
    { label: 'Total Commits', value: data.user.contributionsCollection.totalCommitContributions },
    { label: 'Total PRs', value: data.user.contributionsCollection.totalPullRequestContributions },
    { label: 'Total Issues', value: data.user.contributionsCollection.totalIssueContributions },
    { label: 'Total Repositories', value: data.user.repositories.totalCount },
  ] : [];

  return (
    <div className="min-h-screen w-screen bg-gray-100 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            GitStats
          </h1>

          <SearchForm
            username={username}
            onUsernameChange={setUsername}
            onSubmit={handleSearch}
          />

          {data?.user && (
            <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
              <UserProfile user={data.user} />
              <StatsGrid stats={stats} />
            </div>
          )}

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {loading && <p>Loading repositories...</p>}
            {error && <p className="text-red-500">Error: {error.message}</p>}
            {data?.user?.repositories.nodes.map((repo: Repository) => (
              <RepositoryCard key={repo.id} repository={repo} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
