import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TableProps } from "@/interfaces/shared";

const TableComponent = ({
  headers,
  children,
  colSpan,
  tableCaption,
  footer,
  footerTitel,
  pagination,
  className,
}: TableProps) => {
  return (
    <Table>
      <TableCaption>
        <div
          className={`flex ${
            pagination ? "justify-between" : "justify-center"
          } w-full items-center`}
        >
          {tableCaption} {pagination}
        </div>
      </TableCaption>
      <TableHeader>
        <TableRow>
          {headers?.map((header: string, i: number) => {
            return (
              <TableHead
                className={` ${i === 0 ? "rounded-tl-xl" : ""} ${i === headers.length - 1 ? "rounded-tr-xl" : ""}`}
                key={i}
              >
                {header}
              </TableHead>
            );
          })}
        </TableRow>
      </TableHeader>
      <TableBody className={className}>{children}</TableBody>
      {footer && (
        <TableFooter>
          <TableRow>
            <TableCell className="font-bold" colSpan={colSpan}>
              {footerTitel}
            </TableCell>
            {footer.map((fo, i) => {
              return (
                <TableCell key={i} className="font-bold">
                  {fo}
                </TableCell>
              );
            })}
          </TableRow>
        </TableFooter>
      )}
    </Table>
  );
};

export default TableComponent;
