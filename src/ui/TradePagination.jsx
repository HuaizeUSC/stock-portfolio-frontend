import { ArrowLongLeftIcon, ArrowLongRightIcon } from "@heroicons/react/20/solid";
import { useParams } from "react-router";
import { useState } from "react";

export default function Pagination({ totalPages }) {
  const { pageId, itemNum } = useParams();
  const currentPage = parseInt(pageId);
  const [displayedPages, setDisplayedPages] = useState([]);

  const generatePageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5; // Maximum number of visible page numbers
    const pagesEitherSide = Math.floor((maxVisiblePages - 1) / 2);
    let startPage = Math.max(currentPage - pagesEitherSide, 1);
    let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(endPage - maxVisiblePages + 1, 1);
    }

    if (startPage > 1) {
      pageNumbers.push(1);
      if (startPage > 2) {
        pageNumbers.push("...");
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push("...");
      }
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const onPageChange = (page) => {
    // Handle page change here
  };

  return (
    <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
      <div className="-mt-px flex w-0 flex-1">
        {currentPage !== 1 && (
          <a
            href={`/trade/${currentPage - 1}/${itemNum}`}
            className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ArrowLongLeftIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
            Previous
          </a>
        )}
      </div>
      <div className="hidden md:-mt-px md:flex">
        {generatePageNumbers().map((page, index) => (
          <a
            key={index}
            href={typeof page === "number" ? `/trade/${page}/${itemNum}` : "#"}
            className={`inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium ${
              currentPage === page ? "text-yellow-600 border-yellow-500" : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </a>
        ))}
      </div>
      <div className="-mt-px flex w-0 flex-1 justify-end">
        {pageId < totalPages && (
          <a
            href={`/trade/${currentPage + 1}/${itemNum}`}
            className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
            <ArrowLongRightIcon className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
          </a>
        )}
      </div>
    </nav>
  );
}
