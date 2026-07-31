import type { Meta, StoryObj } from '@storybook/react';
import { SegmentedControl } from './SegmentedControl.js';
const meta: Meta<typeof SegmentedControl> = { title: 'Components/SegmentedControl', component: SegmentedControl, tags: ['autodocs'] };
export default meta;
type Story = StoryObj<typeof SegmentedControl>;
export const Default: Story = { args: { value: 'list', options: [{ label: 'List', value: 'list' }, { label: 'Grid', value: 'grid' }] } };
