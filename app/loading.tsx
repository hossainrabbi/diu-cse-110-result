import { Card } from "@heroui/card";
import { Skeleton } from "@heroui/skeleton";

export default function Loading() {
  return (
    <Card className="w-full space-y-5 p-4 mt-8" radius="lg">
      <Skeleton className="rounded-lg">
        <div className="h-10 rounded-lg bg-default-300" />
      </Skeleton>
      {Array.from({ length: 10 }).map((_, idx) => (
        <div className="grid grid-cols-9 gap-5" key={idx}>
          <Skeleton className="rounded-lg">
            <div className="h-5 rounded-lg bg-default-200" />
          </Skeleton>
          <Skeleton className="col-span-3 rounded-lg">
            <div className="h-5 rounded-lg bg-default-200" />
          </Skeleton>
          {Array.from({ length: 5 }).map((_, idx) => (
            <Skeleton className="rounded-lg" key={idx}>
              <div className="h-5 rounded-lg bg-default-200" />
            </Skeleton>
          ))}
        </div>
      ))}
    </Card>
  );
}
