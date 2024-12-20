import type { Meta, StoryObj } from '@storybook/react';
import { SearchForm } from './SearchForm';

const meta: Meta<typeof SearchForm> = {
  component: SearchForm,
  title: 'Components/SearchForm',
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
  },
};
