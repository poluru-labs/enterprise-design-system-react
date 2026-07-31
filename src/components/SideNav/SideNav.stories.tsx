import type { Meta, StoryObj } from '@storybook/react';
import { SideNav } from './SideNav.js';
const meta: Meta<typeof SideNav> = { title: 'Components/SideNav', component: SideNav, tags: ['autodocs'] };
export default meta;
type Story = StoryObj<typeof SideNav>;
export const Default: Story = { args: { items: [{ label: 'Dashboard', href: '#', icon: 'home', active: true }, { label: 'Reports', href: '#', icon: 'file' }] } };
