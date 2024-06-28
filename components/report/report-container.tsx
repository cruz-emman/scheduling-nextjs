import React from 'react'
import ReportChart from './report-chart'
import ReportWidget from './report-widget'

function ReportContainer() {
  return (
    <div className='flex flex-col gap-y-2'>
        <ReportWidget />
        <ReportChart />
    </div>
  )
}

export default ReportContainer