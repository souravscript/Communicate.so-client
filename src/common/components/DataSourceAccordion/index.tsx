"use client"

import gdrive from '@/../public/gDrive.png'
import salesforce from '@/../public/salesforce.png'
import slack from '@/../public/slack.png'
import tally from '@/../public/tally.png'
import database from '@/../public/database.png'
import { ExternalLink, FileText, Link as LinkIcon } from 'lucide-react'

import { useDispatch, useSelector } from 'react-redux'
import { enableDataSource, fetchDataSources } from '@/redux/actions/dataSourcesAction'
import { RootState } from '@/redux/store'

import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Image from "next/image"
import { useEffect } from 'react'
import DataSourceShimmer from '@/common/utilComponents/shimmer/DataSourceShimmer'

export default function IntegrationSettings() {
  const dispatch = useDispatch();
  const { dataSources, loading } = useSelector((state: RootState) => state.dataSources);

  useEffect(() => {
    fetchDataSources(dispatch);
  }, [dispatch]);

  const handleToggle = async (id: string) => {
    try {
      await enableDataSource(id, dispatch);
    } catch (error) {
      console.error('Failed to toggle data source:', error);
    }
  };

  const getDataSourceStatus = (type: string) => {
    const dataSource = dataSources.find(ds => ds.type === type);
    return dataSource?.isEnabled || false;
  };

  const getDataSourceId = (type: string) => {
    const dataSource = dataSources.find(ds => ds.type === type);
    return dataSource?.id;
  };

  if (loading) {
    return <DataSourceShimmer />;
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-4 space-y-4 relative left-[10rem]">
      <Accordion type="single" collapsible className="w-full space-y-4">
        <AccordionItem value="google-drive" className="border rounded-lg">
          <AccordionTrigger className="px-4 hover:no-underline [&[data-state=open]]:rounded-t-lg [&[data-state=open]]:rounded-b-none">
            <div className="flex items-center gap-4 w-full">
              <Image
                src={gdrive}
                alt="Google Drive"
                width={24}
                height={24}
                className="rounded"
              />
              <span className="flex-1 text-left">Google Drive</span>
              <span className={`text-sm font-medium mr-4 ${getDataSourceStatus('google-drive') ? 'text-green-600' : 'text-gray-500'}`}>
                {getDataSourceStatus('google-drive') ? 'Enabled' : 'Disabled'}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="border-t p-4 space-y-4">
            <div className="flex items-center space-x-2">
              <Switch 
                id="google-drive-enable" 
                checked={getDataSourceStatus('google-drive')}
                onCheckedChange={() => {
                  const id = getDataSourceId('google-drive');
                  if (id) handleToggle(id);
                }}
              />
              <label htmlFor="google-drive-enable">Enable Google Drive Integration</label>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Connect your Google Drive account to access and search through your documents.</p>
              <Button variant="outline" className="w-full">
                <ExternalLink className="w-4 h-4 mr-2" />
                Connect Google Drive
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="slack" className="border rounded-lg">
          <AccordionTrigger className="px-4 hover:no-underline [&[data-state=open]]:rounded-t-lg [&[data-state=open]]:rounded-b-none">
            <div className="flex items-center gap-4 w-full">
              <Image
                src={slack}
                alt="Slack"
                width={24}
                height={24}
                className="rounded"
              />
              <span className="flex-1 text-left">Slack</span>
              <span className={`text-sm font-medium mr-4 ${getDataSourceStatus('slack') ? 'text-green-600' : 'text-gray-500'}`}>
                {getDataSourceStatus('slack') ? 'Enabled' : 'Disabled'}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="border-t p-4 space-y-4">
            <div className="flex items-center space-x-2">
              <Switch 
                id="slack-enable" 
                checked={getDataSourceStatus('slack')}
                onCheckedChange={() => {
                  const id = getDataSourceId('slack');
                  if (id) handleToggle(id);
                }}
              />
              <label htmlFor="slack-enable">Enable Slack Integration</label>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Connect your Slack workspace to search through channels and messages.</p>
              <Button variant="outline" className="w-full">
                <ExternalLink className="w-4 h-4 mr-2" />
                Connect Slack
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="tally" className="border rounded-lg">
          <AccordionTrigger className="px-4 hover:no-underline [&[data-state=open]]:rounded-t-lg [&[data-state=open]]:rounded-b-none">
            <div className="flex items-center gap-4 w-full">
              <Image
                src={tally}
                alt="Tally"
                width={24}
                height={24}
                className="rounded"
              />
              <span className="flex-1 text-left">Tally</span>
              <span className={`text-sm font-medium mr-4 ${getDataSourceStatus('tally') ? 'text-green-600' : 'text-gray-500'}`}>
                {getDataSourceStatus('tally') ? 'Enabled' : 'Disabled'}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="border-t p-4 space-y-4">
            <div className="flex items-center space-x-2">
              <Switch 
                id="tally-enable" 
                checked={getDataSourceStatus('tally')}
                onCheckedChange={() => {
                  const id = getDataSourceId('tally');
                  if (id) handleToggle(id);
                }}
              />
              <label htmlFor="tally-enable">Enable Tally Integration</label>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Connect your Tally account to access and search through your data.</p>
              <Button variant="outline" className="w-full">
                <ExternalLink className="w-4 h-4 mr-2" />
                Connect Tally
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="salesforce" className="border rounded-lg">
          <AccordionTrigger className="px-4 hover:no-underline [&[data-state=open]]:rounded-t-lg [&[data-state=open]]:rounded-b-none">
            <div className="flex items-center gap-4 w-full">
              <Image
                src={salesforce}
                alt="Salesforce"
                width={24}
                height={24}
                className="rounded"
              />
              <span className="flex-1 text-left">Salesforce</span>
              <span className={`text-sm font-medium mr-4 ${getDataSourceStatus('salesforce') ? 'text-green-600' : 'text-gray-500'}`}>
                {getDataSourceStatus('salesforce') ? 'Enabled' : 'Disabled'}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="border-t p-4 space-y-4">
            <div className="flex items-center space-x-2">
              <Switch 
                id="salesforce-enable" 
                checked={getDataSourceStatus('salesforce')}
                onCheckedChange={() => {
                  const id = getDataSourceId('salesforce');
                  if (id) handleToggle(id);
                }}
              />
              <label htmlFor="salesforce-enable">Enable Salesforce Integration</label>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Connect your Salesforce account to access and search through your data.</p>
              <Button variant="outline" className="w-full">
                <ExternalLink className="w-4 h-4 mr-2" />
                Connect Salesforce
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="pdf" className="border rounded-lg">
          <AccordionTrigger className="px-4 hover:no-underline [&[data-state=open]]:rounded-t-lg [&[data-state=open]]:rounded-b-none">
            <div className="flex items-center gap-4 w-full">
              <div className="w-6 h-6 flex items-center justify-center">
                <FileText className="w-5 h-5 text-red-500" />
              </div>
              <span className="flex-1 text-left">PDF Documents</span>
              <span className={`text-sm font-medium mr-4 ${getDataSourceStatus('pdf') ? 'text-green-600' : 'text-gray-500'}`}>
                {getDataSourceStatus('pdf') ? 'Enabled' : 'Disabled'}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="border-t p-4 space-y-4">
            <div className="flex items-center space-x-2">
              <Switch 
                id="pdf-enable" 
                checked={getDataSourceStatus('pdf')}
                onCheckedChange={() => {
                  const id = getDataSourceId('pdf');
                  if (id) handleToggle(id);
                }}
              />
              <label htmlFor="pdf-enable">Enable PDF Integration</label>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Connect your PDF documents to access and search through your data.</p>
              <Button variant="outline" className="w-full">
                <ExternalLink className="w-4 h-4 mr-2" />
                Connect PDF
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="links" className="border rounded-lg">
          <AccordionTrigger className="px-4 hover:no-underline [&[data-state=open]]:rounded-t-lg [&[data-state=open]]:rounded-b-none">
            <div className="flex items-center gap-4 w-full">
              <div className="w-6 h-6 flex items-center justify-center">
                <LinkIcon className="w-5 h-5" />
              </div>
              <span className="flex-1 text-left">Web Links</span>
              <span className={`text-sm font-medium mr-4 ${getDataSourceStatus('links') ? 'text-green-600' : 'text-gray-500'}`}>
                {getDataSourceStatus('links') ? 'Enabled' : 'Disabled'}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="border-t p-4 space-y-4">
            <div className="flex items-center space-x-2">
              <Switch 
                id="links-enable" 
                checked={getDataSourceStatus('links')}
                onCheckedChange={() => {
                  const id = getDataSourceId('links');
                  if (id) handleToggle(id);
                }}
              />
              <label htmlFor="links-enable">Enable Web Links Integration</label>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Connect your web links to access and search through your data.</p>
              <Button variant="outline" className="w-full">
                <ExternalLink className="w-4 h-4 mr-2" />
                Connect Web Links
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="database" className="border rounded-lg">
          <AccordionTrigger className="px-4 hover:no-underline [&[data-state=open]]:rounded-t-lg [&[data-state=open]]:rounded-b-none">
            <div className="flex items-center gap-4 w-full">
              <Image
                src={database}
                alt="Database"
                width={24}
                height={24}
                className="rounded"
              />
              <span className="flex-1 text-left">Database</span>
              <span className={`text-sm font-medium mr-4 ${getDataSourceStatus('database') ? 'text-green-600' : 'text-gray-500'}`}>
                {getDataSourceStatus('database') ? 'Enabled' : 'Disabled'}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="border-t p-4 space-y-4">
            <div className="flex items-center space-x-2">
              <Switch 
                id="database-enable" 
                checked={getDataSourceStatus('database')}
                onCheckedChange={() => {
                  const id = getDataSourceId('database');
                  if (id) handleToggle(id);
                }}
              />
              <label htmlFor="database-enable">Enable Database Integration</label>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Connect your database to access and search through your data.</p>
              <Button variant="outline" className="w-full">
                <ExternalLink className="w-4 h-4 mr-2" />
                Connect Database
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
