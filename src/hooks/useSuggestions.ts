import { useState, useRef, useEffect } from 'react';

/**
 * Custom hook for managing suggestion dropdown behavior in search components
 *
 * Features:
 * - Manages visibility state of suggestions dropdown
 * - Handles click-outside detection for auto-closing
 * - Provides ref for suggestion container
 * - Integrates with SearchSuggestions component
 *
 * @returns {Object} Hook state and methods
 * @property {boolean} showSuggestions - Whether suggestions dropdown is visible
 * @property {(show: boolean) => void} setShowSuggestions - Function to update dropdown visibility
 * @property {React.RefObject<HTMLDivElement>} suggestionRef - Ref for suggestion container
 *
 * @example
 * ```tsx
 *   return (
 *     <div>
 *       <input
 *         onFocus={() => setShowSuggestions(true)}
 *         // ... other input props
 *       />
 *       {showSuggestions && username.length >= 2 && (
 *         <SearchSuggestions
 *           searchLoading={searchLoading}
 *           searchData={data}
 *           onSuggestionClick={() => setShowSuggestions(false)}
 *           suggestionRef={suggestionRef}
 *         />
 *       )}
 *     </div>
 *   );
 * }
 * ```
 */
export const useSuggestions = () => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      console.log('Click handler called', {
        hasRef: !!suggestionRef.current,
        target: event.target,
        contains: suggestionRef.current?.contains(event.target as Node)
      });
      if (suggestionRef.current && !suggestionRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return {
    showSuggestions,
    setShowSuggestions,
    suggestionRef,
  };
};
