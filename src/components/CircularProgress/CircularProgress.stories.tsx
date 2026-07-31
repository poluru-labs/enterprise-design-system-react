import type { Meta, StoryObj } from '@storybook/react';
import { CircularProgress } from './CircularProgress.js';

const meta: Meta<typeof CircularProgress> = { title: 'Components/CircularProgress', component: CircularProgress, tags: ['autodocs'] };
export default meta;
type Story = StoryObj<typeof CircularProgress>;
export const Default: Story = { args: { value: 65, showValue: true } };
