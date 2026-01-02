import React from 'react';
import { ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
  itemsPerPageOptions?: number[];
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  itemsPerPageOptions = [10, 25, 50, 100],
}) => {
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const goToFirstPage = () => onPageChange(1);
  const goToPrevPage = () => onPageChange(Math.max(1, currentPage - 1));
  const goToNextPage = () => onPageChange(Math.min(totalPages, currentPage + 1));
  const goToLastPage = () => onPageChange(totalPages);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages || totalPages === 0;

  return (
    <div className="px-8 py-5 bg-white border-t border-gray-100 flex items-center justify-between">
      <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
        SHOWING {startItem} - {endItem} OF <span className="text-black">{totalItems}</span> ROW(S)
      </div>

      <div className="flex items-center gap-8">
        <div className="flex items-center gap-3 text-[10px] font-black text-gray-400 uppercase tracking-widest">
          ROW PER PAGE
          <select
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            className="bg-transparent border-0 text-[11px] font-black text-black focus:ring-0 cursor-pointer p-0 outline-none"
          >
            {itemsPerPageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={goToFirstPage}
            disabled={isFirstPage}
            className={`w-8 h-8 flex items-center justify-center transition-all ${
              isFirstPage ? 'text-gray-200 cursor-not-allowed' : 'text-gray-300 hover:text-black'
            }`}
          >
            <ChevronsLeft size={16} />
          </button>
          <button
            onClick={goToPrevPage}
            disabled={isFirstPage}
            className={`w-8 h-8 flex items-center justify-center transition-all ${
              isFirstPage ? 'text-gray-200 cursor-not-allowed' : 'text-gray-300 hover:text-black'
            }`}
          >
            <ChevronLeft size={16} />
          </button>

          <div className="px-4 py-1.5 bg-white border border-gray-100 rounded-lg text-[11px] font-black shadow-sm mx-2">
            {currentPage} / {totalPages || 1}
          </div>

          <button
            onClick={goToNextPage}
            disabled={isLastPage}
            className={`w-8 h-8 flex items-center justify-center transition-all ${
              isLastPage ? 'text-gray-200 cursor-not-allowed' : 'text-gray-300 hover:text-black'
            }`}
          >
            <ChevronRight size={16} />
          </button>
          <button
            onClick={goToLastPage}
            disabled={isLastPage}
            className={`w-8 h-8 flex items-center justify-center transition-all ${
              isLastPage ? 'text-gray-200 cursor-not-allowed' : 'text-gray-300 hover:text-black'
            }`}
          >
            <ChevronsRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

// Custom hook for pagination logic
export const usePagination = <T,>(data: T[], initialItemsPerPage: number = 10) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(initialItemsPerPage);

  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Reset to page 1 when data changes significantly or items per page changes
  React.useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    } else if (totalPages === 0) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  const paginatedData = React.useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  }, [data, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  return {
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    paginatedData,
    onPageChange: handlePageChange,
    onItemsPerPageChange: handleItemsPerPageChange,
  };
};
