import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from '../Pagination';

describe('Pagination', () => {
  const mockOnPageChange = jest.fn();

  beforeEach(() => {
    mockOnPageChange.mockClear();
  });

  it('should not render when totalPages is 1 or less', () => {
    const { container } = render(
      <Pagination currentPage={1} totalPages={1} onPageChange={mockOnPageChange} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('should render pagination controls correctly', () => {
    render(
      <Pagination currentPage={2} totalPages={5} onPageChange={mockOnPageChange} />
    );

    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByText('Prev')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
    expect(screen.getByText('Page 2 of 5')).toBeInTheDocument();
  });

  it('should disable Previous button on first page', () => {
    render(
      <Pagination currentPage={1} totalPages={5} onPageChange={mockOnPageChange} />
    );

    const prevButton = screen.getByLabelText('Previous page');
    expect(prevButton).toBeDisabled();
  });

  it('should disable Next button on last page', () => {
    render(
      <Pagination currentPage={5} totalPages={5} onPageChange={mockOnPageChange} />
    );

    const nextButton = screen.getByLabelText('Next page');
    expect(nextButton).toBeDisabled();
  });

  it('should call onPageChange with correct value when Previous is clicked', () => {
    render(
      <Pagination currentPage={3} totalPages={5} onPageChange={mockOnPageChange} />
    );

    fireEvent.click(screen.getByLabelText('Previous page'));
    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  it('should call onPageChange with correct value when Next is clicked', () => {
    render(
      <Pagination currentPage={3} totalPages={5} onPageChange={mockOnPageChange} />
    );

    fireEvent.click(screen.getByLabelText('Next page'));
    expect(mockOnPageChange).toHaveBeenCalledWith(4);
  });

  it('should prevent navigation beyond page boundaries', () => {
    // Test lower boundary
    const { rerender } = render(
      <>
        <Pagination currentPage={1} totalPages={3} onPageChange={mockOnPageChange} />
        <Pagination currentPage={2} totalPages={3} onPageChange={mockOnPageChange} />
      </>
    );

    const prevButtons = screen.getAllByTestId('pagination-prev');
    // First pagination is at page 1, so its prev button should be disabled
    expect(prevButtons[0]).toHaveAttribute('disabled');
    fireEvent.click(prevButtons[0]);
    expect(mockOnPageChange).not.toHaveBeenCalled();

    mockOnPageChange.mockClear();

    // Test upper boundary
    rerender(
      <>
        <Pagination currentPage={3} totalPages={3} onPageChange={mockOnPageChange} />
        <Pagination currentPage={2} totalPages={3} onPageChange={mockOnPageChange} />
      </>
    );

    const nextButtons = screen.getAllByTestId('pagination-next');
    // First pagination is at page 3, so its next button should be disabled
    expect(nextButtons[0]).toHaveAttribute('disabled');
    fireEvent.click(nextButtons[0]);
    expect(mockOnPageChange).not.toHaveBeenCalled();
  });

  it('should have correct ARIA labels', () => {
    render(
      <Pagination currentPage={2} totalPages={5} onPageChange={mockOnPageChange} />
    );

    expect(screen.getByRole('navigation')).toHaveAttribute('aria-label', 'Pagination');
    expect(screen.getByLabelText('Previous page')).toBeInTheDocument();
    expect(screen.getByLabelText('Next page')).toBeInTheDocument();
  });
});
