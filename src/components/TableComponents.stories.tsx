import type { Meta, StoryObj } from '@storybook/tanstack-react'
import {
  Table,
  TableHeader,
  TableHeaderRow,
  TableHeaderCell,
  SortableTableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
} from './TableComponents'

const meta = {
  title: 'Components/Table',
  component: Table,
  parameters: {
    docs: {
      description: {
        component: 'Styled table primitives: Table, Thead, Tbody, Tr, Th, Td.',
      },
    },
  },
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

const sampleData = [
  { name: 'TanStack Query', downloads: '8.2M', stars: '42k', status: 'Stable' },
  {
    name: 'TanStack Router',
    downloads: '1.5M',
    stars: '8.5k',
    status: 'Stable',
  },
  { name: 'TanStack Table', downloads: '3.1M', stars: '25k', status: 'Stable' },
  { name: 'TanStack Form', downloads: '450k', stars: '4.2k', status: 'Stable' },
  { name: 'TanStack Start', downloads: '120k', stars: '3.8k', status: 'Beta' },
]

export const Default: Story = {
  args: { children: 'Table' },
  render: () => (
    <Table>
      <TableHeader>
        <TableHeaderRow>
          <TableHeaderCell>Library</TableHeaderCell>
          <TableHeaderCell align="right">Downloads</TableHeaderCell>
          <TableHeaderCell align="right">Stars</TableHeaderCell>
          <TableHeaderCell>Status</TableHeaderCell>
        </TableHeaderRow>
      </TableHeader>
      <TableBody>
        {sampleData.map((row) => (
          <TableRow key={row.name}>
            <TableCell>{row.name}</TableCell>
            <TableCell align="right">{row.downloads}</TableCell>
            <TableCell align="right">{row.stars}</TableCell>
            <TableCell>{row.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
}

export const WithSortableHeaders: Story = {
  args: { children: 'Table' },
  render: () => (
    <Table>
      <TableHeader>
        <TableHeaderRow>
          <SortableTableHeaderCell
            sortable
            sortDirection="asc"
            onSort={() => {}}
          >
            Library
          </SortableTableHeaderCell>
          <SortableTableHeaderCell
            sortable
            sortDirection={false}
            align="right"
            onSort={() => {}}
          >
            Downloads
          </SortableTableHeaderCell>
          <SortableTableHeaderCell
            sortable
            sortDirection="desc"
            align="right"
            onSort={() => {}}
          >
            Stars
          </SortableTableHeaderCell>
          <TableHeaderCell>Status</TableHeaderCell>
        </TableHeaderRow>
      </TableHeader>
      <TableBody>
        {sampleData.map((row) => (
          <TableRow key={row.name}>
            <TableCell>{row.name}</TableCell>
            <TableCell align="right">{row.downloads}</TableCell>
            <TableCell align="right">{row.stars}</TableCell>
            <TableCell>{row.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
}

export const ClickableRows: Story = {
  args: { children: 'Table' },
  render: () => (
    <Table>
      <TableHeader>
        <TableHeaderRow>
          <TableHeaderCell>Library</TableHeaderCell>
          <TableHeaderCell>Status</TableHeaderCell>
        </TableHeaderRow>
      </TableHeader>
      <TableBody>
        {sampleData.map((row) => (
          <TableRow key={row.name} onClick={() => {}}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
}

export const Relaxed: Story = {
  args: { children: 'Table' },
  render: () => (
    <Table>
      <TableHeader>
        <TableHeaderRow>
          <TableHeaderCell compact={false}>Library</TableHeaderCell>
          <TableHeaderCell compact={false} align="right">
            Downloads
          </TableHeaderCell>
        </TableHeaderRow>
      </TableHeader>
      <TableBody>
        {sampleData.slice(0, 3).map((row) => (
          <TableRow key={row.name}>
            <TableCell compact={false}>{row.name}</TableCell>
            <TableCell compact={false} align="right">
              {row.downloads}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
}
