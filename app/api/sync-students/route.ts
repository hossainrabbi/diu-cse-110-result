import { connectDB } from "@/lib/mongodb";
import Result from "@/models/Result";
import { NextRequest, NextResponse } from "next/server";

function resultArrToObj(semesters: any[]) {
  const arr: any[] = [];

  semesters?.forEach((el: any) => {
    el?.forEach((item: any) => {
      if (
        typeof item?.allocated_courses !== "string" &&
        item?.allocated_courses?.length
      ) {
        const cgpa =
          typeof item?.total_semester_gpa === "number"
            ? Number(item?.total_semester_gpa).toFixed(2)
            : item?.total_semester_gpa;

        arr.push({ semester: item.semester, cgpa });
      }
    });
  });

  return arr;
}

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");

  if (!token) {
    return NextResponse.json({ message: "Token is required" }, { status: 400 });
  }

  const studentURL = `https://api.diu.ac/student_batch_mate/29000?token=${token}`;

  async function getResult(id: number) {
    const resultApi = `https://api.diu.ac/provisional_result/${id}?token=${token}`;
    const res = await fetch(resultApi);
    const result = await res.json();
    return result;
  }

  try {
    await connectDB(); // Establish mongoose connection

    const res = await fetch(studentURL);
    const students = await res.json();
    const results = [];

    for (let i = 0; i < students.length; i++) {
      const result = await getResult(students[i].id);
      if (!result?.student_info) continue;

      const data = {
        name: result?.student_info?.name,
        roll: result?.student_info?.roll_no,
        reg: result?.student_info?.reg_code,
        image: `https://api.diu.ac/images/student_profile_photo_${result?.student_info?.id}.jpg`,
        result: {
          cgpa: result?.transcript_data?.results?.cgpa?.toString(),
          grade: result?.transcript_data?.results?.grade_letter,
          semesters: resultArrToObj(result?.transcript_data?.semesters),
        },
      };

      results.push(data);
    }

    const bulkOps = results.map((item) => ({
      updateOne: {
        filter: { roll: item.roll },
        update: { $set: item },
        upsert: true,
      },
    }));

    await Result.bulkWrite(bulkOps);

    return NextResponse.json({
      message: "Synced successfully",
      count: results.length,
    });
  } catch (err) {
    console.error("Sync error:", err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
