import { FileDown, MoreHorizontal, Plus, Search } from "lucide-react";
import { Tabs } from "./components/tabs";
import { Header } from "./components/header";
import { Control, Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./components/ui/table";

export function App() {
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
          <Input variant='filter'>
            <Search className="size-3" />
            <Control placeholder="Search tags..."/>
          </Input>
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
            {Array.from({length:10}).map((value, index)=> {
              return (            
            <TableRow key={index}>
              <TableCell></TableCell>
              <TableCell className="flex flex-col gap-0.5">
                <span className="font-medium">React</span>
                <span className="text-xs text-zinc-500">7f750bee-19d0-4151-a759-8270fdbe1471</span>
              </TableCell>
              <TableCell className="text-zinc-300">
                13 vídeos
              </TableCell>
              <TableCell className="text-right">
                <Button size="icon">
                  <MoreHorizontal className="size-4" />
                </Button>
              </TableCell>
            </TableRow>
            )
          })}
          </TableBody>
        </Table>
      </main>
    </div>
  )
}
