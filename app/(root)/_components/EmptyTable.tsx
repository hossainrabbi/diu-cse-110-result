import EmptyIcon from "@/assets/icons/EmptyIcon";

export default function EmptyTable() {
  return (
    <div className="flex justify-center items-center text-center">
      <div>
        <EmptyIcon size={60} />
        <span className="pt-2 text-xs block">Empty</span>
      </div>
    </div>
  );
}
