import { BalanceProps } from "@/interfaces/components";
import { Table } from "../../shared";
import { TableCell, TableRow } from "../../ui/table";

const Balance = ({ balance }: BalanceProps) => {
  const balances = [
    {
      crypto: "BTC",
      dollar: 340.0,
      euro: 250.0,
      amount: balance,
    },
  ];
  return (
    <Table
      tableCaption="A list of your crypto balance"
      headers={["Crypto", "Amount", "US-Dollar", "EUR"]}
      footer={[
        balances
          .reduce((total, balance) => total + balance.dollar, 0)
          .toFixed(2)
          .toString(),
        balances
          .reduce((total, balance) => total + balance.euro, 0)
          .toFixed(2)
          .toString(),
      ]}
      colSpan={2}
      footerTitel="Total"
    >
      {balances.map((balance, index) => {
        return (
          <TableRow key={index}>
            <TableCell className="font-medium">{balance.crypto}</TableCell>
            <TableCell>{balance.amount}</TableCell>
            <TableCell>{balance.dollar}</TableCell>
            <TableCell>{balance.euro}</TableCell>
          </TableRow>
        );
      })}
    </Table>
  );
};

export default Balance;
