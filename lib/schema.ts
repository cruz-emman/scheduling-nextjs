import { z } from 'zod'




export const formSchemaData = z.object({
    title: z.string().min(2, {
      message: "title must be at least 2 characters.",
    }),
    email: z.string().min(2, {
      message: "email must be at least 2 characters.",
    }).email(),
    fullName: z.string().min(2, {
      message: "The person who requested the event",
    }),
    contactPerson: z.string().min(2, {
      message: "Contact Person / Event Handler"
    }),
    department: z.string().min(2, {
      message: "department  must be at least 2 characters.",
    }),
  
  
    // set 2 
    dateOfEvent: z.string(), // Assuming dateOfEvent is a string in the desired format
    startingTime: z.string().min(2, {
      message: "staring time must be set.",
    }),
    endingTime: z.string().min(2, {
      message: "ending time must be set.",
    }),
  
    purpose: z.string().min(2,{
      message: "Please choose a purpose of the meeting.",
    }),
  
    // Set 3
    doesHaveDryRun: z.boolean({
      required_error: "Please select if yes or no"
    }),
  
    dryRunDate: z.string().optional(),
    dryRunStart: z.string().optional(),
    dryRunEnd: z.string().optional(),

    doesHaveTCETAssitance: z.array(z.string()).refine((value) => value.some((item) => item), {
      message: 'Please select at lease on the option'
    }),
    tcetOtherAssitance: z.string().optional(),

    //set 4
    meetingTypeOption: z.enum(['meeting','webinar','hybrid','documentation', 'training']),
    meetingTypeServices: z.array(z.string()).refine((value) => value.some((item) => item), {
      message: 'Please select at lease on the option'
    }),
    meetingTypeServiceLink: z.string().optional(),
    cameraSetup: z.string().optional(),
    
  
  }).superRefine(({ doesHaveDryRun, dryRunDate, dryRunStart, dryRunEnd, doesHaveTCETAssitance, tcetOtherAssitance, meetingTypeServices, meetingTypeServiceLink, meetingTypeOption, cameraSetup}, ctx) => {
    if (doesHaveDryRun === true) {
      if (!dryRunDate) {
        ctx.addIssue({
          code: 'custom',
          message: 'Please provide information in the missing field.',
          path: ['dryRunDate']
        })
      }
      if (!dryRunStart) {
        ctx.addIssue({
          code: 'custom',
          message: 'Please provide information in the missing field.',
          path: ['dryRunStart']
        })
      }
      if (!dryRunEnd) {
        ctx.addIssue({
          code: 'custom',
          message: 'Please provide information in the missing field.',
          path: ['dryRunEnd']
        })
      }
    }

    if(meetingTypeOption === 'hybrid'){
     if(!cameraSetup){
      ctx.addIssue({
        code: 'custom',
        message: "Please provide information in the missing field",
        path: ['cameraSetup']
      })
     }
    }

    if(doesHaveTCETAssitance.includes('others')){
      if(!tcetOtherAssitance){
        ctx.addIssue({
          code: 'custom',
          message: 'Please provide information in the missing field.',
          path: ['tcetOtherAssitance']
        })
      }
    }
    
    if((meetingTypeServices.includes('meeting_livestream') || meetingTypeServices.includes('hybrid_livestreaming') || meetingTypeServices.includes('webinar_livestreaming'))){
      if(!meetingTypeServiceLink){
        ctx.addIssue({
          code: 'custom',
          message: 'Please provide information in the missing field.',
          path: ['meetingTypeServiceLink']
        })
      }
    }

});
  


export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required"
}),

  password: z.string().min(2,{
    message: "Password is required!"
  })
})


export const RegisterSchema = z.object({
  email: z.string().email({
      message: "Email is required"
  }),
  password: z.string().min(6, {
      message: "Minimum of 6 characters required."
  }), 
  name: z.string().min(1, {
      message: "Name is Required"
  })
})

export const titleSchema  = z.object({
  title: z.string(),
  category: z.string().optional()
})

export type Title = z.infer<typeof titleSchema>


export type Events = z.infer<typeof formSchemaData>