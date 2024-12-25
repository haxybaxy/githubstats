import '@testing-library/jest-dom';

jest.mock('./components/RepositoryCard/CommitChart', () => ({
  CommitChart: () => null
}));

jest.mock('react-chartjs-2', () => ({
  Line: () => null
}));
