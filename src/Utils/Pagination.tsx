import { useState } from "react";

type PaginationProps = {
    totalPages: number   ;
    onPageChange: (page: number) => void;
};

const Pagination = ({ totalPages, onPageChange }: PaginationProps) => {
    const [currentPage, setCurrentPage] = useState<number>(1);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        onPageChange(page);
    };

    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        if (totalPages <= 5) {
            // Create an array from 1 to totalPages and map to pages
            pages.push(...Array.from({ length: totalPages }, (_, i) => i + 1));
        } else {
            if (currentPage <= 3) {
                pages.push(1, 2, 3, 4, "...", totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
            }
        }
        return pages;
    };

    return (
        <div className="flex items-center justify-center space-x-2 mt-4">
            {/* Previous Button */}
            <button
                className={`px-3 py-1 rounded-md ${currentPage === 1
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Previous
            </button>

            {/* Page Numbers */}
            {getPageNumbers().map((page, index) =>
                typeof page === "number" ? (
                    <button
                        key={index}
                        className={`px-3 py-1 rounded-md ${page === currentPage
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 hover:bg-gray-300"
                            }`}
                        onClick={() => handlePageChange(page)}
                    >
                        {page}
                    </button>
                ) : (
                    <span key={index} className="px-3 py-1 text-gray-500">
                        {page}
                    </span>
                )
            )}

            {/* Next Button */}
            <button
                className={`px-3 py-1 rounded-md ${currentPage === totalPages
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
