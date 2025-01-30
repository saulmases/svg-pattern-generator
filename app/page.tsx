"use client";

import { useState, useRef, useId, useEffect } from "react";
import { SVGPattern, ShapeType } from "@/components/SVGPattern";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { useSliderWithInput } from "@/hooks/use-slider-with-input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Square,
  Circle,
  Triangle,
  Star,
  Hexagon,
  Octagon,
  WavesIcon as Wave,
  PenTool,
  Shell,
  Zap,
  Cross,
  ArrowUp,
  Slash,
  Pentagon,
  Asterisk,
  Squircle,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { backgroundColors, shapeColors } from "@/lib/utils";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const shapeOptions = [
  { value: "line", label: "Line", Icon: Slash },
  { value: "square", label: "Square", Icon: Square },
  { value: "circle", label: "Circle", Icon: Circle },
  { value: "triangle", label: "Triangle", Icon: Triangle },
  { value: "pentagon", label: "Pentagon", Icon: Pentagon },
  { value: "hexagon", label: "Hexagon", Icon: Hexagon },
  { value: "octagon", label: "Octagon", Icon: Octagon },
  { value: "squircle", label: "Squircle", Icon: Squircle },
  { value: "plus", label: "Plus", Icon: Cross },
  { value: "star", label: "Star", Icon: Star },
  { value: "zigzag", label: "Zigzag", Icon: Zap },
  { value: "spiral", label: "Spiral", Icon: Shell },
  { value: "wave", label: "Wave", Icon: Wave },
  { value: "asterisk", label: "Asterisk", Icon: Asterisk },
  { value: "arrow", label: "Arrow", Icon: ArrowUp },
  { value: "custom", label: "Custom", Icon: PenTool },
]

export default function Home() {
  const [patternProps, setPatternProps] = useState<{
    shape: ShapeType
    backgroundColor: string
    shapeColor: string
    customPath: string
  }>({
    shape: "line",
    backgroundColor: "bg-background",
    shapeColor: "text-border",
    customPath: "M0,0 L10,10 L20,0 Z",
  })

  const [rawSVG, setRawSVG] = useState("")

  const patternSize = useSliderWithInput({
    minValue: 1,
    maxValue: 200,
    initialValue: [50],
    step: 1
  })
  const shapeSize = useSliderWithInput({
    minValue: 1,
    maxValue: patternSize.sliderValue[0],
    initialValue: [40],
    step: 1,
  })
  const rotation = useSliderWithInput({
    minValue: 0,
    maxValue: 360,
    initialValue: [45],
    step: 5,
  })
  const strokeWidth = useSliderWithInput({
    minValue: 1,
    maxValue: 10,
    initialValue: [2],
    step: 1
  })

  useEffect(() => {
    shapeSize.setSliderValue([Math.min(shapeSize.sliderValue[0], patternSize.sliderValue[0])])
    shapeSize.setInputValues([String(Math.min(shapeSize.sliderValue[0], patternSize.sliderValue[0]))])
  }, [patternSize.sliderValue[0]])

  const [copyButtonText, setCopyButtonText] = useState("Copy");
  const codeRef = useRef<HTMLTextAreaElement>(null)
  const id = useId()

  const handleInputChange = (name: string, value: string | number) => {
    setPatternProps((prev) => ({ ...prev, [name]: value }))
  }

  const generateCode = () => {
    return `<SVGPattern
  patternId="my-pattern"
  shape="${patternProps.shape}"
  shapeSize={${shapeSize.sliderValue[0]}}
  size={${patternSize.sliderValue[0]}}
  backgroundColor="${patternProps.backgroundColor}"
  shapeColor="${patternProps.shapeColor}"
  rotation={${rotation.sliderValue[0]}}
  strokeWidth={${strokeWidth.sliderValue[0]}}
  ${patternProps.shape === "custom" ? `customPath="${patternProps.customPath}"` : ""}
/>`
  }

  const resetControls = () => {
    setPatternProps({
      shape: "line",
      backgroundColor: "bg-background",
      shapeColor: "text-border",
      customPath: "M0,0 L10,10 L20,0 Z",
    });

    patternSize.setSliderValue([50]);
    patternSize.setInputValues(["50"]);

    shapeSize.setSliderValue([40]);
    shapeSize.setInputValues(["40"]);

    rotation.setSliderValue([45]);
    rotation.setInputValues(["45"]);

    strokeWidth.setSliderValue([2]);
    strokeWidth.setInputValues(["2"]);
  };

  const copyToClipboard = () => {
    const activeTabContent = document.querySelector('[role="tabpanel"]:not([hidden]) textarea')
    if (activeTabContent instanceof HTMLTextAreaElement) {
      navigator.clipboard
        .writeText(activeTabContent.value)
        .then(() => {
          setCopyButtonText("Copied");
          setTimeout(() => {
            setCopyButtonText("Copy");
          }, 2000);
        })
        .catch((err) => {
          console.error("Failed to copy text: ", err)
        })
    }
  }

  // Styles
  const styles = {
    radio: {
      label: "cursor-pointer flex flex-col items-center justify-between border border-transparent bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary",
    },
    slider: {
      thumb: "cursor-pointer grow [&>:last-child>span]:h-6 [&>:last-child>span]:w-2.5 [&>:last-child>span]:border-[3px] [&>:last-child>span]:border-background [&>:last-child>span]:bg-primary [&>:last-child>span]:ring-offset-0",
    }
  }

  return (
    <main className="w-full h-dvh bg-border grid grid-cols-1 lg:grid-cols-12 gap-px overflow-hidden">

      <div className="w-full h-[50dvh] lg:h-full bg-background p-6 space-y-8 relative overflow-y-auto col-span-6 lg:col-span-7 xl:col-span-6 2xl:col-span-6">

        <div className="w-full flex items-start justify-between">
          <div className="w-full flex flex-col space-y-1">
            <h1 className="text-2xl font-medium tracking-wide">SVG Pattern Generator</h1>
            <p className="text-xs font-medium text-muted-foreground">Made by <Button className="text-xs p-0 h-auto" asChild variant="link"><Link target="_blank" href="https://saulmases.com">saulmases.com</Link></Button> as a fun side project.</p>
          </div>
          <ThemeToggle />
        </div>

        <div className="w-full flex flex-col lg:flex-row gap-6 lg:gap-12">

          <div className="w-full space-y-6">

            <div className="space-y-3">
              <Label>Shape Type</Label>
              <RadioGroup
                className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-4 gap-1 border p-1"
                value={patternProps.shape}
                onValueChange={(value) => handleInputChange("shape", value)}
              >
                {shapeOptions.map((item) => (
                  <div key={`${id}-${item.value}`} className="relative">
                    <RadioGroupItem id={`${id}-${item.value}`} value={item.value} className="peer sr-only" />
                    <Label
                      htmlFor={`${id}-${item.value}`}
                      className={styles.radio.label}
                    >
                      <item.Icon className="mb-2 h-8 w-8 stroke-1" />
                      <span className="text-[11px]">{item.label}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {patternProps.shape === "custom" && (
              <div className="space-y-2">
                <Label htmlFor="customPath">Custom Path</Label>
                <Textarea
                  id="customPath"
                  rows={4}
                  value={patternProps.customPath}
                  className="text-xs"
                  onChange={(e) => handleInputChange("customPath", e.target.value)}
                  placeholder="Enter SVG path data (e.g., M0,0 L10,10 L20,0 Z)"
                />
              </div>
            )}

          </div>

          <div className="w-full space-y-6">

            <div className="space-y-0">
              <Label>Shape Size</Label>
              <div className="flex items-center gap-4">
                <Slider
                  className={styles.slider.thumb}
                  value={shapeSize.sliderValue}
                  onValueChange={shapeSize.handleSliderChange}
                  min={1}
                  max={patternSize.sliderValue[0]}
                  step={1}
                  aria-label="Shape Size"
                />
                <Input
                  className="w-16 text-center"
                  type="text"
                  inputMode="decimal"
                  value={shapeSize.inputValues[0]}
                  onChange={(e) => shapeSize.handleInputChange(e, 0)}
                  onBlur={() => shapeSize.validateAndUpdateValue(shapeSize.inputValues[0], 0)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      shapeSize.validateAndUpdateValue(shapeSize.inputValues[0], 0)
                    }
                  }}
                  aria-label="Enter shape size"
                />
              </div>
            </div>

            <div className="space-y-0">
              <Label>Pattern Size</Label>
              <div className="flex items-center gap-4">
                <Slider
                  className={styles.slider.thumb}
                  value={patternSize.sliderValue}
                  onValueChange={patternSize.handleSliderChange}
                  min={1}
                  max={200}
                  step={1}
                  aria-label="Pattern Size"
                />
                <Input
                  className="w-16 text-center"
                  type="text"
                  inputMode="decimal"
                  value={patternSize.inputValues[0]}
                  onChange={(e) => patternSize.handleInputChange(e, 0)}
                  onBlur={() => patternSize.validateAndUpdateValue(patternSize.inputValues[0], 0)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      patternSize.validateAndUpdateValue(patternSize.inputValues[0], 0)
                    }
                  }}
                  aria-label="Enter pattern size"
                />
              </div>
            </div>

            <div className="space-y-0">
              <Label>Stroke Width</Label>
              <div className="flex items-center gap-4">
                <Slider
                  className={styles.slider.thumb}
                  value={strokeWidth.sliderValue}
                  onValueChange={strokeWidth.handleSliderChange}
                  min={1}
                  max={10}
                  step={1}
                  aria-label="Stroke Width"
                />
                <Input
                  className="w-16 text-center"
                  type="text"
                  inputMode="decimal"
                  value={strokeWidth.inputValues[0]}
                  onChange={(e) => strokeWidth.handleInputChange(e, 0)}
                  onBlur={() => strokeWidth.validateAndUpdateValue(strokeWidth.inputValues[0], 0)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      strokeWidth.validateAndUpdateValue(strokeWidth.inputValues[0], 0)
                    }
                  }}
                  aria-label="Enter stroke width"
                />
              </div>
            </div>

            <div className="space-y-0">
              <Label>Rotation</Label>
              <div className="flex items-center gap-4">
                <Slider
                  className={styles.slider.thumb}
                  value={rotation.sliderValue}
                  onValueChange={rotation.handleSliderChange}
                  min={0}
                  max={360}
                  step={5}
                  aria-label="Rotation"
                />
                <Input
                  className="w-16 text-center"
                  type="text"
                  inputMode="decimal"
                  value={rotation.inputValues[0]}
                  onChange={(e) => rotation.handleInputChange(e, 0)}
                  onBlur={() => rotation.validateAndUpdateValue(rotation.inputValues[0], 0)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      rotation.validateAndUpdateValue(rotation.inputValues[0], 0)
                    }
                  }}
                  aria-label="Enter rotation"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Background Color</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full h-10 pr-2 flex items-center justify-between space-x-2">
                    <span>{patternProps.backgroundColor.replace("bg-", "")}</span>
                    <div className={`${patternProps.backgroundColor} w-6 h-6 border`}></div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto max-h-40 p-1">
                  {backgroundColors.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex p-0.5">
                      {row.map((color) => (
                        <Button
                          key={color}
                          className={`w-6 h-6 flex p-0 rounded-none ${color}`}
                          onClick={() => handleInputChange("backgroundColor", color)}
                        />
                      ))}
                    </div>
                  ))}
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Shape Color</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full h-10 pr-2 flex items-center justify-between space-x-2">
                    <span>{patternProps.shapeColor.replace("text-", "")}</span>
                    <div className={`${patternProps.shapeColor.replace("text-", "bg-")} w-6 h-6 border`}></div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto max-h-40 p-1">
                  {shapeColors.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex p-0.5">
                      {row.map((color) => (
                        <Button
                          key={color}
                          className={`w-6 h-6 flex p-0 rounded-none ${color.replace("text-", "bg-")}`}
                          onClick={() => handleInputChange("shapeColor", color)}
                        />
                      ))}
                    </div>
                  ))}
                </PopoverContent>
              </Popover>
            </div>

          </div>

        </div>

      </div>

      <div className="w-full h-[50dvh] lg:h-full bg-background p-6 relative col-span-6 lg:col-span-5 xl:col-span-6 2xl:col-span-6">
        <div className="w-full h-full absolute top-0 left-0 right-0 bottom-0 overflow-hidden">
          <SVGPattern
            patternId="preview-pattern"
            {...patternProps}
            shapeSize={shapeSize.sliderValue[0]}
            size={patternSize.sliderValue[0]}
            rotation={rotation.sliderValue[0]}
            strokeWidth={strokeWidth.sliderValue[0]}
            getRawSVG={setRawSVG}
          />
        </div>
        <div className="w-auto lg:w-80 absolute left-6 lg:left-auto right-6 bottom-6 z-20 bg-background border">
          <Tabs defaultValue="raw" className="w-full">
            <TabsList className="w-full h-auto rounded-none border-b border-border bg-transparent p-0">
              <TabsTrigger
                value="raw"
                className="w-full relative flex-col rounded-none px-0 py-4 text-sm after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary"
              >
                Raw SVG
              </TabsTrigger>
              <TabsTrigger
                value="component"
                className="w-full relative flex-col rounded-none px-0 py-4 text-sm after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary"
              >
                Component
              </TabsTrigger>
            </TabsList>
            <TabsContent value="raw" className="p-6 pb-0 mt-0">
              <Textarea value={rawSVG} readOnly className="font-mono text-xs" rows={5} />
            </TabsContent>
            <TabsContent value="component" className="p-6 pb-0 mt-0">
              <Textarea ref={codeRef} value={generateCode()} readOnly className="font-mono text-xs" rows={5} />
            </TabsContent>
          </Tabs>
          <div className="w-full flex items-center gap-3 p-6 pt-3">
            <Button className="w-full" variant="default" onClick={copyToClipboard}>{copyButtonText}</Button>
            <Button className="w-full" variant="outline" onClick={resetControls}>Reset</Button>
          </div>
        </div>
      </div>

    </main>
  )
}