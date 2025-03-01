"use client"

import { useDispatch, useSelector } from 'react-redux'
import { toggleDataSource, fetchDataSources } from '@/redux/actions/dataSourcesAction'
import { RootState } from '@/redux/store'

import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { 
  ExternalLink, 
  FileText, 
  Database, 
  MessageSquare, 
  Table, 
  Link as LinkIcon,
  File
} from 'lucide-react'
import { useEffect } from 'react'
import DataSourceShimmer from '@/common/utilComponents/shimmer/DataSourceShimmer'

// Helper function to sanitize data source name
const sanitizeDataSourceName = (name: string): string => {
  // Replace hyphens with spaces and capitalize each word
  return name
    ? name
        .split(/[-_\s]+/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ')
    : 'Unknown';
};

export default function DataSourceAccordion() {
  const dispatch = useDispatch();
  const { dataSources, loading } = useSelector((state: RootState) => state.dataSources);

  useEffect(() => {
    fetchDataSources(dispatch);
  }, [dispatch]);

  const handleToggle = async (id: string) => {
    try {
      await toggleDataSource(id, dispatch);
    } catch (error) {
      console.error('Failed to toggle data source:', error);
    }
  };

  if (loading) {
    return <DataSourceShimmer />;
  }

  // Ensure dataSources is an array
  const validDataSources = Array.isArray(dataSources) ? dataSources : [];

  return (
    <div className="w-full max-w-3xl mx-auto p-4 space-y-4 relative left-[10rem]">
      <Accordion type="single" collapsible className="w-full space-y-4">
        {validDataSources.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            No data sources available. Please add some data sources.
          </div>
        ) : (
          validDataSources.map((dataSource) => {
            const sanitizedName = sanitizeDataSourceName(dataSource?.name);
            
            // Determine which icon to show based on type
            let IconComponent = FileText;
            let iconColor = "text-gray-500";
            
            if (dataSource?.type) {
              const type = dataSource.type.toLowerCase();
              
              if (type.includes('google') || type.includes('drive')) {
                IconComponent = File;
                iconColor = "text-blue-500";
              } else if (type.includes('slack')) {
                IconComponent = MessageSquare;
                iconColor = "text-yellow-500";
              } else if (type.includes('salesforce')) {
                IconComponent = Database;
                iconColor = "text-blue-700";
              } else if (type.includes('tally')) {
                IconComponent = Table;
                iconColor = "text-green-500";
              } else if (type.includes('database')) {
                IconComponent = Database;
                iconColor = "text-purple-500";
              } else if (type.includes('pdf')) {
                IconComponent = FileText;
                iconColor = "text-red-500";
              } else if (type.includes('link')) {
                IconComponent = LinkIcon;
                iconColor = "text-blue-500";
              }
            }
            
            return (
              <AccordionItem 
                key={dataSource?.id || Math.random().toString()} 
                value={dataSource?.id || Math.random().toString()} 
                className="border rounded-lg"
              >
                <AccordionTrigger className="px-4 hover:no-underline [&[data-state=open]]:rounded-t-lg [&[data-state=open]]:rounded-b-none">
                  <div className="flex items-center gap-4 w-full">
                    <div className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded-md">
                      <IconComponent className={`w-4 h-4 ${iconColor}`} />
                    </div>
                    <span className="flex-1 text-left">{sanitizedName}</span>
                    <span className={`text-sm font-medium mr-4 ${dataSource?.isEnabled ? 'text-green-600' : 'text-gray-500'}`}>
                      {dataSource?.isEnabled ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="border-t p-4 space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id={`${dataSource?.id || 'unknown'}-enable`} 
                      checked={dataSource?.isEnabled || false}
                      onCheckedChange={() => dataSource?.id && handleToggle(dataSource.id)}
                    />
                    <label htmlFor={`${dataSource?.id || 'unknown'}-enable`}>Enable {sanitizedName} Integration</label>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">
                      Connect your {sanitizedName} account to access and search through your data.
                    </p>
                    <Button variant="outline" className="w-full mt-4">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Connect {sanitizedName}
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })
        )}
      </Accordion>
    </div>
  );
}
