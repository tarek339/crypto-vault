"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { PaginationProps } from "@/interfaces/shared";
import { useEffect, useState } from "react";
import { Select } from ".";

const PaginationDemo = ({
  items,
  setNextPage,
  setPrevPage,
  nextPage,
  prevPage,
  selectItems,
}: PaginationProps) => {
  const [lastPage, setLastPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(nextPage);

  const handleValueChange = (value: string) => {
    setRowsPerPage(Number(value));
  };

  useEffect(() => {
    setLastPage(items.length / rowsPerPage);
    setNextPage(rowsPerPage);
  }, [items, rowsPerPage, setNextPage]);

  return (
    <>
      <Pagination className="flex items-center gap-2">
        <span className="text-sm">Rows per page:</span>
        <Select
          selectItems={selectItems}
          onValueChange={handleValueChange}
          placeholder={rowsPerPage}
        />
        <PaginationContent>
          <PaginationItem className="cursor-pointer">
            <PaginationPrevious
              onClick={() => {
                if (prevPage !== 0) {
                  setNextPage((prevValue) => prevValue - rowsPerPage);
                  setPrevPage((prevValue) => prevValue - rowsPerPage);
                }
              }}
            />
          </PaginationItem>

          <div className="px-1">
            <span>
              {nextPage / rowsPerPage} / {Math.ceil(lastPage)}
            </span>
          </div>
          <PaginationItem className="cursor-pointer">
            <PaginationNext
              onClick={() => {
                if (items.length >= nextPage + 1) {
                  setNextPage((prevValue) => prevValue + 5);
                  setPrevPage((prevValue) => prevValue + 5);
                }
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
};

export default PaginationDemo;
