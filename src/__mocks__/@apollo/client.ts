export const gql = (strings: TemplateStringsArray) => strings.join('');

export const useQuery = () => ({
  loading: false,
  error: null,
  data: {
    repository: {
      defaultBranchRef: {
        target: {
          history: {
            nodes: [
              { committedDate: '2024-01-01T00:00:00Z' },
              { committedDate: '2024-01-02T00:00:00Z' },
            ],
          },
        },
      },
    },
  },
});
