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

type ResultTypeWithIndex = ResultType & {
  index?: number;
};

export default function ResultTable({ result }: { result: ResultType[] }) {
  const { resultList, columns, renderCell, sortValue } = useResult(result);

  const resultListWithIndex = resultList.map((item, index) => ({
    ...item,
    index: sortValue ? index + 1 : undefined,
  }));

  return (
    <Table aria-label="Example table with custom cells">
      <TableHeader columns={columns}>
        {(column: Column) => (
          <TableColumn
            className={column?.uid === sortValue ? "bg-default-200" : ""}
            key={column?.uid}
            align={column.align || "start"}
          >
            {column?.name}
          </TableColumn>
        )}
      </TableHeader>

      <TableBody items={resultListWithIndex} emptyContent={<EmptyTable />}>
        {(item: ResultTypeWithIndex) => (
          <TableRow key={item?._id}>
            {(columnKey: any) => (
              <TableCell>
                {renderCell(
                  item,
                  columnKey as Column["uid"],
                  item?.index,
                  sortValue
                )}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
