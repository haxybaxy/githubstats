import { useComparisonState } from './hooks/useComparisonState';
import { useQuery } from '@apollo/client';
import { GET_USER_REPOS } from '../../graphql/queries';
import { ComparisonControls } from './components/ComparisonControls';
import { ErrorDisplay } from './components/ErrorDisplay';
import { UserSection } from '../UserSection/UserSection';
import { RepositoryList } from '../RepositoryList/RepositoryList';
import { useGitHubRank } from '../../hooks/useGitHubRank';

/**
 * ComparisonView component that allows users to compare GitHub profiles
 */
export function ComparisonView() {
  const { state, setState, handleSearch, toggleComparing } = useComparisonState();

  const { loading: loading1, error: error1, data: data1 } = useQuery(GET_USER_REPOS, {
    variables: { username: state.searchedUsername1 },
    skip: !state.searchedUsername1,
  });

  const { loading: loading2, error: error2, data: data2 } = useQuery(GET_USER_REPOS, {
    variables: { username: state.searchedUsername2 },
    skip: !state.searchedUsername2 || !state.isComparing,
  });

  const rankingResult = useGitHubRank(
    data1?.user || null,
    (state.isComparing && data2?.user) || data1?.user || null
  );

  const isWinner = (userNumber: 1 | 2) => {
    return rankingResult?.winner === userNumber;
  };

  return (
    <div className="text-center">
      {(error1 || error2) && (
        <div className="max-w-2xl mx-auto">
          {error1 && <ErrorDisplay error={error1} />}
          {error2 && <ErrorDisplay error={error2} />}
        </div>
      )}

      <ComparisonControls
        username1={state.username1}
        username2={state.username2}
        isComparing={state.isComparing}
        loading1={loading1}
        loading2={loading2}
        onUsernameChange1={(value) => setState(prev => ({ ...prev, username1: value }))}
        onUsernameChange2={(value) => setState(prev => ({ ...prev, username2: value }))}
        onSubmit={handleSearch}
        onToggleComparing={toggleComparing}
      />

      <div className={`grid gap-4 mt-6 ${state.isComparing ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
        {data1?.user && (
          <div className={state.isComparing ? '' : 'col-span-full'}>
            <UserSection
              user={data1.user}
              isWinner={state.isComparing && isWinner(1)}
              score={rankingResult?.user1Score}
              isComparing={state.isComparing}
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

        {state.isComparing && (
          <div>
            {data2?.user ? (
              <>
                <UserSection
                  user={data2.user}
                  isWinner={isWinner(2)}
                  score={rankingResult?.user2Score}
                  isComparing={state.isComparing}
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
