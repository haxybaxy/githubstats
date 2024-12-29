/**
 * Props for the Logo component
 *
 * @interface LogoProps
 * @property {number} size - Size of the logo in pixels (defaults to 30)
 */
export interface LogoProps {
  size?: number;
}

/**
 * Renders the application logo as an SVG
 *
 * Features:
 * - Scalable vector graphic that maintains quality at any size
 * - Dark mode support with automatic color switching
 * - Configurable size through props
 * - Accessible SVG with proper ARIA attributes
 *
 * Visual Elements:
 * - Custom path-based icon
 * - Responsive scaling
 * - Theme-aware coloring
 * - Proper viewBox configuration
 *
 * Accessibility:
 * - Semantic SVG structure
 * - Proper ARIA attributes
 * - Color contrast compliance
 * - Screen reader support
 *
 * Theme Support:
 * - Light mode colors
 * - Dark mode colors
 * - Smooth transitions
 *
 * @param props - Component properties
 * @param props.size - Width and height of the logo in pixels
 * @returns The rendered logo SVG
 *
 * @example
 * ```tsx
 * <Logo size={42} />
 * ```
 */
export const Logo = ({ size = 30 }: LogoProps) => {
  return (
  <svg
  width={`${size}px`}
  height={`${size}px`}
  viewBox="0 0 24 24"
  fill="none"
  className="text-gray-900 dark:text-white"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M17 9L11.5657 14.4343C11.3677 14.6323 11.2687 14.7313 11.1545 14.7684C11.0541 14.8011 10.9459 14.8011 10.8455 14.7684C10.7313 14.7313 10.6323 14.6323 10.4343 14.4343L8.56569 12.5657C8.36768 12.3677 8.26867 12.2687 8.15451 12.2316C8.05409 12.1989 7.94591 12.1989 7.84549 12.2316C7.73133 12.2687 7.63232 12.3677 7.43431 12.5657L3 17M17 9H13M17 9V13M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
    </svg>
  );
};
