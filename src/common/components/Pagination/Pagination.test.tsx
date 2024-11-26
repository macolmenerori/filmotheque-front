import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import Pagination from './Pagination';
import { PaginationProps } from './Pagination.types';

describe('Pagination Component', () => {
  const defaultProps: PaginationProps = {
    currentPage: 1,
    perPage: 5,
    totalEntries: 50,
    onPageChange: jest.fn(),
    onPerPageChange: jest.fn()
  };

  it('should render correctly with default props', () => {
    render(<Pagination {...defaultProps} />);
    expect(screen.getByDisplayValue('5 results per page')).toBeInTheDocument();
  });

  it('should call onPageChange with next page when next button is clicked', () => {
    render(<Pagination {...defaultProps} />);
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(2);
  });

  it('should call onPageChange with previous page when previous button is clicked', () => {
    const props = { ...defaultProps, currentPage: 2 };
    render(<Pagination {...props} />);
    const previousButton = screen.getByText('Previous');
    fireEvent.click(previousButton);
    expect(props.onPageChange).toHaveBeenCalledWith(1);
  });

  it('should call onPerPageChange and reset to page 1 when perPage is changed', () => {
    render(<Pagination {...defaultProps} />);
    const select = screen.getByDisplayValue('5 results per page');
    fireEvent.change(select, { target: { value: '20' } });
    expect(defaultProps.onPerPageChange).toHaveBeenCalledWith(20);
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(1);
  });

  it('should disable previous button on first page', () => {
    render(<Pagination {...defaultProps} />);
    const previousButton = screen.getByText('Previous');
    expect(previousButton).toBeDisabled();
  });

  it('should disable next button on last page', () => {
    const props = { ...defaultProps, currentPage: 10 };
    render(<Pagination {...props} />);
    const nextButton = screen.getByText('Next');
    expect(nextButton).toBeDisabled();
  });
});
