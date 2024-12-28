import type { Meta, StoryObj } from '@storybook/react';
import { SearchForm } from '../components/SearchForm/SearchForm';
import { ApolloProvider, ApolloClient, InMemoryCache, ApolloLink, Observable } from '@apollo/client';

// Create mock data for the search functionality
const searchMockData = {
  search: {
    nodes: [
      {
        login: 'johndoe',
        name: 'John Doe',
        avatarUrl: 'https://avatars.githubusercontent.com/u/1234567'
      },
      {
        login: 'janedoe',
        name: 'Jane Doe',
        avatarUrl: 'https://avatars.githubusercontent.com/u/7654321'
      }
    ]
  }
};

// Create Apollo Client with mocked responses
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new ApolloLink((operation) => {
    return new Observable((observer) => {
      if (operation.operationName === 'SearchUsers') {
        observer.next({ data: searchMockData });
      }
      observer.complete();
    });
  })
});

const meta: Meta<typeof SearchForm> = {
  component: SearchForm,
  title: 'Components/SearchForm',
  parameters: {
    layout: 'centered',
  },
  // Add Apollo Provider decorator
  decorators: [
    (Story) => (
      <ApolloProvider client={client}>
        <Story />
      </ApolloProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SearchForm>;

export const Default: Story = {
  args: {
    username: '',
    onUsernameChange: (username: string) => console.log('Username changed:', username),
    onSubmit: (e: React.FormEvent) => {
      e.preventDefault();
      console.log('Form submitted');
    },
    placeholder: 'Search GitHub username',
  },
};

export const WithPrefilledUsername: Story = {
  args: {
    username: 'johndoe',
    onUsernameChange: (username: string) => console.log('Username changed:', username),
    onSubmit: (e: React.FormEvent) => {
      e.preventDefault();
      console.log('Form submitted');
    },
    placeholder: 'Search GitHub username',
  },
};

export const Loading: Story = {
  args: {
    username: '',
    onUsernameChange: (username: string) => console.log('Username changed:', username),
    onSubmit: (e: React.FormEvent) => {
      e.preventDefault();
      console.log('Form submitted');
    },
    placeholder: 'Search GitHub username',
    isLoading: true,
  },
};
