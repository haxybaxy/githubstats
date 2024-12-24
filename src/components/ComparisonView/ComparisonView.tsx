import { useState } from 'react';
import { useQuery, ApolloError } from '@apollo/client';
import { GET_USER_REPOS } from '../../graphql/queries';
import { SearchForm } from '../SearchForm';
import { UserSection } from '../UserSection/UserSection';
import { RepositoryList } from '../RepositoryList/RepositoryList';
import { useGitHubRank } from '../../hooks/useGitHubRank';

function getErrorMessage(error: ApolloError) {
  if (error.message.includes('Could not resolve to a User')) {
    return 'User not found. Please check the username and try again.';
  }
  if (error.message.includes('Bad credentials')) {
    return 'GitHub API authentication failed. Please check your API token.';
  }
  if (error.message.includes('API rate limit exceeded')) {
    return 'GitHub API rate limit exceeded. Please try again later.';
  }
  return 'An error occurred while fetching data. Please try again.';
}

export function ComparisonView() {
  const [username1, setUsername1] = useState('');
  const [username2, setUsername2] = useState('');
  const [isComparing, setIsComparing] = useState(false);
  const [searchedUsername1, setSearchedUsername1] = useState('');
  const [searchedUsername2, setSearchedUsername2] = useState('');

  const { loading: loading1, error: error1, data: data1 } = useQuery(GET_USER_REPOS, {
    variables: { username: searchedUsername1 },
    skip: !searchedUsername1,
  });

  const { loading: loading2, error: error2, data: data2 } = useQuery(GET_USER_REPOS, {
    variables: { username: searchedUsername2 },
    skip: !searchedUsername2 || !isComparing,
  });

  const rankingResult = useGitHubRank(
    data1?.user || null,
    (isComparing && data2?.user) || data1?.user || null
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchedUsername1(username1);
    if (isComparing) {
      setSearchedUsername2(username2);
    }
  };

  const toggleComparing = () => {
    setIsComparing(!isComparing);
    if (!isComparing) {
      setUsername2('');
      setSearchedUsername2('');
    }
  };

  const isWinner = (userNumber: 1 | 2) => {
    return rankingResult?.winner === userNumber;
  };

  const renderError = (error: ApolloError) => (
    <div className="bg-red-50 border-l-4 border-red-500 p-4 my-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm text-red-700">
            {getErrorMessage(error)}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="text-center">
      {(error1 || error2) && (
        <div className="max-w-2xl mx-auto">
          {error1 && renderError(error1)}
          {error2 && renderError(error2)}
        </div>
      )}

      <div className="flex justify-center items-center gap-4 mt-6">
        <SearchForm
          username={username1}
          onUsernameChange={setUsername1}
          onSubmit={handleSearch}
          placeholder={isComparing ? "Enter first username..." : "Enter username..."}
          isLoading={loading1}
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
            isLoading={loading2}
          />
        )}
      </div>

      <div className={`grid gap-4 mt-6 ${isComparing ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
        {data1?.user && (
          <div className={isComparing ? '' : 'col-span-full'}>
            <UserSection
              user={data1.user}
              isWinner={isComparing && isWinner(1)}
              score={rankingResult?.user1Score}
              isComparing={isComparing}
              hasCompetitor={!!data2?.user}
            />
            <RepositoryList
              repositories={data1.user.repositories.nodes || []}
              loading={loading1}
              error={error1}
              owner={data1.user.login}
            />
          </div>
        )}

        {isComparing && (
          <div>
            {data2?.user ? (
              <>
                <UserSection
                  user={data2.user}
                  isWinner={isWinner(2)}
                  score={rankingResult?.user2Score}
                  isComparing={isComparing}
                  hasCompetitor={true}
                />
                <RepositoryList
                  repositories={data2.user.repositories.nodes || []}
                  loading={loading2}
                  error={error2}
                  owner={data2.user.login}
                />
              </>
            ) : (
              <div className="mb-8 bg-white p-6 rounded-lg shadow-md flex items-center justify-center h-40">
                <p className="text-gray-500">Enter a second username to compare</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
