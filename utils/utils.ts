import { ResultType } from "@/types";

export const ordinalData = {
  "1": "1ST SEMESTER",
  "2": "2ND SEMESTER",
  "3": "3RD SEMESTER",
  "4": "4th",
  "5": "5th",
  "6": "6th",
  "7": "7th",
  "8": "8th",
};

export const getSortList = (data: ResultType[]) => {
  const semesters = data?.[0]?.result?.semesters || [];
  const dynamicSemesterOptions = semesters.map((sem) => ({
    name: `Sort by Semester ${sem.semester}`,
    value: `semester-${sem.semester}`,
  }));

  return [
    ...dynamicSemesterOptions,
    { name: "Sort by Average", value: "average" },
  ];
};

export function sortByAverageCgpa(data: ResultType[]): ResultType[] {
  return [...data].sort((a, b) => {
    const cgpaA = parseFloat(a.result.cgpa);
    const cgpaB = parseFloat(b.result.cgpa);

    const isValidA = !isNaN(cgpaA);
    const isValidB = !isNaN(cgpaB);

    if (!isValidA && !isValidB) return 0;
    if (!isValidA) return 1;
    if (!isValidB) return -1;

    return cgpaB - cgpaA;
  });
}

export function sortBySemesterCgpa(
  data: ResultType[],
  semesterNumber: string
): ResultType[] {
  return [...data].sort((a, b) => {
    const semA = a.result.semesters.find((s) => s.semester === semesterNumber);
    const semB = b.result.semesters.find((s) => s.semester === semesterNumber);

    const cgpaA = semA ? parseFloat(semA.cgpa) : NaN;
    const cgpaB = semB ? parseFloat(semB.cgpa) : NaN;

    const isValidA = !isNaN(cgpaA);
    const isValidB = !isNaN(cgpaB);

    if (!isValidA && !isValidB) return 0;
    if (!isValidA) return 1;
    if (!isValidB) return -1;

    return cgpaB - cgpaA;
  });
}
