import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from './Divider.js';

const meta: Meta<typeof Divider> = { title: 'Components/Divider', component: Divider, tags: ['autodocs'] };
export default meta;
type Story = StoryObj<typeof Divider>;
export const Default: Story = { args: { label: 'Or continue with' } };
