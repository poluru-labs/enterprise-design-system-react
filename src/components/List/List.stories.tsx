import type { Meta, StoryObj } from '@storybook/react';
import { List } from './List.js';
const meta: Meta<typeof List> = { title: 'Components/List', component: List, tags: ['autodocs'] };
export default meta;
type Story = StoryObj<typeof List>;
export const Default: Story = { args: { divided: true, items: [{ label: 'Inbox', description: '12 unread', icon: 'mail' }, { label: 'Sent', icon: 'upload' }] } };
