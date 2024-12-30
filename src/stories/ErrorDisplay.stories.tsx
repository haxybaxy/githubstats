import type { Meta, StoryObj } from '@storybook/react';
import { ApolloError } from '@apollo/client';
import { ErrorDisplay } from '../components/ComparisonView/ErrorDisplay';

const meta: Meta<typeof ErrorDisplay> = {
  title: 'Components/ErrorDisplay',
  component: ErrorDisplay,
  parameters: {
    docs: {
      // Prevent docs from trying to clone ApolloError instances
      source: {
        type: 'code',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ErrorDisplay>;

// Create error instances in render functions to avoid serialization issues
export const UserNotFound: Story = {
  render: () => (
    <ErrorDisplay
      error={
        new ApolloError({
          graphQLErrors: [{ message: 'Could not resolve to a User' }],
        })
      }
    />
  ),
};

export const BadCredentials: Story = {
  render: () => (
    <ErrorDisplay
      error={
        new ApolloError({
          graphQLErrors: [{ message: 'Bad credentials' }],
        })
      }
    />
  ),
};

export const RateLimitExceeded: Story = {
  render: () => (
    <ErrorDisplay
      error={
        new ApolloError({
          graphQLErrors: [{ message: 'API rate limit exceeded' }],
        })
      }
    />
  ),
};

export const GenericError: Story = {
  render: () => (
    <ErrorDisplay
      error={
        new ApolloError({
          graphQLErrors: [{ message: 'Something went wrong' }],
        })
      }
    />
  ),
};
