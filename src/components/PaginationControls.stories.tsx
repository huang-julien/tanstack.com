import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/tanstack-react'
import { PaginationControls } from './PaginationControls'

const meta = {
  title: 'Components/PaginationControls',
  component: PaginationControls,
  parameters: {
    docs: {
      description: {
        component:
          'Full pagination bar with page navigation, size selector, and item counts.',
      },
    },
  },
} satisfies Meta<typeof PaginationControls>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    currentPage: 0,
    totalPages: 10,
    totalItems: 250,
    pageSize: 25,
    canGoPrevious: false,
    canGoNext: true,
    onPageChange: () => {},
    onPageSizeChange: () => {},
  },
}

export const MiddlePage: Story = {
  args: {
    currentPage: 4,
    totalPages: 10,
    totalItems: 250,
    pageSize: 25,
    canGoPrevious: true,
    canGoNext: true,
    onPageChange: () => {},
    onPageSizeChange: () => {},
  },
}

export const LastPage: Story = {
  args: {
    currentPage: 9,
    totalPages: 10,
    totalItems: 250,
    pageSize: 25,
    canGoPrevious: true,
    canGoNext: false,
    onPageChange: () => {},
    onPageSizeChange: () => {},
  },
}

export const WithFilteredItems: Story = {
  args: {
    currentPage: 0,
    totalPages: 3,
    totalItems: 250,
    filteredItems: 72,
    pageSize: 25,
    canGoPrevious: false,
    canGoNext: true,
    itemLabel: 'users',
    onPageChange: () => {},
    onPageSizeChange: () => {},
  },
}

export const Interactive: Story = {
  args: {
    currentPage: 0,
    totalPages: 6,
    totalItems: 150,
    pageSize: 25,
    canGoPrevious: false,
    canGoNext: true,
    onPageChange: () => {},
    onPageSizeChange: () => {},
  },
  render: () => {
    const totalItems = 150
    const [pageSize, setPageSize] = useState(25)
    const [currentPage, setCurrentPage] = useState(0)
    const totalPages = Math.ceil(totalItems / pageSize)

    return (
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        pageSize={pageSize}
        canGoPrevious={currentPage > 0}
        canGoNext={currentPage < totalPages - 1}
        onPageChange={setCurrentPage}
        onPageSizeChange={(size) => {
          setPageSize(size)
          setCurrentPage(0)
        }}
        itemLabel="entries"
      />
    )
  },
}

export const Sticky: Story = {
  args: {
    currentPage: 2,
    totalPages: 8,
    totalItems: 200,
    pageSize: 25,
    canGoPrevious: true,
    canGoNext: true,
    sticky: true,
    onPageChange: () => {},
    onPageSizeChange: () => {},
  },
}

export const WithoutPageSizeSelector: Story = {
  args: {
    currentPage: 0,
    totalPages: 5,
    totalItems: 50,
    pageSize: 10,
    canGoPrevious: false,
    canGoNext: true,
    showPageSizeSelector: false,
    onPageChange: () => {},
    onPageSizeChange: () => {},
  },
}
