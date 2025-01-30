import type React from "react"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Code, FileCode } from "lucide-react"

interface CodePreviewProps {
  componentCode: string
  rawSVG: string
  resetControls: () => void;
}

export const CodePreview: React.FC<CodePreviewProps> = ({ componentCode, rawSVG, resetControls }) => {
  const [copyButtonText, setCopyButtonText] = useState("Copy")

  const copyToClipboard = () => {
    const activeTabContent = document.querySelector('[role="tabpanel"]:not([hidden]) textarea')
    if (activeTabContent instanceof HTMLTextAreaElement) {
      navigator.clipboard
        .writeText(activeTabContent.value)
        .then(() => {
          setCopyButtonText("Copied")
          setTimeout(() => {
            setCopyButtonText("Copy")
          }, 2000)
        })
        .catch((err) => {
          console.error("Failed to copy text: ", err)
        })
    }
  }

  return (
    <>
      <Tabs defaultValue="component" className="w-full">
        <TabsList className="h-auto rounded-none border-b border-border bg-transparent p-0">
          <TabsTrigger
            value="component"
            className="relative flex-col rounded-none px-4 py-2 text-xs after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary"
          >
            <Code className="mb-1.5 opacity-60" size={16} strokeWidth={2} aria-hidden="true" />
            Component
          </TabsTrigger>
          <TabsTrigger
            value="raw"
            className="relative flex-col rounded-none px-4 py-2 text-xs after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary"
          >
            <FileCode className="mb-1.5 opacity-60" size={16} strokeWidth={2} aria-hidden="true" />
            Raw SVG
          </TabsTrigger>
        </TabsList>
        <TabsContent value="component" className="mt-2">
          <Textarea value={componentCode} readOnly className="font-mono text-xs" rows={12} />
        </TabsContent>
        <TabsContent value="raw" className="mt-2">
          <Textarea value={rawSVG} readOnly className="font-mono text-xs" rows={12} />
        </TabsContent>
      </Tabs>
      <div className="w-full flex items-center gap-3">
        <Button className="w-full" variant="default" onClick={copyToClipboard}>
          {copyButtonText}
        </Button>
        <Button className="w-full" variant="outline" onClick={resetControls}>Reset</Button>
      </div>
    </>
  )
}