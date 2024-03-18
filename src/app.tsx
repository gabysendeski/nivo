import { FileDown, MoreHorizontal, Plus, Search, Filter } from "lucide-react";
import { Tabs } from "./components/tabs";
import { Header } from "./components/header";
import { Control, Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table";
import { Pagination } from "./components/pagination";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
// import useDebounceValue from "./hooks/use-debounce-value";

export interface TagResponse {
  first: number;
  prev: number | null;
  next: number;
  last: number;
  pages: number;
  items: number;
  data: Tag[];
}

export interface Tag {
  title: string;
  slug: string;
  amountOfVideos: number;
  id: string;
}

export function App() {
  const [searchParms, setSearchParams] = useSearchParams();
  const urlFilter = searchParms.get("filter") ?? "";
  const [filter, setFilter] = useState(urlFilter);

  const page = searchParms.get("page") ? Number(searchParms.get("page")) : 1;

  const { data: tagsResponse, isLoading } = useQuery<TagResponse>({
    queryKey: ["get-tags", urlFilter, page],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:3333/tags?_page=${page}&_per_page=10&title=${urlFilter}`
      );
      const data = await response.json();

      //delay 1s
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return data;
    },
    //para de piscar
    placeholderData: keepPreviousData,
    //o tempo que fica armazenado o cash
    staleTime: 1000 * 60,
  });
  function handlerFilter() {
    setSearchParams((params) => {
      params.set("page", "1");
      params.set("filter", filter);

      return params;
    });
  }

  if (isLoading) {
    return null;
  }
  return (
    <div className="py-10 space-y-8">
      <div>
        <Header />
        <Tabs />
      </div>
      <main className="max-w-6xl mx-auto space-y-5">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold">Tags</h1>
          <button className="inline-flex items-center gap-1.5 text-xs bg-teal-300 text-teal-950 font-medium rounded-full px-1.5 py-1">
            <Plus className="size-3" />
            Create new
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Input variant="filter">
              <Search className="size-3" />
              <Control
                placeholder="Search tags..."
                onChange={(e) => setFilter(e.target.value)}
                value={filter}
              />
            </Input>
            <Button onClick={handlerFilter}>
              <Filter className="size-3" />
              Filter
            </Button>
          </div>
          <Button>
            <FileDown className="size-3" />
            Export
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>Tag</TableHead>
              <TableHead>Quantidades de vídeos</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tagsResponse?.data.map((tag) => {
              return (
                <TableRow key={tag.id}>
                  <TableCell></TableCell>
                  <TableCell className="flex flex-col gap-0.5">
                    <span className="font-medium">{tag.title}</span>
                    <span className="text-xs text-zinc-500">{tag.id}</span>
                  </TableCell>
                  <TableCell className="text-zinc-300">
                    {tag.amountOfVideos}{" "}
                    {tag.amountOfVideos > 1 ? "vídeos" : "vídeo"}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="icon">
                      <MoreHorizontal className="size-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {tagsResponse && (
          <Pagination
            pages={tagsResponse.pages}
            items={tagsResponse.items}
            page={page}
          />
        )}
      </main>
    </div>
  );
}
