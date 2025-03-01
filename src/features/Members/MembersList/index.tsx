'use client';

import React, { useState, useEffect } from "react";
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
import { Member } from "@/constants/types";
import { RefreshCcw, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { createCategory, fetchCategories } from "@/redux/actions/categoryAction";
import { fetchMembers, deleteMembers, createMember } from "@/redux/actions/memberAction";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const MemberList: React.FC = () => {
  const dispatch = useDispatch();
  const { categories, loading: categoriesLoading, error: categoriesError } = useSelector((state: RootState) => state.categories);
  const { members, loading: membersLoading, error: membersError } = useSelector((state: RootState) => state.members);

  // Fetch members and categories on component mount
  useEffect(() => {
    const fetchData=async()=> {
      await fetchMembers(dispatch);
      await fetchCategories(dispatch);
    }

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    console.log('Members:', members);
  }, [members]);

  const [newMember, setNewMember] = useState<Omit<Member, 'id'>>({
    name: "",
    category: "",
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
  });
  const [newCategory, setNewCategory] = useState<string>("");
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const handleAddMember = async () => {
    if (!newMember.name || !newMember.category) {
      alert("Name and Category cannot be empty.");
      return;
    }
  
    try {
      await createMember(newMember.name, newMember.category, dispatch);
      setNewMember({
        name: "",
        category: "",
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Failed to add member:', error);
      alert('Failed to add member. Please try again.');
    }
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim()) {
      alert("Category name cannot be empty");
      return;
    }

    try {
      await createCategory(dispatch, newCategory);
      setNewCategory("");
    } catch (error) {
      console.error('Failed to add category:', error);
      alert('Failed to add category. Please try again.');
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedMembers.length === 0) {
      return;
    }

    try {
      await deleteMembers(selectedMembers, dispatch);
      setSelectedMembers([]);
    } catch (error) {
      console.error('Failed to delete members:', error);
      alert('Failed to delete members. Please try again.');
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleRefresh = async () => {
    try {
      // Load categories first
      await fetchCategories(dispatch);
      // Then load members
      await fetchMembers(dispatch);
    } catch (error) {
      console.error('Error refreshing data:', error);
      alert('Failed to refresh data. Please try again.');
    }
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  const handleCheckboxChange = (memberId: string, checked: boolean) => {
    if (checked) {
      setSelectedMembers([...selectedMembers, memberId]);
    } else {
      setSelectedMembers(selectedMembers.filter(id => id !== memberId));
    }
  };

  const handleSelectAllChange = (checked: boolean) => {
    if (checked) {
      const allMemberIds = filteredMembers.map(member => member.id);
      setSelectedMembers(allMemberIds);
    } else {
      setSelectedMembers([]);
    }
  };

  // Filter members based on search query and selected category
  const filteredMembers = members ? members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || member.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }) : [];

  const isLoading = membersLoading || categoriesLoading;
  const hasError = membersError || categoriesError;

  return (
    <div className="container w-[1080px] mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Members</h1>
        <Button variant="outline" onClick={handleRefresh} disabled={isLoading}>
          <RefreshCcw className="h-4 w-4 mr-2" />

        </Button>
      </div>

      {hasError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          Error loading data. Please try refreshing.
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <Input
            placeholder="Search members..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="w-full md:w-64">
          <Select value={selectedCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Categories</SelectItem>
              {categories && categories.map((category) => (
                <SelectItem key={category.id} value={category.categoryName}>
                  {category.categoryName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Add Category</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Category</DialogTitle>
                <DialogDescription>
                  Create a new category for organizing members.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="categoryName" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="categoryName"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleAddCategory}>Add Category</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Add Member</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Member</DialogTitle>
                <DialogDescription>
                  Add a new member to your organization.
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
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories && categories.map((category) => (
                        <SelectItem key={category.id} value={category.categoryName}>
                          {category.categoryName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button className="w-full bg-primaryColor text-white" onClick={handleAddMember}>Add Member</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button 
            variant="destructive" 
            onClick={handleDeleteSelected}
            disabled={selectedMembers.length === 0}
          >
            <Trash2 className="h-4 w-4 " />
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-10">Loading members and categories...</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox 
                  checked={members.length > 0 && selectedMembers.length === members.length}
                  onCheckedChange={handleSelectAllChange}
                />
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Last Login</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">
                  No members found
                </TableCell>
              </TableRow>
            ) : (
              members.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <Checkbox 
                      checked={selectedMembers.includes(member.id)}
                      onCheckedChange={(checked) => handleCheckboxChange(member.id, checked as boolean)}
                    />
                  </TableCell>
                  <TableCell>{member.name}</TableCell>
                  <TableCell>{member.category}</TableCell>
                  <TableCell>{new Date(member.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(member.lastLogin).toLocaleDateString()}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default MemberList;