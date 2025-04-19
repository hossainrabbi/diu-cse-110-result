import { ResultType } from "@/types";
import {
  addZeroIfInRange,
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

  // useEffect(() => {
  //   const searchResult = result.filter(
  //     (r) =>
  //       r.name.toLowerCase().includes(searchQuery?.toLowerCase()) ||
  //       r.reg.toLowerCase().includes(searchQuery?.toLowerCase())
  //   );

  //   setResultList(searchResult);
  // }, [searchQuery, result]);

  // console.log(resultList);

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
    { name: "NAME", uid: "name" },
    { name: "ROLL", uid: "roll", align: "center" },
    ...semesterList,
    { name: "AVERAGE CGPA", uid: "average", align: "center" },
    { name: "AVERAGE GRADE", uid: "grade", align: "center" },
  ];

  if (sortQuery) {
    columns.splice(0, 0, { name: "SL", uid: "sl", align: "center" });
  }

  // Render table
  const renderCell = useCallback(
    (user: ResultType, columnKey: string, index?: number) => {
      if (columnKey === "sl") {
        return index !== undefined ? addZeroIfInRange(index) : "-";
      }

      if (columnKey === "roll") {
        return <div>{user?.roll}</div>;
      }

      if (columnKey === "name") {
        return (
          <User
            avatarProps={{ radius: "lg", src: user?.image }}
            description={
              <div>
                REG: {user?.reg}
                {index && index <= 3 && (
                  <img
                    src="/top.png"
                    className="absolute left-6 -bottom-1 size-5"
                  />
                )}
              </div>
            }
            name={user?.name}
            className="relative"
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
    },
    []
  );

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
