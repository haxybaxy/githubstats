import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

/**
 * Props for the Pagination component
 *
 * @interface PaginationProps
 * @property {number} currentPage - Current page number (1-based indexing)
 * @property {number} totalPages - Total number of available pages
 * @property {(page: number) => void} onPageChange - Callback function triggered when page number changes
 */
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

/**
 * Renders pagination controls for navigating through paginated content
 *
 * Features:
 * - Previous/Next page navigation buttons
 * - Current page and total pages indicator
 * - Automatic disabling of buttons at boundaries
 * - Accessibility support with ARIA labels
 * - Dark mode compatible styling
 * - Responsive design
 * - Auto-hides when only one page exists
 *
 * Visual Elements:
 * - Previous button with left chevron icon
 * - Next button with right chevron icon
 * - Current page / total pages display
 * - Focus states for keyboard navigation
 * - Disabled states for boundary conditions
 *
 * Accessibility:
 * - Semantic navigation structure
 * - ARIA labels for buttons
 * - Keyboard navigation support
 * - Clear focus indicators
 * - Disabled state announcements
 *
 * Boundary Handling:
 * - Disables Previous button on first page
 * - Disables Next button on last page
 * - Prevents navigation beyond valid range
 * - Returns null when totalPages <= 1
 *
 * @param props - Component properties
 * @param props.currentPage - Current active page number
 * @param props.totalPages - Total number of available pages
 * @param props.onPageChange - Callback function when page changes
 * @returns The pagination controls, or null if only one page exists
 *
 * @example
 * ```tsx
 * <Pagination
 *   currentPage={1}
 *   totalPages={5}
 *   onPageChange={(page) => setCurrentPage(page)}
 * />
 * ```
 */
export function Pagination({
  currentPage,
  totalPages,
  onPageChange
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  return (
    <nav
      role="navigation"
      aria-label="Pagination"
      className="mt-6 mb-4 flex items-center justify-center gap-3 text-sm"
    >
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="inline-flex items-center gap-1 px-3 py-1.5
                   border border-gray-300 dark:border-gray-600
                   rounded-md bg-white dark:bg-gray-700
                   text-gray-900 dark:text-gray-100
                   hover:bg-gray-50 dark:hover:bg-gray-600
                   disabled:opacity-50 disabled:cursor-not-allowed
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                   transition-colors duration-200"
        aria-label="Previous page"
        data-testid="pagination-prev"
      >
        <ChevronLeftIcon className="h-4 w-4" />
        <span>Prev</span>
      </button>

      <span className="text-gray-600 dark:text-gray-300">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="inline-flex items-center gap-1 px-3 py-1.5
                   border border-gray-300 dark:border-gray-600
                   rounded-md bg-white dark:bg-gray-700
                   text-gray-900 dark:text-gray-100
                   hover:bg-gray-50 dark:hover:bg-gray-600
                   disabled:opacity-50 disabled:cursor-not-allowed
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                   transition-colors duration-200"
        aria-label="Next page"
        data-testid="pagination-next"
      >
        <span>Next</span>
        <ChevronRightIcon className="h-4 w-4" />
      </button>
    </nav>
  );
}
