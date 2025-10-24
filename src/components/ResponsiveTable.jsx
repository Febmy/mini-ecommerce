import React from 'react'

/**
 * Wrap your <table> with this for mobile friendliness.
 * Also consider switching to cards on very small devices.
 */
export default function ResponsiveTable({ children, className = '' }) {
  return (
    <div className={`w-full overflow-x-auto ${className}`.trim()}>
      {children}
    </div>
  )
}
