import React, { useState } from "react";
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
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Category, Member } from "@/constants/types";
import { RefreshCcw, Trash2 } from "lucide-react";

import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";


interface MemberListProps {
  members: Member[];
  categories: Category[];
}

const MemberList: React.FC<MemberListProps> = ({ members, categories }) => {
  const [newMember, setNewMember] = useState<Member>({
    id: String(Math.floor(Math.random() * 1000000) + Date.now()),
    name: "",
    category: "",
    joinedOn: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }),
    lastLogin: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }),
  });
  const [newCategory, setNewCategory] = useState<string>("");
  const [currentMembers, setCurrentMembers] = useState<Member[]>(members);
  const [currentCategories, setCurrentCategories] = useState<Category[]>(categories);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const handleAddMember = () => {
    if (!newMember.name.trim() || !newMember.category.trim()) {
      alert("Name and Category cannot be empty.");
      return;
    }
  
    const newId = String(Math.floor(Math.random() * 1000000) + Date.now()); // Random ID
  
    setCurrentMembers([...currentMembers, { ...newMember, id: newId }]);
    setNewMember({
      id: "",
      name: "",
      category: "",
      joinedOn: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }),
      lastLogin: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }),
    });
  };

  const handleAddCategory = () => {
    setCurrentCategories([...currentCategories, { name: newCategory }]);
    setNewCategory("");
  };

  const handleDeleteMembers = () => {
    const updatedMembers = currentMembers.filter((member) => !selectedMembers.includes(member.id));
    setCurrentMembers(updatedMembers);
    setSelectedMembers([]);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
  };

  const filteredMembers = currentMembers
    .filter((member) =>
      selectedCategory === "All" ? true : member.category === selectedCategory
    )
    .filter((member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="py-6 bg-white w-[1085px] relative left-12 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold flex">Members ({filteredMembers.length}) <RefreshCcw className="text-blue-500 ml-1 px-1 mt-1 cursor-pointer hover:px-0"/></h2>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="relative top-[4rem] " variant="outline">Add Category</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Category</DialogTitle>
                <DialogDescription>
                  Enter the name of the new category.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">
                    Category
                  </Label>
                  <Input
                    id="category"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant={"ghost"} className="bg-primaryColor text-white hover:border hover:border-gray-300" onClick={handleAddCategory}>Save</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="relative top-[4rem] bg-primaryColor text-white hover:bg-white hover:border hover:border-gray-300 hover:text-black ">Add Member</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle >Add New Member</DialogTitle>
                <DialogDescription>
                  Enter the details of the new member.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={newMember.name}
                    onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                    className="col-span-3"
                  />
                </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <Select
                  value={newMember.category}
                  onValueChange={(value) => setNewMember({ ...newMember, category: value })}
                >
                  <SelectTrigger className="col-span-3 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Sales">Sales</SelectItem>
                    <SelectItem value="Business">Business</SelectItem>
                    <SelectItem value="Technology">Technology</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              </div>
              <DialogFooter>
                <Button variant={"ghost"} className="bg-primaryColor text-white hover:border hover:border-gray-300" onClick={handleAddMember}>Save</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          {selectedMembers.length > 0 && (
            <Button className="relative top-[4rem]" variant="destructive" onClick={handleDeleteMembers}>
              <Trash2/>
            </Button>
          )}
        </div>
      </div>
      <Input
        type="text"
        placeholder="Type to search..."
        className="mb-6 w-72"
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <div className="flex gap-2 mb-6">
        <Button
          className="data-[state=active]:bg-primaryColor data-[state=active]:text-white text-black hover:bg-primaryColor hover:text-white"
          variant={"ghost"}
          onClick={() => handleCategoryFilter("All")}
        >
          All
        </Button>
        {currentCategories.map((category, index) => (
          <Button
            key={index}
            className="data-[state=active]:bg-primaryColor data-[state=active]:text-white text-black hover:bg-primaryColor hover:text-white"
            variant={"ghost"}
            onClick={() => handleCategoryFilter(category.name)}
          >
            {category.name}
          </Button>
        ))}
      </div>
      <Table className="border border-[#E2E8F0]">
        <TableHeader>
          <TableRow>
            <TableHead>
              <Checkbox
                checked={selectedMembers.length === filteredMembers.length}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedMembers(filteredMembers.map((member) => member.id));
                  } else {
                    setSelectedMembers([]);
                  }
                }}
              />
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Joined On</TableHead>
            <TableHead>Last Login</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredMembers.map((member) => (
            <TableRow key={member.id}>
              <TableCell>
                <Checkbox
                  checked={selectedMembers.includes(member.id)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedMembers([...selectedMembers, member.id]);
                    } else {
                      setSelectedMembers(selectedMembers.filter((id) => id !== member.id));
                    }
                  }}
                />
              </TableCell>
              <TableCell className="font-medium">{member.name}</TableCell>
              <TableCell>{member.category}</TableCell>
              <TableCell>{member.joinedOn}</TableCell>
              <TableCell>{member.lastLogin}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-center items-center gap-2 mt-6">
        <Button variant="outline">Previous</Button>
        <Button variant="ghost">1</Button>
        <Button variant="ghost">2</Button>
        <Button variant="ghost">3</Button>
        <span className="mx-2">...</span>
        <Button variant="ghost">67</Button>
        <Button variant="ghost">68</Button>
        <Button variant="outline">Next</Button>
      </div>
    </div>
  );
};

export default MemberList;