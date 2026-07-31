import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from './Slider.js';

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
  args: {
    label: 'Volume',
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 50,
    showValue: true,
  },
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {};
