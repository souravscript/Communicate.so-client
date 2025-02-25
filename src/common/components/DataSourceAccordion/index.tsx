"use client"

import gdrive from '@/../public/gDrive.png'
import salesforce from '@/../public/salesforce.png'
import slack from '@/../public/slack.png'
import tally from '@/../public/tally.png'
import database from '@/../public/database.png'
import { ExternalLink, FileText, Link as LinkIcon } from 'lucide-react'

import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { toggleDataSource } from '@/redux/slices/dataSourcesSlice'

import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import Image from "next/image"

export default function IntegrationSettings() {
  const dispatch = useDispatch();
  const enabledSources = useSelector((state: RootState) => state.dataSources.enabledSources);

  const handleToggle = (sourceId: string) => {
    dispatch(toggleDataSource(sourceId));
  };

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
              <span className={`text-sm font-medium mr-4 ${enabledSources['google-drive'] ? 'text-green-600' : 'text-gray-500'}`}>
                {enabledSources['google-drive'] ? 'Enabled' : 'Disabled'}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="border-t p-4 space-y-4">
            <div className="flex items-center space-x-2">
              <Switch 
                id="google-drive-enable" 
                checked={enabledSources['google-drive']}
                onCheckedChange={() => handleToggle('google-drive')}
              />
              <label htmlFor="google-drive-enable">Enable</label>
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
              <span className={`text-sm font-medium mr-4 ${enabledSources['slack'] ? 'text-green-600' : 'text-gray-500'}`}>
                {enabledSources['slack'] ? 'Enabled' : 'Disabled'}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="border-t p-4 space-y-4">
            <div className="flex items-center space-x-2">
              <Switch 
                id="slack-enable" 
                checked={enabledSources['slack']}
                onCheckedChange={() => handleToggle('slack')}
              />
              <label htmlFor="slack-enable">Enable</label>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="client-id" className="text-sm text-gray-600">
                  Client ID
                </label>
                <Input id="client-id" placeholder="Enter your client ID" />
              </div>
              <div className="space-y-2">
                <label htmlFor="client-secret" className="text-sm text-gray-600">
                  Client Secret
                </label>
                <Input id="client-secret" type="password" placeholder="Enter your client secret" />
              </div>
              <div className="space-y-2">
                <label htmlFor="callback-url" className="text-sm text-gray-600">
                  Callback URL (for OAuth)
                </label>
                <Input id="callback-url" defaultValue="https://ravenbank.communicate.so/auth/v1/callback" readOnly />
              </div>
            </div>
            <div className="flex items-center justify-between pt-4">
              <Button variant="link" className="text-blue-600 p-0 h-auto" asChild>
                <a href="#" className="flex items-center gap-2">
                  Documentation
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
              <div className="space-x-3">
                <Button variant="outline">Cancel</Button>
                <Button>Connect</Button>
              </div>
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
              <span className={`text-sm font-medium mr-4 ${enabledSources['tally'] ? 'text-green-600' : 'text-gray-500'}`}>
                {enabledSources['tally'] ? 'Enabled' : 'Disabled'}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="border-t p-4 space-y-4">
            <div className="flex items-center space-x-2">
              <Switch 
                id="tally-enable" 
                checked={enabledSources['tally']}
                onCheckedChange={() => handleToggle('tally')}
              />
              <label htmlFor="tally-enable">Enable</label>
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
              <span className={`text-sm font-medium mr-4 ${enabledSources['salesforce'] ? 'text-green-600' : 'text-gray-500'}`}>
                {enabledSources['salesforce'] ? 'Enabled' : 'Disabled'}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="border-t p-4 space-y-4">
            <div className="flex items-center space-x-2">
              <Switch 
                id="salesforce-enable" 
                checked={enabledSources['salesforce']}
                onCheckedChange={() => handleToggle('salesforce')}
              />
              <label htmlFor="salesforce-enable">Enable</label>
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
              <span className={`text-sm font-medium mr-4 ${enabledSources['pdf'] ? 'text-green-600' : 'text-gray-500'}`}>
                {enabledSources['pdf'] ? 'Enabled' : 'Disabled'}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="border-t p-4 space-y-4">
            <div className="flex items-center space-x-2">
              <Switch 
                id="pdf-enable" 
                checked={enabledSources['pdf']}
                onCheckedChange={() => handleToggle('pdf')}
              />
              <label htmlFor="pdf-enable">Enable</label>
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
              <span className={`text-sm font-medium mr-4 ${enabledSources['links'] ? 'text-green-600' : 'text-gray-500'}`}>
                {enabledSources['links'] ? 'Enabled' : 'Disabled'}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="border-t p-4 space-y-4">
            <div className="flex items-center space-x-2">
              <Switch 
                id="links-enable" 
                checked={enabledSources['links']}
                onCheckedChange={() => handleToggle('links')}
              />
              <label htmlFor="links-enable">Enable</label>
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
              <span className={`text-sm font-medium mr-4 ${enabledSources['database'] ? 'text-green-600' : 'text-gray-500'}`}>
                {enabledSources['database'] ? 'Enabled' : 'Disabled'}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="border-t p-4 space-y-4">
            <div className="flex items-center space-x-2">
              <Switch 
                id="database-enable" 
                checked={enabledSources['database']}
                onCheckedChange={() => handleToggle('database')}
              />
              <label htmlFor="database-enable">Enable</label>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
