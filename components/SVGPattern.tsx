import type React from "react"

export type ShapeType =
  | "line"
  | "circle"
  | "square"
  | "triangle"
  | "star"
  | "hexagon"
  | "octagon"
  | "plus"
  | "wave"
  | "zigzag"
  | "spiral"
  | "arrow"
  | "custom"

interface SVGPatternProps {
  patternId: string
  backgroundColor?: string
  shapeColor?: string
  size?: number
  strokeWidth?: number
  rotation?: number
  shape: ShapeType
  shapeSize?: number
  customPath?: string
}

export const SVGPattern: React.FC<SVGPatternProps> = ({
  patternId,
  backgroundColor = "bg-background",
  shapeColor = "text-border",
  size = 10,
  strokeWidth = 1,
  rotation = 45,
  shape = "line",
  shapeSize = 5,
  customPath = "",
}) => {
  const renderShape = () => {
    switch (shape) {
      case "line":
        return (
          <line x1="0" y1="0" x2="0" y2={size} strokeWidth={strokeWidth} className={`stroke-current ${shapeColor}`} />
        )
      case "circle":
        return <circle cx={size / 2} cy={size / 2} r={shapeSize / 2} className={`fill-current ${shapeColor}`} />
      case "square":
        return (
          <rect
            x={(size - shapeSize) / 2}
            y={(size - shapeSize) / 2}
            width={shapeSize}
            height={shapeSize}
            className={`fill-current ${shapeColor}`}
          />
        )
      case "triangle":
        const height = (Math.sqrt(3) / 2) * shapeSize
        return (
          <polygon
            points={`${size / 2},${(size - height) / 2} ${(size - shapeSize) / 2},${(size + height) / 2} ${(size + shapeSize) / 2},${(size + height) / 2}`}
            className={`fill-current ${shapeColor}`}
          />
        )
      case "star":
        const starPoints = 5
        const innerRadius = shapeSize / 4
        const outerRadius = shapeSize / 2
        let starPointsStr = ""
        for (let i = 0; i < starPoints * 2; i++) {
          const radius = i % 2 === 0 ? outerRadius : innerRadius
          const angle = (i * Math.PI) / starPoints
          const x = size / 2 + radius * Math.sin(angle)
          const y = size / 2 - radius * Math.cos(angle)
          starPointsStr += `${x},${y} `
        }
        return <polygon points={starPointsStr.trim()} className={`fill-current ${shapeColor}`} />
      case "hexagon":
        const hexPoints = []
        for (let i = 0; i < 6; i++) {
          const angle = (i * Math.PI) / 3
          const x = size / 2 + (shapeSize / 2) * Math.cos(angle)
          const y = size / 2 + (shapeSize / 2) * Math.sin(angle)
          hexPoints.push(`${x},${y}`)
        }
        return <polygon points={hexPoints.join(" ")} className={`fill-current ${shapeColor}`} />
      case "octagon":
        const octPoints = []
        for (let i = 0; i < 8; i++) {
          const angle = (i * Math.PI) / 4
          const x = size / 2 + (shapeSize / 2) * Math.cos(angle)
          const y = size / 2 + (shapeSize / 2) * Math.sin(angle)
          octPoints.push(`${x},${y}`)
        }
        return <polygon points={octPoints.join(" ")} className={`fill-current ${shapeColor}`} />
      case "plus":
        const plusWidth = shapeSize / 3
        return (
          <path
            d={`M${(size - plusWidth) / 2},${(size - shapeSize) / 2}h${plusWidth}v${(shapeSize - plusWidth) / 2}h${(shapeSize - plusWidth) / 2}v${plusWidth}h-${(shapeSize - plusWidth) / 2}v${(shapeSize - plusWidth) / 2}h-${plusWidth}v-${(shapeSize - plusWidth) / 2}h-${(shapeSize - plusWidth) / 2}v-${plusWidth}h${(shapeSize - plusWidth) / 2}z`}
            className={`fill-current ${shapeColor}`}
          />
        )
      case "wave":
        const waveAmplitude = shapeSize / 2
        const waveFrequency = (Math.PI * 2) / size
        return (
          <path
            d={`M0 ${size / 2} Q${size / 4} ${size / 2 - waveAmplitude}, ${size / 2} ${size / 2} T${size} ${size / 2}`}
            className={`stroke-current ${shapeColor} fill-none`}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )
      case "zigzag":
        return (
          <polyline
            points={`0,${size / 2} ${size / 4},${(size - shapeSize) / 2} ${size / 2},${size / 2} ${(3 * size) / 4},${(size + shapeSize) / 2} ${size},${size / 2}`}
            className={`stroke-current ${shapeColor} fill-none`}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )
      case "spiral":
        let spiralPath = `M${size / 2},${size / 2} `
        const spiralTurns = 3
        const spiralPoints = 100
        for (let i = 0; i <= spiralPoints; i++) {
          const angle = (i / spiralPoints) * Math.PI * 2 * spiralTurns
          const distance = ((i / spiralPoints) * shapeSize) / 2
          const x = size / 2 + distance * Math.cos(angle)
          const y = size / 2 + distance * Math.sin(angle)
          spiralPath += `L${x},${y} `
        }
        return <path d={spiralPath} className={`stroke-current ${shapeColor} fill-none`} strokeWidth={strokeWidth} />
      case "arrow":
        const arrowShaftWidth = shapeSize * 0.2
        const arrowHeadWidth = shapeSize * 0.6
        const arrowHeadHeight = shapeSize * 0.6
        return (
          <path
            d={`
                M ${size / 2} ${size / 2 + shapeSize / 2} 
                V ${size / 2 - shapeSize / 2} 
                M ${size / 2 - arrowHeadWidth / 2} ${size / 2 - shapeSize / 2 + arrowHeadHeight}
                L ${size / 2} ${size / 2 - shapeSize / 2}
                L ${size / 2 + arrowHeadWidth / 2} ${size / 2 - shapeSize / 2 + arrowHeadHeight}
              `}
            className={`stroke-current ${shapeColor} fill-none`}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )
      case "custom":
        return (
          <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} preserveAspectRatio="xMidYMid meet">
            <path
              d={customPath}
              className={`fill-current ${shapeColor}`}
              strokeWidth={strokeWidth}
              stroke="currentColor"
              fill="none"
              transform={`scale(${shapeSize / size})`}
            //transformOrigin="center"
            />
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <div className={`w-full h-full ${backgroundColor}`}>
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id={patternId}
            x="0"
            y="0"
            width={size}
            height={size}
            patternUnits="userSpaceOnUse"
            patternTransform={`rotate(${rotation})`}
          >
            {renderShape()}
          </pattern>
        </defs>
        <rect x="0" y="0" width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
    </div>
  )
}

