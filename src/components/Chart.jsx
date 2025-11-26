// src/components/Chart.jsx
import React from 'react'

// Simple bar chart using SVG for analytics without external libs
export default function Chart({ data, height = 160 }) {
  // data: [{ label, value }]
  const max = Math.max(...data.map(d => d.value), 1)
  const barWidth = 40
  const gap = 40
  const width = data.length * (barWidth + gap) + gap

  return (
    <figure role="img" aria-label="Analytics bar chart" className="card" style={{ overflowX: 'auto' }}>
      <svg width={width} height={height} role="presentation" className="chart-svg">
        {data.map((d, i) => {
          const barHeight = Math.round((d.value / max) * (height - 40))
          const x = gap + i * (barWidth + gap)
          const y = height - barHeight - 20
          return (
            <g key={d.label} className='chart-svg'>
              <rect x={x} y={y} width={barWidth} height={barHeight} fill="var(--color-primary)" rx="6" />
              <text x={x + barWidth / 2} y={height - 4} textAnchor="middle" fontSize="12">{d.label}</text>
              <text x={x + barWidth / 2} y={y - 6} textAnchor="middle" fontSize="12">{d.value}</text>
            </g>
          )
        })}
      </svg>
      <figcaption className="visually-hidden">Bar chart showing consignment metrics</figcaption>
    </figure>
  )
}
