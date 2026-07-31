import type { Meta, StoryObj } from '@storybook/react';
import { Kbd } from './Kbd.js';

const meta: Meta<typeof Kbd> = { title: 'Components/Kbd', component: Kbd, tags: ['autodocs'] };
export default meta;
type Story = StoryObj<typeof Kbd>;
export const Default: Story = { args: { keys: '⌘ K' } };
