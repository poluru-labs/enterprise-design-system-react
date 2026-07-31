import type { Meta, StoryObj } from '@storybook/react';
import { VisuallyHidden } from './VisuallyHidden.js';

const meta: Meta<typeof VisuallyHidden> = { title: 'Components/VisuallyHidden', component: VisuallyHidden, tags: ['autodocs'] };
export default meta;
type Story = StoryObj<typeof VisuallyHidden>;
export const Default: Story = { args: { children: 'Screen reader only text' } };
