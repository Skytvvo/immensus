import { ComponentMeta, ComponentStory } from '@storybook/react';
import Components from './components';

export default {
  title: 'Components',
  component: Components,
} as ComponentMeta<typeof Components>;

export const Default: ComponentStory<typeof Components> = function () {
  return <Components />;
};
