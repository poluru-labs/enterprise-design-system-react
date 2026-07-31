import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from './Pagination.js';

const meta: Meta<typeof Pagination> = { title: 'Components/Pagination', component: Pagination, tags: ['autodocs'] };
export default meta;
type Story = StoryObj<typeof Pagination>;
export const Default: Story = { args: { page: 1, total: 120, pageSize: 10 } };

