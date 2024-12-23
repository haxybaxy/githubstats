import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER_REPOS } from '../../graphql/queries';
import { SearchForm } from '../SearchForm';
import { UserSection } from '../UserSection/UserSection';
import { RepositoryList } from '../RepositoryList/RepositoryList';

export function ComparisonView() {
  const [username1, setUsername1] = useState('');
  const [username2, setUsername2] = useState('');
  const [isComparing, setIsComparing] = useState(false);
  const [searchExecuted, setSearchExecuted] = useState(false);

  const { loading: loading1, error: error1, data: data1 } = useQuery(GET_USER_REPOS, {
    variables: { username: username1 },
    skip: !searchExecuted,
  });

  const { loading: loading2, error: error2, data: data2 } = useQuery(GET_USER_REPOS, {
    variables: { username: username2 },
    skip: !searchExecuted || !isComparing,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchExecuted(true);
  };

  const toggleComparing = () => {
    setIsComparing(!isComparing);
    if (!isComparing) {
      setUsername2('');
    }
  };

  return (
    <div className="text-center">
      <div className="flex justify-center items-center gap-4 mt-6">
        <SearchForm
          username={username1}
          onUsernameChange={setUsername1}
          onSubmit={handleSearch}
          placeholder="Enter first username..."
        />

        <button
          onClick={toggleComparing}
          className={`px-4 py-2 rounded-md ${
            isComparing
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-blue-500 hover:bg-blue-600'
          } text-white`}
        >
          {isComparing ? 'Remove VS' : 'VS'}
        </button>

        {isComparing && (
          <SearchForm
            username={username2}
            onUsernameChange={setUsername2}
            onSubmit={handleSearch}
            placeholder="Enter second username..."
          />
        )}
      </div>

      <div className={`grid gap-4 mt-6 ${isComparing ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
        {data1?.user && (
          <div className={isComparing ? '' : 'col-span-full'}>
            <UserSection user={data1.user} />
            <RepositoryList
              repositories={data1.user.repositories.nodes || []}
              loading={loading1}
              error={error1}
            />
          </div>
        )}

        {isComparing && data2?.user && (
          <div>
            <UserSection user={data2.user} />
            <RepositoryList
              repositories={data2.user.repositories.nodes || []}
              loading={loading2}
              error={error2}
            />
          </div>
        )}
      </div>
    </div>
  );
}
