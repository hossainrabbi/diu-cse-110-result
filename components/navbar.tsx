"use client";

import ClearIcon from "@/assets/icons/ClearIcon";
import { ThemeSwitch } from "@/components/theme-switch";
import { ResultType } from "@/types";
import { getSortList } from "@/utils/utils";
import { Input } from "@heroui/input";
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarItem,
} from "@heroui/navbar";
import { Select, SelectItem } from "@heroui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { SearchIcon } from "./icons";

export const Navbar = ({ result }: { result: ResultType[] }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sortQuery = searchParams.get("sort") || "";
  const searchQuery = searchParams.get("search") || "";
  const sortList = useMemo(() => getSortList(result), [result]);
  const [searchValue, setSearchValue] = useState(searchQuery);

  useEffect(() => {
    setSearchValue(searchQuery);
  }, [searchQuery]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);

    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("search", value);
      params.delete("sort");
    } else {
      params.delete("search");
    }

    router.push(`?${params?.toString()}`);
  };

  const handleSelectSearch = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("sort", value);
      params.delete("search");
    } else {
      params.delete("sort");
    }

    router.push(`?${params?.toString()}`);
  };

  const handleClearSelect = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("sort");

    router.push(`?${params?.toString()}`);
  };

  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      // endContent={
      //   <Kbd className="hidden lg:inline-block" keys={["command"]}>
      //     K
      //   </Kbd>
      // }
      labelPlacement="outside"
      placeholder="Search by name or roll"
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
      className="w-36 md:w-52"
      onChange={handleSearch}
      value={searchValue}
    />
  );

  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-full" justify="start">
        <NavbarItem className="flex">{searchInput}</NavbarItem>
        <NavbarItem className="flex">
          <div className="relative select-hover">
            <Select
              className="w-36 md:w-52"
              items={sortList}
              labelPlacement="outside"
              placeholder="Select to Sort"
              onChange={handleSelectSearch}
              selectedKeys={[sortQuery]}
            >
              {(val) => <SelectItem key={val.value}>{val.name}</SelectItem>}
            </Select>
            {sortQuery && (
              <button
                className="absolute right-2 top-2 z-10 text-white hover:text-red-500 bg-default-100 hover:!bg-default-100 clear-icon"
                onClick={handleClearSelect}
              >
                <ClearIcon />
              </button>
            )}
          </div>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="flex basis-full" justify="end">
        <NavbarItem>
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>
    </HeroUINavbar>
  );
};
