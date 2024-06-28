'use client'

import { CalendarPicker } from '@/components/calendar-picker'
import { CardEvent } from '@/components/card-event'
import { ScrollArea } from '@/components/ui/scroll-area'
import { getData, getDataHasDryRun, getDataNotDryRun,  } from '@/data-query/appointment'
import React, { useEffect, useState } from 'react'
import { DataTable } from '../datatable/admin-data-table'
import { getDataThisMonth } from '@/data-query/widget-results'
import { columnDashboard } from '../datatable/admin-column'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'



export default function AppointmentComponent() {
   
    const [currentData, setcurrentData] = useState<string>("")

    const getCurrentDate = (e: any) => {
      setcurrentData(e)
    }
  
  
    const {data: resultData, isPending, isError, error, refetch  } = useQuery({
      queryKey: ['dryRunData'],
      queryFn: async () => {
        const res = await axios.get(`/api/datathismonth?currentDate=${currentData}`);
        return res.data;
      },
  
  
    })
    useEffect(() => {
      if (currentData) {
        refetch();
      }
    }, [currentData, refetch]);
  
    if (isPending) {
      return <span>Loading...</span>
    }
  
    if (isError) {
      return <span>Error: {error.message}</span>
    }

    return (
        <div className='w-full relative m-2'>
            <div className='flex flex-col gap-y-2'>
                <div className='flex gap-y-2 items-center'>
                    <div className='flex max-h-[400px] h-full flex-2'>
                    <CalendarPicker 
          getCurrentDate={getCurrentDate} 
          currentData={currentData} 
          setCurrentData={setcurrentData}
           />
                    </div>
                    <div className='flex flex-col flex-1 w-full mx-2' >
                        <p className='text-center text-lg font-bold'>Today's event</p>
                        
                        <div className='flex w-full justify-center  gap-x-2 items-start'>
                            <div className='w-full flex flex-col'>
                                <p className='text-lg font-semibold text-gray-400'>Event Today</p>
                                <ScrollArea className="h-80 rounded-md border">
                                    <div className='px-4 gap-y-2'>
                                    <CardEvent data={resultData.withDryRun} />
                                    </div>
                                </ScrollArea>
                            </div>
                            <div className='w-full'>
                                <p className='text-lg font-semibold text-gray-400'>Dry Run Today</p>

                                <ScrollArea className="h-80 rounded-md border">
                                    <div className='px-4 gap-y-2'>
                                    <CardEvent data={resultData.withoutDryRun} />
                                    </div>
                                </ScrollArea>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-y-2'>
                    <p>Month's event</p>
                    {/* <DataTable data={dataThisMonth} columns={columnDashboard} /> */}
                </div>
            </div>

        </div>
    )
}
