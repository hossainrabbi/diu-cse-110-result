import { ResultType } from "@/types";
import {
  ordinalData,
  sortByAverageCgpa,
  sortBySemesterCgpa,
} from "@/utils/utils";
import { User } from "@heroui/user";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function useResult(result: ResultType[] = []) {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const sortQuery = searchParams.get("sort") || "";
  const [resultList, setResultList] = useState(result);

  useEffect(() => {
    const searchResult = result.filter(
      (r) =>
        r.name.toLowerCase().includes(searchQuery?.toLowerCase()) ||
        r.reg.toLowerCase().includes(searchQuery?.toLowerCase())
    );
    setResultList(searchResult);
  }, [searchQuery, result]);

  useEffect(() => {
    if (sortQuery === "average") {
      setResultList(sortByAverageCgpa(result));
    } else if (sortQuery.startsWith("semester-")) {
      const semesterNumber = sortQuery.split("-")[1];
      setResultList(sortBySemesterCgpa(result, semesterNumber));
    } else {
      setResultList(result);
    }
  }, [sortQuery, result]);

  const semesterList =
    resultList?.[0]?.result?.semesters?.map((item) => ({
      name: ordinalData[item.semester as keyof typeof ordinalData],
      uid: String(item.semester),
      align: "center",
    })) || [];

  // Constants
  const columns: any[] = [
    { name: "ROLL", uid: "roll", align: "center" },
    { name: "NAME", uid: "name" },
    ...semesterList,
    { name: "AVERAGE CGPA", uid: "average", align: "center" },
    { name: "AVERAGE GRADE", uid: "grade", align: "center" },
  ];

  // Render table
  const renderCell = useCallback((user: ResultType, columnKey: string) => {
    if (columnKey === "roll") {
      return <div>{user?.roll}</div>;
    }

    if (columnKey === "name") {
      return (
        <User
          avatarProps={{ radius: "lg", src: user?.image }}
          description={`REG: ${user?.reg}`}
          name={user?.name}
        />
      );
    }

    if (columnKey === "average") {
      return user?.result?.cgpa === "Incomplete" ? "-" : user?.result?.cgpa;
    }

    if (columnKey === "grade") {
      return user?.result?.grade === "Incomplete" ? "-" : user?.result?.grade;
    }

    // Dynamic semester columns
    const semester = user?.result?.semesters?.find(
      (s) => String(s.semester) === columnKey
    );

    if (semester) {
      return semester.cgpa || "-";
    }

    return "-";
  }, []);

  const sortValue = sortQuery.startsWith("semester-")
    ? sortQuery.split("-")[1]
    : sortQuery;

  return {
    resultList,
    columns,
    renderCell,
    sortValue,
  };
}
