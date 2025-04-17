"use client";

import { ResultType } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import useResult from "../_hooks/useResult";
import EmptyTable from "./EmptyTable";

// Types
interface Column {
  name: string;
  uid: keyof UserType;
  align: "center" | "start" | "end";
}

interface UserType {
  _id: number;
  roll: string;
  name: string;
  cgpa: string;
  grade: string;
}

export default function ResultTable({ result }: { result: ResultType[] }) {
  const { resultList, columns, renderCell } = useResult(result);

  return (
    <Table aria-label="Example table with custom cells">
      <TableHeader columns={columns}>
        {(column: Column) => (
          <TableColumn key={column?.uid} align={column.align || "start"}>
            {column?.name}
          </TableColumn>
        )}
      </TableHeader>

      <TableBody items={resultList} emptyContent={<EmptyTable />}>
        {(item: ResultType) => (
          <TableRow key={item?._id}>
            {(columnKey: any) => (
              <TableCell>
                {renderCell(item, columnKey as Column["uid"])}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
