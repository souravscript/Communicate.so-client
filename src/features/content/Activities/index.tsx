'use client';
import React, { useCallback, useState } from 'react';
import { FileText, Link, RefreshCw } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';
import drive from '@/../public/gDrive.png';
import salesforce from '@/../public/salesforce.png';
import slack from '@/../public/slack.png';
import tally from '@/../public/tally.png';
import database from '@/../public/database.png';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useDropzone } from "react-dropzone";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2 } from 'lucide-react';
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

interface Activity {
  name: string;
  icon: JSX.Element;
  lastSynced: Date;
  addButtonname: string;
  isDisabled?: boolean;
}

const dataSourceMapping = {
  'google_drive': { 
    name: 'Google Drive', 
    icon: <Image src={drive} alt="drive" className="h-24 w-24" />,
    lastSynced: new Date(), 
    addButtonname: 'Add New Folder'
  },
  'slack': { 
    name: 'Slack', 
    icon: <Image src={slack} alt="slack" className="h-24 w-24" />,
    lastSynced: new Date(), 
    addButtonname: 'Connect Channel'
  },
  'tally': { 
    name: 'Tally', 
    icon: <Image src={tally} alt="tally" className="h-24 w-24" />,
    lastSynced: new Date(), 
    addButtonname: 'Connect Forms'
  },
  'salesforce': { 
    name: 'Salesforce', 
    icon: <Image src={salesforce} alt="salesforce" className="h-24 w-24" />,
    lastSynced: new Date(), 
    addButtonname: 'Connect Account'
  },
  'pdf': { 
    name: 'PDF Documents', 
    icon: <FileText className="h-24 w-24 text-red-500" />, 
    lastSynced: new Date(), 
    addButtonname: 'Upload PDF Documents'
  },
  'links': { 
    name: 'Web Links', 
    icon: <Link className="h-24 w-24 text-gray-600" />, 
    lastSynced: new Date(), 
    addButtonname: 'Add New Link'
  },
  'database': { 
    name: 'Database', 
    icon: <Image src={database} alt="database" className="h-24 w-24" />,
    lastSynced: new Date(), 
    addButtonname: 'Connect Database'
  }
};

const Activities = () => {
  const { dataSources } = useSelector((state: RootState) => state.dataSources);
  
  // Get enabled data sources
  const enabledSourceIds = dataSources
    .filter(source => source.isEnabled)
    .map(source => source.name.toLowerCase().replace('-', '_'));

  const [activeTab, setActiveTab] = useState<string>(enabledSourceIds[0] || 'google_drive');
  const [selectedActivity, setSelectedActivity] = useState<Activity>(
    dataSourceMapping[enabledSourceIds[0] as keyof typeof dataSourceMapping] || dataSourceMapping['google_drive']
  );
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Add the new files to the existing uploaded files
    setUploadedFiles((prevFiles) => [
      ...prevFiles,
      ...acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file), // Optional: for image previews
        })
      ),
    ]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] }, // Only accept PDF files
  });

  const removeFile = (fileName: string) => {
    setUploadedFiles((prevFiles) =>
      prevFiles.filter((file) => file.name !== fileName)
    );
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });
  };

  const tabTriggerClasses = 
  'border-transparent rounded-none p-2 data-[state=active]:border-b-2 data-[state=active]:border-b-primaryColor data-[state=active]:text-primaryColor';
  
  // const tabPositions: { [key: string]: string } = {
  //   "google-drive": "left-[23.5rem]",
  //   "salesforce": "left-[23.5rem]",
  //   "pdfs": "left-[23.5rem]",
  //   "links": "left-[23.5rem]"
  // };
  
  

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setSelectedActivity(dataSourceMapping[value as keyof typeof dataSourceMapping]);
  };

  const getDataSourceName = (sourceId: string) => {
    const mappingKey = sourceId.toLowerCase().replace('-', '_');
    return dataSourceMapping[mappingKey as keyof typeof dataSourceMapping]?.name || sourceId;
  };

  const renderContent = (activity: Activity) => (
    <div className="w-full">
      <Card className="py-4 px-1 border-none shadow-none">
        <div className="flex items-start w-11/12 justify-between">
          <div className="flex items-center space-x-4">
            <div className={`p-2 bg-gray-50 size-40 flex justify-center items-center rounded-lg`}>
              {activity.icon}
            </div>
            <div className='flex flex-col'>
              <div className="space-y-1 flex flex-col">
                <div className="flex items-center text-sm text-gray-500">
                  <span>Last Synced: {formatDate(activity.lastSynced)}</span>
                  <RefreshCw className="w-4 h-4 ml-2 text-blue-500" />
                </div>
              </div>
              {activity.name === 'Google Drive' && (
                <div className='bg-white py-4 flex'>
                  <div className='flex gap-3'>
                    <Badge variant="secondary" className='bg-green-100 text-green-800 hover:bg-green-200'>PDFs</Badge>
                    <Badge variant="secondary" className='bg-green-100 text-green-800 hover:bg-green-200'>Docs</Badge>
                    <Badge variant="secondary" className='bg-green-100 text-green-800 hover:bg-green-200'>Spreadsheets</Badge>
                  </div>
                </div>
              )}
            </div>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                className="min-w-[160px] h-9 relative right-[-23.5rem] top-2 bg-[#F1F5F9] hover:bg-gray-200"
                disabled={activity.isDisabled}
              >
                {activity.addButtonname}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>
                  {activity.name === 'PDF Documents' ? 'Upload PDF Documents' : `Connect ${activity.name}`}
                </DialogTitle>
                <DialogDescription>
                  {activity.name === 'PDF Documents' 
                    ? 'Sync your PDF manually by uploading here.'
                    : `Connect your ${activity.name} account to sync data.`
                  }
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-4 py-4">
                <div className="flex flex-col items-center gap-4">
                  <Label htmlFor="name" className="relative left-[-7.8rem]">
                    Accesible Categories
                  </Label>
                  <div className='flex gap-3 border border-gray-300 w-[24rem] p-2 rounded-md'>
                    <Badge variant="secondary" className='bg-green-100 text-green-800 hover:bg-green-200'>Sales</Badge>
                    <Badge variant="secondary" className='bg-green-100 text-green-800 hover:bg-green-200'>Business</Badge>
                    <Badge variant="secondary" className='bg-green-100 text-green-800 hover:bg-green-200'>Executives</Badge>
                  </div>
                </div>

                <div
                  {...getRootProps()}
                  className="flex flex-col items-center px-6 py-10 border-2 border-dashed border-gray-300 rounded-md cursor-pointer"
                >
                  <input {...getInputProps()} />
                  <p className='opacity-45'>Drop the files here ...</p>
                </div>

                {/* Uploaded files list */}
                {uploadedFiles.length > 0 && (
                <div className="mt-4 border border-gray-300 rounded-lg w-full">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>File Name</TableHead>
                        <TableHead>Total Size (KB)</TableHead>
                        <TableHead>{/* Empty header for delete icon */}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {uploadedFiles.map((file) => (
                        <TableRow key={file.name}>
                          <TableCell className="font-medium">{file.name}</TableCell>
                          <TableCell>{(file.size / 1024).toFixed(2)} KB</TableCell>
                          <TableCell>
                            <button
                              onClick={() => removeFile(file.name)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" /> {/* Delete icon */}
                            </button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
              </div>
              <DialogFooter>
                <Button className='bg-white text-black border border-gray-300 hover:bg-primaryColor hover:text-white'>Cancel</Button>
                <Button disabled={uploadedFiles.length === 0} className='bg-primaryColor text-white hover:border hover:border-gray-300 hover:text-black hover:bg-white' type="submit">Train</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
      </Card>
    </div>
  );
  
  return (
    <div className="space-y-6 mt-4">
      <div className="flex flex-col justify-between">
        
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-auto">
          <h1 className="text-2xl font-bold mb-4">Content Activities</h1>
            <TabsList className="bg-white border-b border-gray-200">
                {enabledSourceIds.map(sourceId => (
                  <TabsTrigger 
                    key={sourceId}
                    className={tabTriggerClasses} 
                    style={{ boxShadow: 'none' }} 
                    value={sourceId}
                  >
                    {getDataSourceName(sourceId)}
                  </TabsTrigger>
                ))}
            </TabsList>
        </Tabs>
      </div>
      {renderContent(selectedActivity)}
    </div>
  );
};

export default Activities;