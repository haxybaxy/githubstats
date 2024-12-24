import type { Meta, StoryObj } from '@storybook/react';
import { ComparisonView } from './ComparisonView';
import { ApolloProvider } from '@apollo/client';
import { client } from '../../apollo-client';

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

export const Default: Story = {};
