import type { Meta, StoryObj } from '@storybook/react';
import { DataTable } from './DataTable.js';
const meta: Meta<typeof DataTable> = { title: 'Components/DataTable', component: DataTable, tags: ['autodocs'] };
export default meta; type Story = StoryObj<typeof DataTable>;
export const Default: Story = { args: { sortable: true, striped: true, columns: [{ key: 'name', label: 'Name', sortable: true }, { key: 'email', label: 'Email' }], rows: [{ name: 'Jane Doe', email: 'jane@example.com' }, { name: 'John Smith', email: 'john@example.com' }] } };
