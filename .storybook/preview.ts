import type { Preview } from "@storybook/react";

import '../src/index.css';
import { ThemeDecorator } from '../src/stories/decorators/ThemeDecorator';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export const decorators = [ThemeDecorator];

export default preview;
