import { headers } from "next/headers";
import ResultTable from "./_components/ResultTable";

export default async function Home() {
  const result = await getResults();

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8">
      <ResultTable result={result?.data} />
    </section>
  );
}

export async function getResults() {
  const header = await headers();
  const host = header.get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const res = await fetch(`${protocol}://${host}/api/results`);

  return res.json();
}
