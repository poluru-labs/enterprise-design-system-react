import type { Meta, StoryObj } from '@storybook/react';
import { Link } from './Link.js';

const meta: Meta<typeof Link> = { title: 'Components/Link', component: Link, tags: ['autodocs'] };
export default meta;
type Story = StoryObj<typeof Link>;
export const Default: Story = { args: { href: 'https://example.com', children: 'Learn more', external: true } };
