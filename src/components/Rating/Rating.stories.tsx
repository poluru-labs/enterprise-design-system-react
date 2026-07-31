import type { Meta, StoryObj } from '@storybook/react';
import { Rating } from './Rating.js';

const meta: Meta<typeof Rating> = {
  title: 'Components/Rating',
  component: Rating,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Rating>;

export const Default: Story = { args: { value: 3, allowHalf: true } };
