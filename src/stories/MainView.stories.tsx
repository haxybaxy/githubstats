import type { Meta, StoryObj } from '@storybook/react';
import { MainView } from '../components/MainView/MainView';
import type { MainViewProps } from '../components/MainView/MainView';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { GET_USER_INFO, GET_USER_CONTRIBUTIONS, GET_USER_REPOS } from '../graphql/queries';
import { ThemeProvider } from '../contexts/ThemeContext';
import { mockUserInfoData, mockUserContributionsData, mockUserReposData, repoCommitMocks } from './mocks/githubData';

const Wrapper = ({ children, mocks = [] }: { children: React.ReactNode, mocks?: readonly MockedResponse[] }) => (
  <ThemeProvider>
    <MockedProvider mocks={mocks} addTypename={true}>
      {children}
    </MockedProvider>
  </ThemeProvider>
);

const meta = {
  title: 'Views/MainView',
  component: MainView,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<MainViewProps>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Default: Story = {
  decorators: [
    (Story) => (
      <Wrapper>
        <Story />
      </Wrapper>
    ),
  ],
};

export const PrePopulated: Story = {
  decorators: [
    () => {
      const baseMocks = [
        {
          request: { query: GET_USER_INFO, variables: { username: 'octocat' } },
          result: mockUserInfoData
        },
        {
          request: { query: GET_USER_CONTRIBUTIONS, variables: { username: 'octocat' } },
          result: mockUserContributionsData
        },
        {
          request: { query: GET_USER_REPOS, variables: { username: 'octocat' } },
          result: mockUserReposData
        },
        ...repoCommitMocks
      ];

      return (
        <Wrapper mocks={[...baseMocks, ...baseMocks, ...baseMocks]}>
          <MainView initialUsername="octocat" />
        </Wrapper>
      );
    },
  ]
};

export const WithError: Story = {
  decorators: [
    () => {
      const errorMock = {
        request: { query: GET_USER_INFO, variables: { username: 'octocat' } },
        error: new Error('Rate limit exceeded. Please try again later.')
      };

      return (
        <Wrapper mocks={[errorMock]}>
          <MainView initialUsername="octocat" />
        </Wrapper>
      );
    },
  ]
};
