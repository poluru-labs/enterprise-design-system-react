import type { Meta, StoryObj } from '@storybook/react';
import { Stepper } from './Stepper.js';
const meta: Meta<typeof Stepper> = { title: 'Components/Stepper', component: Stepper, tags: ['autodocs'] };
export default meta;
type Story = StoryObj<typeof Stepper>;
export const Default: Story = { args: { current: 1, steps: [{ label: 'Account', description: 'Create account' }, { label: 'Profile', description: 'Add details' }, { label: 'Confirm', description: 'Review' }] } };
