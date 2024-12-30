import type { Meta, StoryObj } from '@storybook/react';
import { ComparisonView } from '../components/ComparisonView/ComparisonView';
import { ApolloProvider } from '@apollo/client';
import { client } from '../apollo-client';

const meta = {
  title: 'Components/ComparisonView',
  component: ComparisonView,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <ApolloProvider client={client}>
        <Story />
      </ApolloProvider>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof ComparisonView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSearchStateChange: (state: boolean) => console.log('Search state:', state)
  }
};

export const WithPrefilledUser: Story = {
  args: {
    onSearchStateChange: (state: boolean) => console.log('Search state:', state)
  },
  parameters: {
    initialState: {
      username1: 'johndoe',
      searchedUsername1: 'johndoe'
    }
  }
};
