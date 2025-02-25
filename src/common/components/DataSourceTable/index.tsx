// import React, { useState, useMemo } from 'react';
// import styled from 'styled-components';
// import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Plus, X, Edit, Trash2 } from 'lucide-react';

// interface Column {
//   key: string;
//   label: string;
//   sortable: boolean;
// }

// interface DataSourceTableProps {
//   data: any[];
//   columns: Column[];
//   itemsPerPage: number;
//   tableWidth: string;
//   headerBackground: string;
//   headerTextColor: string;
//   rowBackground: string;
//   rowTextColor: string;
//   borderColor: string;
//   onAddRow: (newRow: any) => void;
//   onEditRow: (index: number, updatedRow: any) => void;
//   onDeleteRow: (index: number) => void;
// }

// const Table = styled.table<{ $tableWidth: string }>`
//   width: ${props => props.$tableWidth};
//   border-collapse: separate;
//   border-spacing: 0;
//   background-color: white;
//   border-radius: 8px;
//   overflow: hidden;
//   box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);

//   @media (max-width: 768px) {
//     font-size: 12px;
//   }
// `;

// const TableHeader = styled.th<{ $background: string; $textColor: string; $borderColor: string }>`
//   text-align: left;
//   padding: 12px 24px;
//   font-weight: 600;
//   font-size: 14px;
//   color: ${props => props.$textColor};
//   background-color: ${props => props.$background};
//   border-bottom: 1px solid ${props => props.$borderColor};
//   cursor: ${props => props.onClick ? 'pointer' : 'default'};

//   @media (max-width: 768px) {
//     padding: 8px 12px;
//     font-size: 12px;
//   }
// `;

// const TableCell = styled.td<{ $background: string; $textColor: string; $borderColor: string }>`
//   padding: 16px 24px;
//   font-size: 14px;
//   color: ${props => props.$textColor};
//   background-color: ${props => props.$background};
//   border-bottom: 1px solid ${props => props.$borderColor};

//   @media (max-width: 768px) {
//     padding: 8px 12px;
//     font-size: 12px;
//   }
// `;

// const PaginationContainer = styled.div`
//   display: flex;
//   justify-content: flex-end;
//   align-items: center;
//   padding: 16px 24px;
//   background-color: #f9fafb;

//   @media (max-width: 768px) {
//     padding: 8px 12px;
//     font-size: 12px;
//   }
// `;

// const PaginationButton = styled.button`
//   background: none;
//   border: none;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   color: #4b5563;
//   font-size: 14px;
//   margin: 0 4px;

//   &:disabled {
//     opacity: 0.5;
//     cursor: not-allowed;
//   }
// `;

// const AddButton = styled.button`
//   background-color: #3b82f6;
//   color: white;
//   border: none;
//   border-radius: 4px;
//   padding: 8px 16px;
//   font-size: 14px;
//   font-weight: 500;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   margin-bottom: 16px;
//   transition: background-color 0.2s;
//   width:200px;
//   margin-left:auto;

//   &:hover {
//     background-color: #2563eb;
//   }

//   svg {
//     margin-right: 8px;
//   }
// `;

// const Modal = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background-color: rgba(0, 0, 0, 0.5);
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   z-index: 1000;
// `;

// const ModalContent = styled.div`
//   background-color: white;
//   padding: 24px;
//   border-radius: 8px;
//   width: 400px;
//   max-width: 90%;
// `;

// const ModalHeader = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 16px;
// `;

// const ModalTitle = styled.h2`
//   font-size: 18px;
//   font-weight: 600;
//   color: #1f2937;
// `;

// const CloseButton = styled.button`
//   background: none;
//   border: none;
//   cursor: pointer;
//   color: #6b7280;
//   transition: color 0.2s;

//   &:hover {
//     color: #1f2937;
//   }
// `;

// const Form = styled.form`
//   display: flex;
//   flex-direction: column;
// `;

// const FormGroup = styled.div`
//   margin-bottom: 16px;
// `;

// const Label = styled.label`
//   display: block;
//   font-size: 14px;
//   font-weight: 500;
//   color: #374151;
//   margin-bottom: 4px;
// `;

// const Input = styled.input`
//   width: 100%;
//   padding: 8px 12px;
//   font-size: 14px;
//   border: 1px solid #d1d5db;
//   border-radius: 4px;
//   transition: border-color 0.2s;

//   &:focus {
//     outline: none;
//     border-color: #3b82f6;
//   }
// `;

// const SubmitButton = styled.button`
//   background-color: #3b82f6;
//   color: white;
//   border: none;
//   border-radius: 4px;
//   padding: 8px 16px;
//   font-size: 14px;
//   font-weight: 500;
//   cursor: pointer;
//   transition: background-color 0.2s;

//   &:hover {
//     background-color: #2563eb;
//   }
// `;

// const ActionButton = styled.button`
//   background: none;
//   border: none;
//   cursor: pointer;
//   color: #6b7280;
//   transition: color 0.2s;
//   margin-right: 8px;

//   &:hover {
//     color: #1f2937;
//   }
// `;

// const DataSourceTable: React.FC<DataSourceTableProps> = ({
//   data,
//   columns,
//   itemsPerPage,
//   tableWidth,
//   headerBackground,
//   headerTextColor,
//   rowBackground,
//   rowTextColor,
//   borderColor,
//   onAddRow,
//   onEditRow,
//   onDeleteRow,
// }) => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [newRowData, setNewRowData] = useState<Record<string, string>>({});
//   const [editingIndex, setEditingIndex] = useState<number | null>(null);

//   const sortedData = useMemo(() => {
//     let sortableItems = [...data];
//     if (sortConfig !== null) {
//       sortableItems.sort((a, b) => {
//         if (a[sortConfig.key] < b[sortConfig.key]) {
//           return sortConfig.direction === 'asc' ? -1 : 1;
//         }
//         if (a[sortConfig.key] > b[sortConfig.key]) {
//           return sortConfig.direction === 'asc' ? 1 : -1;
//         }
//         return 0;
//       });
//     }
//     return sortableItems;
//   }, [data, sortConfig]);

//   const totalPages = Math.ceil(sortedData.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const currentData = sortedData.slice(startIndex, endIndex);

//   const requestSort = (key: string) => {
//     let direction: 'asc' | 'desc' = 'asc';
//     if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
//       direction = 'desc';
//     }
//     setSortConfig({ key, direction });
//   };

//   const handleAddRow = () => {
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setNewRowData({});
//     setEditingIndex(null);
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setNewRowData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (editingIndex !== null) {
//       onEditRow(startIndex + editingIndex, newRowData);
//     } else {
//       onAddRow(newRowData);
//     }
//     handleCloseModal();
//   };

//   const handleEditRow = (index: number) => {
//     setEditingIndex(index);
//     setNewRowData(currentData[index]);
//     setIsModalOpen(true);
//   };

//   const handleDeleteRow = (index: number) => {
//     if (window.confirm('Are you sure you want to delete this row?')) {
//       onDeleteRow(startIndex + index);
//     }
//   };

//   return (
//     <>
//     <HeaderContainer>
//       <Title>Members(10)</Title>

//     </HeaderContainer>
    
//       <AddButton onClick={handleAddRow}>
//         <Plus size={16} />
//         Add Members
//       </AddButton>
//       <Table $tableWidth={tableWidth}>
//         <thead>
//           <tr>
//             {columns.map((column) => (
//               <TableHeader
//                 key={column.key}
//                 onClick={() => column.sortable && requestSort(column.key)}
//                 $background={headerBackground}
//                 $textColor={headerTextColor}
//                 $borderColor={borderColor}
//               >
//                 {column.label}
//                 {sortConfig?.key === column.key && (
//                   sortConfig.direction === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
//                 )}
//               </TableHeader>
//             ))}
//             <TableHeader
//               $background={headerBackground}
//               $textColor={headerTextColor}
//               $borderColor={borderColor}
//             >
//               Actions
//             </TableHeader>
//           </tr>
//         </thead>
//         <tbody>
//           {currentData.map((item, index) => (
//             <tr key={index}>
//               {columns.map((column) => (
//                 <TableCell
//                   key={column.key}
//                   $background={rowBackground}
//                   $textColor={rowTextColor}
//                   $borderColor={borderColor}
//                 >
//                   {item[column.key]}
//                 </TableCell>
//               ))}
//               <TableCell
//                 $background={rowBackground}
//                 $textColor={rowTextColor}
//                 $borderColor={borderColor}
//               >
//                 <ActionButton onClick={() => handleEditRow(index)}>
//                   <Edit size={16} />
//                 </ActionButton>
//                 <ActionButton onClick={() => handleDeleteRow(index)}>
//                   <Trash2 size={16} />
//                 </ActionButton>
//               </TableCell>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//       <PaginationContainer>
//         <PaginationButton
//           onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//           disabled={currentPage === 1}
//         >
//           <ChevronLeft size={16} />
//           Previous
//         </PaginationButton>
//         <span>Page {currentPage} of {totalPages}</span>
//         <PaginationButton
//           onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//           disabled={currentPage === totalPages}
//         >
//           Next
//           <ChevronRight size={16} />
//         </PaginationButton>
//       </PaginationContainer>

//       {isModalOpen && (
//         <Modal>
//           <ModalContent>
//             <ModalHeader>
//               <ModalTitle>{editingIndex !== null ? 'Edit Row' : 'Add New Row'}</ModalTitle>
//               <CloseButton onClick={handleCloseModal}>
//                 <X size={20} />
//               </CloseButton>
//             </ModalHeader>
//             <Form onSubmit={handleSubmit}>
//               {columns.map(column => (
//                 <FormGroup key={column.key}>
//                   <Label htmlFor={column.key}>{column.label}</Label>
//                   <Input
//                     type="text"
//                     id={column.key}
//                     name={column.key}
//                     value={newRowData[column.key] || ''}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </FormGroup>
//               ))}
//               <SubmitButton type="submit">
//                 {editingIndex !== null ? 'Update Row' : 'Add Row'}
//               </SubmitButton>
//             </Form>
//           </ModalContent>
//         </Modal>
//       )}
//     </>
//   );
// };

// export default DataSourceTable;

// const HeaderContainer = styled.div`
//   background-color: #ffffff;
//   border-radius: 8px;
//   padding: 16px 0;
//   font-family: Arial, sans-serif;
//   margin:2rem 0;
// `;

// const Title = styled.h2`
//   font-size: 2rem;
//   font-weight: bold;
//   color: #333333;
//   margin: 0;
// `;



// import React, { useState, useMemo } from 'react';
// import { ChevronLeft, ChevronRight, Plus, X, Edit, Trash2 } from 'lucide-react';

// interface Column {
//   key: string;
//   label: string;
//   sortable: boolean;
// }

// interface DataSourceTableProps {
//   data: Record<string, string>[];
//   columns: Column[];
//   itemsPerPage: number;
//   tableWidth: string;
//   headerBackground: string;
//   headerTextColor: string;
//   rowBackground: string;
//   rowTextColor: string;
//   borderColor: string;
//   onAddRow: (newRow: Record<string, string>) => void;
//   //onEditRow: (index: number, updatedRow: Record<string, string>) => void;
//   onDeleteRow: (index: number) => void;
// }

// const DataSourceTable: React.FC<DataSourceTableProps> = ({
//   data,
//   columns,
//   itemsPerPage,
//   tableWidth,
//   headerBackground,
//   headerTextColor,
//   rowBackground,
//   rowTextColor,
//   borderColor,
//   onAddRow,
//   //onEditRow,
//   onDeleteRow,
// }) => {
//   const [currentPage, setCurrentPage] = useState(1);
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [newRowData, setNewRowData] = useState<Record<string, string>>({});
//   const [editingIndex, setEditingIndex] = useState<number | null>(null);

//   const sortedData = useMemo(() => {
//     const sortableItems = [...data];
//     if (sortConfig !== null) {
//       sortableItems.sort((a, b) => {
//         if (a[sortConfig.key] < b[sortConfig.key]) {
//           return sortConfig.direction === 'asc' ? -1 : 1;
//         }
//         if (a[sortConfig.key] > b[sortConfig.key]) {
//           return sortConfig.direction === 'asc' ? 1 : -1;
//         }
//         return 0;
//       });
//     }
//     return sortableItems;
//   }, [data, sortConfig]);

//   const totalPages = Math.ceil(sortedData.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const currentData = sortedData.slice(startIndex, endIndex);

//   const handleAddRow = () => {
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setNewRowData({});
//     setEditingIndex(null);
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setNewRowData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (editingIndex !== null) {
//       //onEditRow(startIndex + editingIndex, newRowData);
//     } else {
//       onAddRow(newRowData);
//     }
//     handleCloseModal();
//   };

//   const handleEditRow = (index: number) => {
//     setEditingIndex(index);
//     setNewRowData(currentData[index]);
//     setIsModalOpen(true);
//   };

//   const handleDeleteRow = (index: number) => {
//     if (window.confirm('Are you sure you want to delete this row?')) {
//       onDeleteRow(startIndex + index);
//     }
//   };

//   return (
//     <div className="overflow-hidden rounded-lg shadow-md">
//       <div className={`bg-${headerBackground} p-4 flex justify-between items-center`}>  
//         <h2 className={`text-lg font-semibold ${headerTextColor}`}>Members ({data.length})</h2>
//         <button className="bg-blue-600 text-white rounded px-4 py-2" onClick={handleAddRow}>  
//           <Plus size={16} /> Add Members
//         </button>
//       </div>
//       <table className={`w-full border-collapse ${tableWidth} bg-white`}>  
//         <thead>
//           <tr>
//             {columns.map((column) => (
//               <th key={column.key} className={`px-4 py-3 text-left text-sm font-semibold ${headerTextColor} ${headerBackground} border-b ${borderColor}`}>{column.label}</th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {currentData.map((row, rowIndex) => (
//             <tr key={rowIndex} className={`${rowBackground} ${rowTextColor}`}>  
//               {columns.map((column) => (
//                 <td key={column.key} className={`px-4 py-3 border-b ${borderColor}`}>{row[column.key]}</td>
//               ))}
//               <td className={`px-4 py-3 border-b ${borderColor}`}>  
//                 <button className="text-blue-600" onClick={() => handleEditRow(rowIndex)}><Edit size={16} /></button>
//                 <button className="text-red-600" onClick={() => handleDeleteRow(rowIndex)}><Trash2 size={16} /></button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <div className="flex justify-between p-4 bg-gray-100">
//         <button className="bg-gray-300 rounded px-4 py-2" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}><ChevronLeft size={16} /> Previous</button>
//         <span>Page {currentPage} of {totalPages}</span>
//         <button className="bg-gray-300 rounded px-4 py-2" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>Next <ChevronRight size={16} /></button>
//       </div>
//       {isModalOpen && (
//         <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded-lg w-96">
//             <h2 className="text-lg font-semibold">{editingIndex !== null ? 'Edit Row' : 'Add New Row'}</h2>
//             <button className="absolute top-2 right-2" onClick={handleCloseModal}><X size={20} /></button>
//             <form onSubmit={handleSubmit}>
//               {columns.map(column => (
//                 <div key={column.key} className="mb-4">
//                   <label htmlFor={column.key} className="block text-sm font-medium text-gray-700 mb-1">{column.label}</label>
//                   <input type="text" id={column.key} name={column.key} value={newRowData[column.key] || ''} onChange={handleInputChange} required className="border border-gray-300 rounded px-2 py-1 w-full" />
//                 </div>
//               ))}
//               <button type="submit" className="bg-blue-600 text-white rounded px-4 py-2">{editingIndex !== null ? 'Update Row' : 'Add Row'}</button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DataSourceTable;


import React, { useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, Trash2, ChevronLeft, ChevronRight } from "lucide-react";

interface Column {
  key: string;
  label: string;
  sortable: boolean;
}

interface DataSourceTableProps {
  data: Record<string, string>[];
  columns: Column[];
  itemsPerPage: number;
  onAddRow: (newRow: Record<string, string>) => void;
  onDeleteRow: (index: number) => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DataSourceTable: React.FC<DataSourceTableProps> = ({ data, columns, itemsPerPage, onAddRow, onDeleteRow }) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const tableColumns: ColumnDef<Record<string, string>>[] = [
    ...columns.map((col) => ({
      accessorKey: col.key,
      header: col.label,
    })),
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" onClick={() => handleEditRow(row.index)}>
            <Edit size={16} />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => onDeleteRow(row.index)}>
            <Trash2 size={16} className="text-red-600" />
          </Button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: { sorting },
    onSortingChange: setSorting,
  });

  const handleEditRow = (index: number) => {
    console.log("Edit row at index:", index);
  };

  return (
    <div className="rounded-lg shadow-md p-4 bg-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Members ({data.length})</h2>
        <Button onClick={() => onAddRow({})}>
          <Plus size={16} className="mr-2" /> Add Member
        </Button>
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-between items-center mt-4">
        <Button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          <ChevronLeft size={16} /> Previous
        </Button>
        <span>
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
        <Button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next <ChevronRight size={16} />
        </Button>
      </div>
    </div>
  );
};

export default DataSourceTable;
