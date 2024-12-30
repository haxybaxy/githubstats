import type { Meta, StoryObj } from '@storybook/react';
import { SearchForm } from '../components/SearchForm/SearchForm';
import { ApolloProvider } from '@apollo/client';
import { client } from '../apollo-client';

const meta: Meta<typeof SearchForm> = {
  component: SearchForm,
  title: 'Components/SearchForm',
  parameters: {
    layout: 'centered',
  },
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
