import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { FileData } from "@/constants/types";

interface FileListProps {
  files: FileData[];
}

const RecentlySyncedFiles: React.FC<FileListProps> = ({ files }) => {
  return (
    <div className="py-4 sm:p-6 relative left-[-1rem] top-[-1.4rem] max-w-[1080px] bg-white">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <h2 className="text-lg sm:text-xl font-semibold">
          Recently Synced Files ({files.length})
        </h2>
        <Input
          type="text"
          placeholder="Type to search..."
          className="w-full sm:w-80 relative left-10"
        />
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto w-[1080px] ">
        <Table className="w-full border border-[#E2E8F0] ">
          <TableHeader>
            <TableRow>
              <TableHead>File Name</TableHead>
              <TableHead>Total Size (KB)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {files.map((file, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{file.fileName}</TableCell>
                <TableCell>{file.fileSizeKB}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex flex-wrap justify-center w-[1000px] items-center gap-2 mt-4">
        <Button variant="outline">← Previous</Button>
        <Button variant="ghost">1</Button>
        <Button variant="ghost">2</Button>
        <Button variant="ghost">3</Button>
        <span className="mx-2 hidden sm:inline">...</span>
        <Button variant="ghost" className="hidden sm:inline">67</Button>
        <Button variant="ghost" className="hidden sm:inline">68</Button>
        <Button variant="outline">Next →</Button>
      </div>
    </div>
  );
};

export default RecentlySyncedFiles;
