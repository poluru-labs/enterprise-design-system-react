import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button/Button.js';
import { Toolbar } from './Toolbar.js';

const meta: Meta<typeof Toolbar> = {
  title: 'Components/Toolbar',
  component: Toolbar,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Toolbar>;

export const Default: Story = {
  render: () => (
    <Toolbar
      bordered
      start={<Button variant="secondary" size="sm">Back</Button>}
      center="Document title"
      end={<Button size="sm">Save</Button>}
    />
  ),
};
