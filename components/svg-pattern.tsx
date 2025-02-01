import * as React from "react";
import ReactDOMServer from "react-dom/server";

export type ShapeType =
  | "line"
  | "circle"
  | "square"
  | "triangle"
  | "star"
  | "asterisk"
  | "pentagon"
  | "hexagon"
  | "octagon"
  | "plus"
  | "wave"
  | "zigzag"
  | "spiral"
  | "arrow"
  | "squircle"
  | "heart"
  | "flower"
  | "moon"
  | "sparkle"
  | "diamond"
  | "bone"
  | "cloud"
  | "droplet"
  | "custom"

interface SVGPatternProps {
  patternId: string
  backgroundColor?: string
  shapeColor?: string
  shapeFillColor?: string
  size?: number
  strokeWidth?: number
  rotation?: number
  shape: ShapeType
  shapeSize?: number
  customPath?: string
  getRawSVG?: (svg: string) => void
}

export const SVGPattern: React.FC<SVGPatternProps> = ({
  patternId,
  backgroundColor = "bg-background",
  shapeFillColor = "fill-border/40",
  shapeColor = "stroke-border",
  size = 10,
  strokeWidth = 1,
  rotation = 45,
  shape = "line",
  shapeSize = 5,
  customPath = "",
  getRawSVG,
}) => {
  const renderShape = () => {
    switch (shape) {
      case "line":
        return (
          <line
            x1="0"
            y1="0"
            x2="0"
            y2={size}
            strokeWidth={strokeWidth}
            className={`fill-none ${shapeColor}`}
          />
        )
      case "circle":
        return (
          <circle
            cx={size / 2}
            cy={size / 2}
            r={shapeSize / 2}
            strokeWidth={strokeWidth}
            className={`${shapeFillColor} ${shapeColor}`}
          />
        )
      case "square":
        return (
          <rect
            x={(size - shapeSize) / 2}
            y={(size - shapeSize) / 2}
            width={shapeSize}
            height={shapeSize}
            strokeWidth={strokeWidth}
            className={`${shapeFillColor} ${shapeColor}`}
          />
        )
      case "triangle":
        const height = (Math.sqrt(3) / 2) * shapeSize
        return (
          <polygon
            points={`${size / 2},${(size - height) / 2} ${(size - shapeSize) / 2},${(size + height) / 2} ${(size + shapeSize) / 2},${(size + height) / 2}`}
            strokeWidth={strokeWidth}
            className={`${shapeFillColor} ${shapeColor}`}
          />
        )
      case "asterisk":
        const center = size / 2;
        const armLength = shapeSize * 1.5;
        const crossArmLength = shapeSize;

        return (
          <>
            <path
              d={`M${center},${center - armLength} L${center},${center + armLength}`}
              strokeWidth={strokeWidth}
              className={`fill-none ${shapeColor}`}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d={`M${center - armLength},${center} L${center + armLength},${center}`}
              strokeWidth={strokeWidth}
              className={`${shapeFillColor} ${shapeColor}`}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d={`M${center - crossArmLength},${center - crossArmLength} L${center + crossArmLength},${center + crossArmLength}`}
              strokeWidth={strokeWidth}
              className={`${shapeFillColor} ${shapeColor}`}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d={`M${center + crossArmLength},${center - crossArmLength} L${center - crossArmLength},${center + crossArmLength}`}
              strokeWidth={strokeWidth}
              className={`${shapeFillColor} ${shapeColor}`}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d={`M${center - crossArmLength},${center + crossArmLength} L${center + crossArmLength},${center - crossArmLength}`}
              strokeWidth={strokeWidth}
              className={`${shapeFillColor} ${shapeColor}`}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d={`M${center + crossArmLength},${center + crossArmLength} L${center - crossArmLength},${center - crossArmLength}`}
              strokeWidth={strokeWidth}
              className={`${shapeFillColor} ${shapeColor}`}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </>
        );
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
        return (
          <polygon
            points={starPointsStr.trim()}
            strokeWidth={strokeWidth}
            className={`${shapeFillColor} ${shapeColor}`}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )
      case "pentagon":
        const pentagonPoints = []
        for (let i = 0; i < 5; i++) {
          const angle = (i * Math.PI * 2) / 5
          const x = size / 2 + (shapeSize / 2) * Math.cos(angle)
          const y = size / 2 + (shapeSize / 2) * Math.sin(angle)
          pentagonPoints.push(`${x},${y}`)
        }
        return (
          <polygon points={pentagonPoints.join(" ")}
            strokeWidth={strokeWidth}
            className={`${shapeFillColor} ${shapeColor}`}
          />
        )
      case "hexagon":
        const hexPoints = []
        for (let i = 0; i < 6; i++) {
          const angle = (i * Math.PI) / 3
          const x = size / 2 + (shapeSize / 2) * Math.cos(angle)
          const y = size / 2 + (shapeSize / 2) * Math.sin(angle)
          hexPoints.push(`${x},${y}`)
        }
        return (
          <polygon
            points={hexPoints.join(" ")}
            strokeWidth={strokeWidth}
            className={`${shapeFillColor} ${shapeColor}`}
          />
        )
      case "octagon":
        const octPoints = []
        for (let i = 0; i < 8; i++) {
          const angle = (i * Math.PI) / 4
          const x = size / 2 + (shapeSize / 2) * Math.cos(angle)
          const y = size / 2 + (shapeSize / 2) * Math.sin(angle)
          octPoints.push(`${x},${y}`)
        }
        return (
          <polygon
            points={octPoints.join(" ")}
            strokeWidth={strokeWidth}
            className={`${shapeFillColor} ${shapeColor}`}
          />
        )
      case "plus":
        const plusWidth = shapeSize / 3
        return (
          <path
            d={`M${(size - plusWidth) / 2},${(size - shapeSize) / 2}h${plusWidth}v${(shapeSize - plusWidth) / 2}h${(shapeSize - plusWidth) / 2}v${plusWidth}h-${(shapeSize - plusWidth) / 2}v${(shapeSize - plusWidth) / 2}h-${plusWidth}v-${(shapeSize - plusWidth) / 2}h-${(shapeSize - plusWidth) / 2}v-${plusWidth}h${(shapeSize - plusWidth) / 2}z`}
            strokeWidth={strokeWidth}
            className={`${shapeFillColor} ${shapeColor}`}
          />
        )
      case "wave":
        const waveAmplitude = shapeSize / 2
        // const waveFrequency = (Math.PI * 2) / size
        return (
          <path
            d={`M0 ${size / 2} Q${size / 4} ${size / 2 - waveAmplitude}, ${size / 2} ${size / 2} T${size} ${size / 2}`}
            strokeWidth={strokeWidth}
            className={`fill-none ${shapeColor}`}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )
      case "zigzag":
        return (
          <polyline
            points={`0,${size / 2} ${size / 4},${(size - shapeSize) / 2} ${size / 2},${size / 2} ${(3 * size) / 4},${(size + shapeSize) / 2} ${size},${size / 2}`}
            strokeWidth={strokeWidth}
            className={`fill-none ${shapeColor}`}
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
        return (
          <path
            d={spiralPath}
            strokeWidth={strokeWidth}
            className={`fill-none ${shapeColor}`}
          />
        )
      case "arrow":
        // const arrowShaftWidth = shapeSize * 0.2
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
            strokeWidth={strokeWidth}
            className={`fill-none ${shapeColor}`}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )
      case "squircle":
        const squircleRadius = shapeSize / 2;
        const squircleWidth = size;
        return (
          <path
            d={`
                M${squircleWidth / 2},0
                C${squircleWidth - squircleRadius},0 ${squircleWidth},${squircleRadius} ${squircleWidth},${squircleWidth / 2}
                C${squircleWidth},${squircleWidth - squircleRadius} ${squircleWidth - squircleRadius},${squircleWidth} ${squircleWidth / 2},${squircleWidth}
                C${squircleRadius},${squircleWidth} 0,${squircleWidth - squircleRadius} 0,${squircleWidth / 2}
                C0,${squircleRadius} ${squircleRadius},0 ${squircleWidth / 2},0
              `}
            strokeWidth={strokeWidth}
            className={`${shapeFillColor} ${shapeColor}`}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        );
      case "heart":
        return (
          <path
            d={`
              M ${19 * (shapeSize / 24)} ${14 * (shapeSize / 24)}
              c ${1.49 * (shapeSize / 24)}-${1.46 * (shapeSize / 24)}
                ${3 * (shapeSize / 24)}-${3.21 * (shapeSize / 24)}
                ${3 * (shapeSize / 24)}-${5.5 * (shapeSize / 24)}
              A ${5.5 * (shapeSize / 24)} ${5.5 * (shapeSize / 24)} 0 0 0 
                ${16.5 * (shapeSize / 24)} ${3 * (shapeSize / 24)}
              c -${1.76 * (shapeSize / 24)} 0 -${3 * (shapeSize / 24)} 
                ${0.5 * (shapeSize / 24)} -${4.5 * (shapeSize / 24)}
                ${2 * (shapeSize / 24)}
              c -${1.5 * (shapeSize / 24)}-${1.5 * (shapeSize / 24)}
                -${2.74 * (shapeSize / 24)}-${2 * (shapeSize / 24)}
                -${4.5 * (shapeSize / 24)}-${2 * (shapeSize / 24)}
              A ${5.5 * (shapeSize / 24)} ${5.5 * (shapeSize / 24)} 0 0 0 
                ${2 * (shapeSize / 24)} ${8.5 * (shapeSize / 24)}
              c 0 ${2.3 * (shapeSize / 24)} 
                ${1.5 * (shapeSize / 24)} ${4.05 * (shapeSize / 24)}
                ${3 * (shapeSize / 24)} ${5.5 * (shapeSize / 24)}
              l ${7 * (shapeSize / 24)} ${7 * (shapeSize / 24)}
              Z
            `}
            className={`${shapeFillColor} ${shapeColor}`}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        );

      case "flower":
        return (
          <>
            {/* Outer Circle */}
            <path
              d={`
                M ${12 * (shapeSize / 24)} ${16.5 * (shapeSize / 24)}
                A ${4.5 * (shapeSize / 24)} ${4.5 * (shapeSize / 24)} 0 1 1 ${7.5 * (shapeSize / 24)} ${12 * (shapeSize / 24)}
                A ${4.5 * (shapeSize / 24)} ${4.5 * (shapeSize / 24)} 0 1 1 ${12 * (shapeSize / 24)} ${7.5 * (shapeSize / 24)}
                A ${4.5 * (shapeSize / 24)} ${4.5 * (shapeSize / 24)} 0 1 1 ${16.5 * (shapeSize / 24)} ${12 * (shapeSize / 24)}
                A ${4.5 * (shapeSize / 24)} ${4.5 * (shapeSize / 24)} 0 1 1 ${12 * (shapeSize / 24)} ${16.5 * (shapeSize / 24)} Z
              `}
              className={`${shapeFillColor} ${shapeColor}`}
              strokeWidth={strokeWidth}
            />
            {/* Circle */}
            <circle
              cx={12 * (shapeSize / 24)}
              cy={12 * (shapeSize / 24)}
              r={3 * (shapeSize / 24)}
              className={`${shapeFillColor} ${shapeColor}`}
              strokeWidth={strokeWidth}
            />
            {/* Vertical Line */}
            <path
              d={`
                M ${12 * (shapeSize / 24)} ${7.5 * (shapeSize / 24)}
                V ${9 * (shapeSize / 24)}
              `}
              className={`fill-none ${shapeFillColor} ${shapeColor}`}
              strokeWidth={strokeWidth}
            />
            {/* Horizontal Line */}
            <path
              d={`
                M ${7.5 * (shapeSize / 24)} ${12 * (shapeSize / 24)}
                H ${9 * (shapeSize / 24)}
              `}
              className={`fill-none ${shapeFillColor} ${shapeColor}`}
              strokeWidth={strokeWidth}
            />
            <path
              d={`
                M ${16.5 * (shapeSize / 24)} ${12 * (shapeSize / 24)}
                H ${15 * (shapeSize / 24)}
              `}
              className={`fill-none ${shapeFillColor} ${shapeColor}`}
              strokeWidth={strokeWidth}
            />
            {/* Vertical Lines */}
            <path
              d={`
                M ${12 * (shapeSize / 24)} ${16.5 * (shapeSize / 24)}
                V ${15 * (shapeSize / 24)}
              `}
              className={`fill-none ${shapeFillColor} ${shapeColor}`}
              strokeWidth={strokeWidth}
            />
            {/* Diagonal Lines */}
            <path
              d={`
                M ${8 * (shapeSize / 24)} ${8 * (shapeSize / 24)}
                L ${9.88 * (shapeSize / 24)} ${9.88 * (shapeSize / 24)}
              `}
              className={`fill-none ${shapeFillColor} ${shapeColor}`}
              strokeWidth={strokeWidth}
            />
            <path
              d={`
                M ${14.12 * (shapeSize / 24)} ${9.88 * (shapeSize / 24)}
                L ${16 * (shapeSize / 24)} ${8 * (shapeSize / 24)}
              `}
              className={`fill-none ${shapeFillColor} ${shapeColor}`}
              strokeWidth={strokeWidth}
            />
            <path
              d={`
                M ${8 * (shapeSize / 24)} ${16 * (shapeSize / 24)}
                L ${9.88 * (shapeSize / 24)} ${14.12 * (shapeSize / 24)}
              `}
              className={`fill-none ${shapeFillColor} ${shapeColor}`}
              strokeWidth={strokeWidth}
            />
            <path
              d={`
                M ${14.12 * (shapeSize / 24)} ${14.12 * (shapeSize / 24)}
                L ${16 * (shapeSize / 24)} ${16 * (shapeSize / 24)}
              `}
              className={`fill-none ${shapeFillColor} ${shapeColor}`}
              strokeWidth={strokeWidth}
            />
          </>
        );
      case "moon":
        return (
          <path
            d={`
              M ${size / 2},${(size - shapeSize) / 2} 
              A ${shapeSize / 4} ${shapeSize / 4} 0 0 0 ${size / 2 + shapeSize / 2},${size / 2} 
              A ${9 * shapeSize / 16} ${9 * shapeSize / 16} 0 1 1 ${size / 2},${(size - shapeSize) / 2} 
            `}
            strokeWidth={strokeWidth}
            className={`${shapeFillColor} ${shapeColor}`}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        );
      case "sparkle":
        return (
          <path
            d={`
              M ${9.937 * (shapeSize / 24)} ${15.5 * (shapeSize / 24)}
              A ${2 * (shapeSize / 24)} ${2 * (shapeSize / 24)} 0 0 0 ${8.5 * (shapeSize / 24)} ${14.063 * (shapeSize / 24)}
              L ${2.365 * (shapeSize / 24)} ${12.481 * (shapeSize / 24)}
              A ${0.5 * (shapeSize / 24)} ${0.5 * (shapeSize / 24)} 0 0 1 ${2.365 * (shapeSize / 24)} ${11.519 * (shapeSize / 24)}
              L ${8.5 * (shapeSize / 24)} ${9.936 * (shapeSize / 24)}
              A ${2 * (shapeSize / 24)} ${2 * (shapeSize / 24)} 0 0 0 ${9.937 * (shapeSize / 24)} ${8.5 * (shapeSize / 24)}
              L ${11.519 * (shapeSize / 24)} ${2.365 * (shapeSize / 24)}
              A ${0.5 * (shapeSize / 24)} ${0.5 * (shapeSize / 24)} 0 0 1 ${12.481 * (shapeSize / 24)} ${2.365 * (shapeSize / 24)}
              L ${14.063 * (shapeSize / 24)} ${8.5 * (shapeSize / 24)}
              A ${2 * (shapeSize / 24)} ${2 * (shapeSize / 24)} 0 0 0 ${15.5 * (shapeSize / 24)} ${9.937 * (shapeSize / 24)}
              L ${21.635 * (shapeSize / 24)} ${11.518 * (shapeSize / 24)}
              A ${0.5 * (shapeSize / 24)} ${0.5 * (shapeSize / 24)} 0 0 1 ${21.635 * (shapeSize / 24)} ${12.482 * (shapeSize / 24)}
              L ${15.5 * (shapeSize / 24)} ${14.063 * (shapeSize / 24)}
              A ${2 * (shapeSize / 24)} ${2 * (shapeSize / 24)} 0 0 0 ${14.063 * (shapeSize / 24)} ${15.5 * (shapeSize / 24)}
              L ${12.481 * (shapeSize / 24)} ${21.635 * (shapeSize / 24)}
              A ${0.5 * (shapeSize / 24)} ${0.5 * (shapeSize / 24)} 0 0 1 ${11.519 * (shapeSize / 24)} ${21.635 * (shapeSize / 24)}
              Z
            `}
            strokeWidth={strokeWidth}
            className={`${shapeFillColor} ${shapeColor}`}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        );
      case "diamond":
        return (
          <>
            <path
              d={`
                M ${6 * (shapeSize / 24)} ${3 * (shapeSize / 24)}
                H ${18 * (shapeSize / 24)}
                L ${22 * (shapeSize / 24)} ${9 * (shapeSize / 24)}
                L ${12 * (shapeSize / 24)} ${22 * (shapeSize / 24)}
                L ${2 * (shapeSize / 24)} ${9 * (shapeSize / 24)}
                Z
              `}
              className={`${shapeFillColor} ${shapeColor}`}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d={`
                M ${11 * (shapeSize / 24)} ${3 * (shapeSize / 24)}
                L ${8 * (shapeSize / 24)} ${9 * (shapeSize / 24)}
                L ${12 * (shapeSize / 24)} ${22 * (shapeSize / 24)}
                L ${16 * (shapeSize / 24)} ${9 * (shapeSize / 24)}
                L ${13 * (shapeSize / 24)} ${3 * (shapeSize / 24)}
              `}
              className={`fill-none ${shapeFillColor} ${shapeColor}`}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d={`
                M ${2 * (shapeSize / 24)} ${9 * (shapeSize / 24)}
                H ${22 * (shapeSize / 24)}
              `}
              className={`fill-none ${shapeFillColor} ${shapeColor}`}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </>
        );
      case "bone":
        return (
          <path
            d={`
              M ${17 * (shapeSize / 24)} ${10 * (shapeSize / 24)}
              c ${0.7 * (shapeSize / 24)}-${0.7 * (shapeSize / 24)}
                ${1.69 * (shapeSize / 24)} 0 
                ${2.5 * (shapeSize / 24)} 0
              a ${2.5 * (shapeSize / 24)} ${2.5 * (shapeSize / 24)} 0 1 0 0-${5 * (shapeSize / 24)}
              a ${0.5 * (shapeSize / 24)} ${0.5 * (shapeSize / 24)} 0 0 1
                -${0.5 * (shapeSize / 24)} -${0.5 * (shapeSize / 24)}
              a ${2.5 * (shapeSize / 24)} ${2.5 * (shapeSize / 24)} 0 1 0 -${5 * (shapeSize / 24)} 0
              c 0 ${0.81 * (shapeSize / 24)}
                ${0.7 * (shapeSize / 24)} ${1.8 * (shapeSize / 24)}
                0 ${2.5 * (shapeSize / 24)}
              l -${7 * (shapeSize / 24)} ${7 * (shapeSize / 24)}
              c -${0.7 * (shapeSize / 24)} ${0.7 * (shapeSize / 24)}
                -${1.69 * (shapeSize / 24)} 0 
                -${2.5 * (shapeSize / 24)} 0
              a ${2.5 * (shapeSize / 24)} ${2.5 * (shapeSize / 24)} 0 0 0 0 ${5 * (shapeSize / 24)}
              c ${0.28 * (shapeSize / 24)} 0 
                ${0.5 * (shapeSize / 24)} ${0.22 * (shapeSize / 24)} 
                ${0.5 * (shapeSize / 24)} ${0.5 * (shapeSize / 24)}
              a ${2.5 * (shapeSize / 24)} ${2.5 * (shapeSize / 24)} 0 1 0 ${5 * (shapeSize / 24)} 0
              c 0 -${0.81 * (shapeSize / 24)}
                -${0.7 * (shapeSize / 24)} -${1.8 * (shapeSize / 24)}
                0 -${2.5 * (shapeSize / 24)}
              Z
            `}
            className={`${shapeFillColor} ${shapeColor}`}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        );
      case "cloud":
        return (
          <path
            d={`
              M ${17.5 * (shapeSize / 24)} ${19 * (shapeSize / 24)}
              H ${9 * (shapeSize / 24)}
              a ${7 * (shapeSize / 24)} ${7 * (shapeSize / 24)} 0 1 1 ${6.71 * (shapeSize / 24)}-${9 * (shapeSize / 24)}
              h ${1.79 * (shapeSize / 24)}
              a ${4.5 * (shapeSize / 24)} ${4.5 * (shapeSize / 24)} 0 1 1 0 ${9 * (shapeSize / 24)}
              Z
            `}
            className={`${shapeFillColor} ${shapeColor}`}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        );
      case "droplet":
        return (
          <path
            d={`
              M ${12 * (shapeSize / 24)} ${22 * (shapeSize / 24)}
              a ${7 * (shapeSize / 24)} ${7 * (shapeSize / 24)} 0 0 0 ${7 * (shapeSize / 24)}-${7 * (shapeSize / 24)}
              c 0-${2 * (shapeSize / 24)}-${1 * (shapeSize / 24)}-${3.9 * (shapeSize / 24)}-${3 * (shapeSize / 24)}-${5.5 * (shapeSize / 24)}
              s-${3.5 * (shapeSize / 24)}-${4 * (shapeSize / 24)}-${4 * (shapeSize / 24)}-${6.5 * (shapeSize / 24)}
              c-${.5 * (shapeSize / 24)} ${2.5 * (shapeSize / 24)}-${2 * (shapeSize / 24)} ${4.9 * (shapeSize / 24)}-${4 * (shapeSize / 24)} ${6.5 * (shapeSize / 24)}
              C ${6 * (shapeSize / 24)} ${11.1 * (shapeSize / 24)} ${5 * (shapeSize / 24)} ${13 * (shapeSize / 24)}
              ${5 * (shapeSize / 24)} ${15 * (shapeSize / 24)} a ${7 * (shapeSize / 24)} ${7 * (shapeSize / 24)} 0 0 0 ${7 * (shapeSize / 24)} ${7 * (shapeSize / 24)} z
            `}
            className={`${shapeFillColor} ${shapeColor}`}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        );
      case "custom":
        return (
          <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} preserveAspectRatio="xMidYMid meet">
            <path
              d={customPath}
              strokeWidth={strokeWidth}
              className={`${shapeFillColor} ${shapeColor}`}
              transform={`scale(${shapeSize / size})`}
            />
          </svg>
        )
      default:
        return null
    }
  }

  const svgContent = (
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
  )

  // Generate raw SVG code
  React.useEffect(() => {
    if (getRawSVG) {
      const svgMarkup = ReactDOMServer.renderToStaticMarkup(
        <svg className={`w-full h-full ${backgroundColor}`} xmlns="http://www.w3.org/2000/svg">
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
      );

      getRawSVG(svgMarkup); // Pass the stringified SVG
    }
  }, [backgroundColor, shapeFillColor, shapeColor, size, strokeWidth, rotation, shape, shapeSize, customPath, patternId, getRawSVG]);


  return (
    <div className={`w-full h-full ${backgroundColor}`}>
      {svgContent}
    </div>
  )
}