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
    <div className="mt-6 flex justify-center gap-2">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="px-4 py-2 border border-gray-300 dark:border-gray-600
                   rounded-md bg-white dark:bg-gray-800
                   text-gray-900 dark:text-gray-100
                   disabled:opacity-50"
        aria-label="Previous page"
      >
        Previous
      </button>
      <span className="px-4 py-2 text-gray-900 dark:text-gray-100"
            aria-label={`Page ${currentPage} of ${totalPages}`}>
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="px-4 py-2 border border-gray-300 dark:border-gray-600
                   rounded-md bg-white dark:bg-gray-800
                   text-gray-900 dark:text-gray-100
                   disabled:opacity-50"
        aria-label="Next page"
      >
        Next
      </button>
    </div>
  );
}
