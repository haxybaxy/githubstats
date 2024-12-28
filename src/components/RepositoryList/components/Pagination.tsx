import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
/**
 * Props for the Pagination component
 * @interface PaginationProps
 */
interface PaginationProps {
  /** Current page number */
  currentPage: number;
  /** Total number of pages */
  totalPages: number;
  /** Callback for when page changes */
  onPageChange: (page: number) => void;
}

/**
 * Component that renders pagination controls for repository list
 *
 * This component provides:
 * - Previous/Next page navigation
 * - Current page indicator
 * - Total pages display
 * - Automatic hiding when only one page exists
 *
 * @param {PaginationProps} props - Component properties
 * @returns {JSX.Element | null} The rendered pagination controls or null if only one page
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
export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <nav
      role="navigation"
      aria-label="Pagination"
      className="mt-6 mb-4 flex items-center justify-center gap-3 text-sm"
    >
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="inline-flex items-center gap-1 px-3 py-1.5
                   border border-gray-300 dark:border-gray-600
                   rounded-md bg-white dark:bg-gray-700
                   text-gray-900 dark:text-gray-100
                   hover:bg-gray-50 dark:hover:bg-gray-600
                   disabled:opacity-50 disabled:cursor-not-allowed
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                   transition-colors duration-200"
        aria-label="Previous page"
      >
        <ChevronLeftIcon className="h-4 w-4" />
        <span>Prev</span>
      </button>

      <span className="text-gray-600 dark:text-gray-300">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="inline-flex items-center gap-1 px-3 py-1.5
                   border border-gray-300 dark:border-gray-600
                   rounded-md bg-white dark:bg-gray-700
                   text-gray-900 dark:text-gray-100
                   hover:bg-gray-50 dark:hover:bg-gray-600
                   disabled:opacity-50 disabled:cursor-not-allowed
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                   transition-colors duration-200"
        aria-label="Next page"
      >
        <span>Next</span>
        <ChevronRightIcon className="h-4 w-4" />
      </button>
    </nav>
  );
}
