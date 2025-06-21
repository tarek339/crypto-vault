"use client";

import { Pagination, Table } from "@/components/shared";
import { TableCell, TableRow } from "@/components/ui/table";
import { TransactionObject } from "@/interfaces/interfaces";
import moment from "moment";
import { useEffect, useState } from "react";

export interface TransactionsProps {
  history: string;
}

const Transactions = ({ history }: TransactionsProps) => {
  console.log(history);
  const [prevPage, setPrevPage] = useState(0);
  const [nextPage, setNextPage] = useState(5);
  const [transactions, setTransactions] = useState<TransactionObject[] | null>(
    [],
  );

  // empty rows is used to fill the table with empty rows
  const itemsPerPage = nextPage - prevPage;
  const paginatedTransactions = transactions?.slice(prevPage, nextPage);
  const emptyRows =
    itemsPerPage - (paginatedTransactions as TransactionObject[]).length;

  useEffect(() => {
    setTransactions([
      {
        date: "2021-06-01T00:00:00.000Z",
        crypto: "BTC",
        amount: 0.0001,
      },
    ]);
  }, []);

  return (
    <Table
      tableCaption="History list of your previous transactions"
      pagination={
        <Pagination
          setNextPage={setNextPage}
          setPrevPage={setPrevPage}
          prevPage={prevPage}
          nextPage={nextPage}
          items={transactions ?? []}
          selectItems={["5", "10", "15", "20"]}
        />
      }
      headers={["Date", "Crypto", "Amount"]}
      colSpan={2}
      footerTitel="Total"
      footer={[
        transactions
          ?.slice(prevPage, nextPage)
          .reduce((total, transaction) => total + transaction.amount, 0)
          .toFixed(2)
          .toString() ?? "",
      ]}
    >
      {transactions?.slice(prevPage, nextPage).map((transaction, index) => {
        return (
          <TableRow key={index}>
            <TableCell>
              {moment(transaction.date).format("DD.MM.YYYY")}
            </TableCell>
            <TableCell>{transaction.crypto}</TableCell>
            <TableCell>{transaction.amount}</TableCell>
          </TableRow>
        );
      })}
      {(transactions as TransactionObject[])?.length >= 5 &&
        Array.from({ length: emptyRows }).map((_, index) => (
          <TableRow key={index}>
            <TableCell colSpan={5}>&nbsp;</TableCell>
          </TableRow>
        ))}
    </Table>
  );
};

export default Transactions;
