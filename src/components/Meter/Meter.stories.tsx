import type { Meta, StoryObj } from '@storybook/react';
import { Meter } from './Meter.js';

const meta: Meta<typeof Meter> = { title: 'Components/Meter', component: Meter, tags: ['autodocs'] };
export default meta;
type Story = StoryObj<typeof Meter>;
export const Default: Story = { args: { value: 60, label: 'Storage', showValue: true } };
