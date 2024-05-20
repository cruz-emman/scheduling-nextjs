import {format} from 'date-fns'

export const sampleEvent = [
    {
        id:1,
        title:'CHS Event',
        unit: 'Health Student Group',
        type_of_event: 'dry_run',
        date: format(new Date('2020/03/17'), "MM/dd/yyyy"),
        type_of_service: ['Zoom','Hybrid']
        
    },
    {
        id:2,
        title:'CHS Event',
        unit: 'Health Student Group',
        type_of_event: 'dry_run',
        date: format(new Date('2020/03/17'), "MM/dd/yyyy"),
        type_of_service: ['Zoom','Hybrid']
        
    },
    {
        id:3,
        title:'CHS Event',
        unit: 'Health Student Group',
        type_of_event: 'dry_run',
        date: format(new Date('2020/03/17'), "MM/dd/yyyy"),
        type_of_service: ['Zoom','Hybrid']
        
    },
    {
        id:4,
        title:'CHS Event',
        unit: 'Health Student Group',
        type_of_event: 'dry_run',
        date: format(new Date('2020/03/17'), "MM/dd/yyyy"),
        type_of_service: ['Zoom','Hybrid']
        
    },
    {
        id:5,
        title:'CHS Event',
        unit: 'Health Student Group',
        type_of_event: 'dry_run',
        date: format(new Date('2020/03/17'), "MM/dd/yyyy"),
        type_of_service: ['Zoom','Hybrid']
        
    },
    {
        id:6,
        title:'CHS Event',
        unit: 'Health Student Group',
        type_of_event: 'dry_run',
        date: format(new Date('2020/03/17'), "MM/dd/yyyy"),
        type_of_service: ['Zoom','Hybrid']
        
    },
]

export const timeAM = [
    {
      id: 1,
      time: '6:00 AM'
    },
    {
      id: 2,
      time: '6:30 AM'
    },
    {
      id: 3,
      time: '7:00 AM'
    },
    {
      id: 4,
      time: '7:30 AM'
    },
    {
      id: 5,
      time: '8:00 AM'
    },
    {
      id: 6,
      time: '8:30 AM'
    },
    {
      id: 7,
      time: '9:00 AM'
    },
    {
      id: 8,
      time: '9:30 AM'
    },
    {
      id: 9,
      time: '10:00 AM'
    },
    {
      id: 10,
      time: '10:30 AM'
    },
    {
      id: 11,
      time: '11:00 AM'
    },
    {
      id: 12,
      time: '11:30 AM'
    },
    {
      id: 13,
      time: '12:00 PM'
    },
    {
      id: 14,
      time: '12:30 PM'
    },
  ];
  
  export const timePM = [
    {
      id: 15,
      time: '1:00 PM'
    },
    {
      id: 16,
      time: '1:30 PM'
    },
    {
      id: 17,
      time: '2:00 PM'
    },
    {
      id: 18,
      time: '2:30 PM'
    },
    {
      id: 19,
      time: '3:00 PM'
    },
    {
      id: 20,
      time: '3:30 PM'
    },
    {
      id: 21,
      time: '4:00 PM'
    },
    {
      id: 22,
      time: '4:30 PM'
    },
    {
      id: 23,
      time: '5:00 PM'
    },
    {
      id: 24,
      time: '5:30 PM'
    },
    {
      id: 25,
      time: '6:00 PM'
    },
    {
      id: 26,
      time: '6:30 PM'
    },
    {
      id: 27,
      time: '7:00 PM'
    },
    {
      id: 28,
      time: '7:30 PM'
    },
    {
      id: 29,
      time: '8:00 PM'
    },
    {
      id: 30,
      time: '8:30 PM'
    },
    {
      id: 31,
      time: '9:00 PM'
    },
    {
      id: 32,
      time: '9:30 PM'
    },
    {
      id: 33,
      time: '10:00 PM'
    },
    {
      id: 34,
      time: '10:30 PM'
    },
    {
      id: 35,
      time: '11:00 PM'
    },
    {
      id: 36,
      time: '11:30 PM'
    },
    {
      id: 37,
      time: '12:00 AM'
    },
  ];
  

  export const zoomMeetingChoice = [
    { 
      id: 'meeting_attendees',
      label: 'Attendees can open their camera',
    },
    { 
      id: 'meeting_waiting',
      label: 'Waiting Room',
    },
    {
      id: 'meeting_breakout',
      label: "Breakout Room"
    },
    { 
      id: 'meeting_recording',
      label: 'Recording'
    },
    { 
      id: 'meeting_poll',
      label: 'Poll'
    },
    { 
      id: 'meeting_livestream',
      label: 'Livestreaming'
    }
  ]
  
  export const zoomWebinarChoice = [
    { 
      id: 'webinar_practice',
      label: 'Practice Sessions',
    },
    { 
      id: 'webinar_reminder',
      label: 'Reminder Email',
    },
    { 
      id: 'webinar_poll',
      label: "Poll"
    },
    {
      id: 'webinar_QandA',
      label: 'Q&A Box'
    },
    { 
      id: 'webinar_panelist',
      label: 'Panelist'
    },
    { 
      id: 'webinar_livestreaming',
      label: 'Livestreaming'
    }
  ]
  
  export const hybridChoice = [

    {
    
      id: 'hybrid_photo',
      label: 'Photo'
    },
    {
     
      id: 'hybrid_video',
      label: 'Video / Shoot'
    },
    {
      id: 'hybrid_recording',
      label: 'Recording'
    },
    {
      
      id: 'hybrid_livestreaming',
      label: 'Livestreaming'
    },
  ]
  
  export const photoVideoChoice = [
    {
    
      id: 'documentation_Photo',
      label: 'Photo'
    },
    {
     
      id: 'documentation_Video',
      label: 'Video / Shoot'
    }
  ]

  export const trainingChoice = [
    {
    
      id: 'training_Zoom',
      label: 'Zoom Training'
    },
    {
     
      id: 'training_TLC',
      label: 'TLC Training'
    }
  ]




  export const purposeChoice = [
    {
      id: 'class',
      label: 'Online Class'
    },
    {
      id: 'academicCulminatingClass',
      label: 'Online Academic Culminating Classes'
    },
    {
      id: 'meeting',
      label: 'Online Meeting'
    },
    {
      id: 'studentDevelopment',
      label: 'Online Student Development'
    },
    {
      id: 'facultyDevelopment',
      label: 'Online Faculty Development'
    },

  ]


  type Payment = {
    id: string
    amount: number
    status: "pending" | "processing" | "success" | "failed"
    email: string
  }
   
  export const payments: Payment[] = [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "489e1d42",
      amount: 125,
      status: "processing",
      email: "example@gmail.com",
    },
    // ...
  ]


  import {
    ArrowDownIcon,
    ArrowRightIcon,
    ArrowUpIcon,
    CheckCircledIcon,
    CircleIcon,
    CrossCircledIcon,
    QuestionMarkCircledIcon,
    StopwatchIcon,
  } from "@radix-ui/react-icons"
  
  export const labels = [
    {
      value: "bug",
      label: "Bug",
    },
    {
      value: "feature",
      label: "Feature",
    },
    {
      value: "documentation",
      label: "Documentation",
    },
  ]
  
  export const statuses = [
    {
      value: "PENDING",
      label: "Pending",
      icon: QuestionMarkCircledIcon,
    },
    {
      value: "APPROVED",
      label: "Approved",
      icon: CheckCircledIcon,
    },
   
  ]
  
  export const priorities = [
    {
      label: "Low",
      value: "low",
      icon: ArrowDownIcon,
    },
    {
      label: "Medium",
      value: "medium",
      icon: ArrowRightIcon,
    },
    {
      label: "High",
      value: "high",
      icon: ArrowUpIcon,
    },
  ]

  export const doesHaveTCETAssitanceOptions = [
    {
      id: "tcet",
      label: "TCET",
    },
    {
      id: "others",
      label: "Others",
    },
  ];