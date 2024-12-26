
import React from 'react';
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
    <div className="mt-6 mb-4 flex items-center justify-center gap-2 text-sm">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="flex items-center gap-1 px-3 py-[5px]
                   border border-gray-300 dark:border-gray-600
                   rounded-md bg-white dark:bg-gray-700
                   text-gray-900 dark:text-gray-100
                   hover:bg-gray-50 dark:hover:bg-gray-600
                   disabled:opacity-50 disabled:hover:bg-white dark:disabled:hover:bg-gray-700
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        aria-label="Previous page"
      >
        <ChevronLeftIcon className="h-4 w-4" />
        Previous
      </button>

      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter(page =>
            page === 1 ||
            page === totalPages ||
            (page >= currentPage - 1 && page <= currentPage + 1)
          )
          .map((page, index, array) => {
            if (index > 0 && array[index - 1] !== page - 1) {
              return (
                <React.Fragment key={`ellipsis-${page}`}>
                  <span className="px-2 text-gray-500">...</span>
                  <button
                    onClick={() => onPageChange(page)}
                    className={`min-w-[32px] px-3 py-[5px] rounded-md
                              ${currentPage === page
                                ? 'bg-blue-600 text-white border-transparent z-10'
                                : 'bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-600'
                              }`}
                    aria-current={currentPage === page ? 'page' : undefined}
                  >
                    {page}
                  </button>
                </React.Fragment>
              );
            }
            return (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`min-w-[32px] px-3 py-[5px] rounded-md
                          ${currentPage === page
                            ? 'bg-blue-600 text-white border-transparent z-10'
                            : 'bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-600'
                          }`}
                aria-current={currentPage === page ? 'page' : undefined}
              >
                {page}
              </button>
            );
          })}
      </div>

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1 px-3 py-[5px]
                   border border-gray-300 dark:border-gray-600
                   rounded-md bg-white dark:bg-gray-700
                   text-gray-900 dark:text-gray-100
                   hover:bg-gray-50 dark:hover:bg-gray-600
                   disabled:opacity-50 disabled:hover:bg-white dark:disabled:hover:bg-gray-700
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        aria-label="Next page"
      >
        Next
        <ChevronRightIcon className="h-4 w-4" />
      </button>
    </div>
  );
}
