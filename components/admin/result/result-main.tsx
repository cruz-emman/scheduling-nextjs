import { getTableResult } from '@/data-query/appointment'
import React from 'react'
import { resultColumns } from './result-table-column'
import { DataTable } from '../datatable/admin-data-table'

export default async function ResultTable() {
    const result = await getTableResult()
    
  return (
    <div className='w-full mx-2'>
      <DataTable data={result} columns={resultColumns} />
    </div>
  )
}
