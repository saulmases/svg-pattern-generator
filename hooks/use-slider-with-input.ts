import { useState, useEffect } from "react"

interface UseSliderWithInputProps {
  minValue: number
  maxValue: number
  initialValue: number[]
  step?: number
}

export function useSliderWithInput({ minValue, maxValue, initialValue, step = 1 }: UseSliderWithInputProps) {
  const [sliderValue, setSliderValue] = useState<number[]>(initialValue)
  const [inputValues, setInputValues] = useState<string[]>(initialValue.map(String))

  useEffect(() => {
    if (sliderValue[0] > maxValue) {
      setSliderValue([maxValue])
      setInputValues([String(maxValue)])
    }
  }, [maxValue])

  const validateAndUpdateValue = (value: string, index: number) => {
    const numValue = Number(value)
    if (!isNaN(numValue) && numValue >= minValue && numValue <= maxValue) {
      const newSliderValue = [...sliderValue]
      newSliderValue[index] = numValue
      setSliderValue(newSliderValue)
      const newInputValues = [...inputValues]
      newInputValues[index] = String(numValue)
      setInputValues(newInputValues)
    } else {
      const newInputValues = [...inputValues]
      newInputValues[index] = String(sliderValue[index])
      setInputValues(newInputValues)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newInputValues = [...inputValues]
    newInputValues[index] = e.target.value
    setInputValues(newInputValues)
  }

  const handleSliderChange = (newValue: number[]) => {
    setSliderValue(newValue)
    setInputValues(newValue.map(String))
  }

  return {
    sliderValue,
    inputValues,
    validateAndUpdateValue,
    handleInputChange,
    handleSliderChange,
    setSliderValue,
    setInputValues,
  }
}

