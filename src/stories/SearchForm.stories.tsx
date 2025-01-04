import type { Meta, StoryObj } from '@storybook/react';
import { SearchForm } from '../components/SearchForm/SearchForm';
import { ApolloProvider } from '@apollo/client';
import { client } from '../apollo-client';
import { ThemeDecorator } from './decorators/ThemeDecorator';

const meta: Meta<typeof SearchForm> = {
  component: SearchForm,
  title: 'Components/SearchForm',
  parameters: {
    layout: 'centered',
  },
  decorators: [
    ThemeDecorator,
    (Story) => (
      <div className="p-6 bg-white dark:bg-gray-900">
        <ApolloProvider client={client}>
          <Story />
        </ApolloProvider>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SearchForm>;

export const Light: Story = {
  args: {
    username: '',
    onUsernameChange: (username: string) => console.log('Username changed:', username),
    onSubmit: (e: React.FormEvent) => {
      e.preventDefault();
      console.log('Form submitted');
    },
    placeholder: 'Search GitHub username',
  },
  parameters: {
    theme: 'light',
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
  parameters: {
    theme: 'light',
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
  parameters: {
    theme: 'light',
  },
};

export const Dark: Story = {
  args: {
    username: '',
    onUsernameChange: (username: string) => console.log('Username changed:', username),
    onSubmit: (e: React.FormEvent) => {
      e.preventDefault();
      console.log('Form submitted');
    },
    placeholder: 'Search GitHub username',
  },
  parameters: {
    theme: 'dark',
  },
};

export const WithPrefilledUsernameDark: Story = {
  args: {
    username: 'johndoe',
    onUsernameChange: (username: string) => console.log('Username changed:', username),
    onSubmit: (e: React.FormEvent) => {
      e.preventDefault();
      console.log('Form submitted');
    },
    placeholder: 'Search GitHub username',
  },
  parameters: {
    theme: 'dark',
  },
};

export const LoadingDark: Story = {
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
  parameters: {
    theme: 'dark',
  },
};
