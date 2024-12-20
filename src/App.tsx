import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER_REPOS } from './graphql/queries';
import { SearchForm } from './components/SearchForm';
import { UserSection } from './components/UserSection/UserSection';
import { RepositoryList } from './components/RepositoryList/RepositoryList';

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

          {data?.user && <UserSection user={data.user} />}

          {searchExecuted && (
            <RepositoryList
              repositories={data?.user?.repositories.nodes || []}
              loading={loading}
              error={error}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
