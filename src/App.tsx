import { useState } from 'react';
import { useQuery, gql } from '@apollo/client';

interface Repository {
  id: string;
  name: string;
  description: string | null;
  url: string;
  stargazerCount: number;
  forkCount: number;
  updatedAt: string;
  primaryLanguage: {
    name: string;
    color: string;
  } | null;
}

const GET_USER_REPOS = gql`
  query GetUserRepositories($username: String!) {
    user(login: $username) {
      repositories(first: 10, orderBy: { field: UPDATED_AT, direction: DESC }) {
        nodes {
          id
          name
          description
          url
          stargazerCount
          forkCount
          updatedAt
          primaryLanguage {
            name
            color
          }
        }
      }
    }
  }
`;

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
            GitHub Repository Viewer
          </h1>
          <form onSubmit={handleSearch} className="mt-8">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter GitHub username"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Search
            </button>
          </form>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {loading && <p>Loading repositories...</p>}
            {error && <p className="text-red-500">Error: {error.message}</p>}
            {data?.user?.repositories.nodes.map((repo: Repository) => (
              <div
                key={repo.id}
                className="bg-white p-6 rounded-lg shadow-md text-left"
              >
                <h2 className="text-xl font-semibold">
                  <a href={repo.url} className="text-blue-600 hover:underline">
                    {repo.name}
                  </a>
                </h2>
                <p className="mt-2 text-black">{repo.description}</p>
                <div className="mt-4 flex items-center space-x-4">
                  {repo.primaryLanguage && (
                    <span className="flex items-center">
                      <span
                        className="w-3 h-3 rounded-full mr-1"
                        style={{ backgroundColor: repo.primaryLanguage.color }}
                      ></span>
                      {repo.primaryLanguage.name}
                    </span>
                  )}
                  <span>⭐ {repo.stargazerCount}</span>
                  <span>🍴 {repo.forkCount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
