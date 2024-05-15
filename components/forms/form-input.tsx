import React from 'react'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import { Input } from "@/components/ui/input"
import { Control } from 'react-hook-form'



interface FormInputFieldProps {
    name: string
    control: any
    label: string
    type: string
    placeholder?: string
    disabled?: boolean
    defaultValues? : any
} 

const FormInputField = ({
    control,
    name,
    label,
    type,
    placeholder,
    disabled,
    defaultValues
}: FormInputFieldProps) => {
  return (
    <>
    <FormField
          control={control}
          name={name}
          defaultValues={defaultValues || ""}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <Input 
                    placeholder={placeholder} 
                    {...field}
                    type={type}
                    disabled={disabled}
                    
                    />
              </FormControl>
            
              <FormMessage />
            </FormItem>
          )}
        />
    </>
    
  )
}

export default FormInputField