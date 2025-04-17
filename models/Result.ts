// models/Result.ts
import mongoose, { Schema } from "mongoose";

const SemesterSchema = new Schema(
  {
    semester: String,
    cgpa: String,
  },
  { _id: false }
);

const ResultSchema = new Schema(
  {
    name: String,
    roll: { type: String, unique: true },
    reg: String,
    image: String,
    result: {
      cgpa: String,
      grade: String,
      semesters: [{ semester: String, cgpa: String }, { _id: false }],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Result || mongoose.model("Result", ResultSchema);
