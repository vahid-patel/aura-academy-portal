import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface StudentsPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

const StudentsPagination: React.FC<StudentsPaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  // Don't show pagination if no items
  if (totalItems === 0) return null;

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);
  // const hasNextPage = currentPage < totalPages;
  const hasNextPage = true;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
      {/* Results info */}
      <div className="text-sm text-muted-foreground">
        Showing {startItem} to {endItem} of {totalItems} students (Page{' '}
        {currentPage} of {totalPages})
      </div>

      {/* Next Page Button - Always visible */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                console.log('Next button clicked, currentPage:', currentPage);
                console.log('hasNextPage:', hasNextPage);
                console.log('totalPages:', totalPages);
                if (hasNextPage) {
                  console.log('Calling onPageChange with:', currentPage + 1);
                  onPageChange(currentPage + 1);
                } else {
                  console.log('No next page available');
                }
              }}
              className={
                hasNextPage ? 'cursor-pointer' : 'cursor-pointer opacity-50'
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default StudentsPagination;
