import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type ResultType = {
  result: {
    cgpa: string;
    grade: string;
    semesters: {
      semester: string;
      cgpa: string;
      _id: string;
    }[];
  };
  _id: string;
  roll: string;
  createdAt: string;
  image: string;
  name: string;
  reg: string;
  updatedAt: string;
};
