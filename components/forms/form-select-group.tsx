import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Control, FieldValues } from "react-hook-form";
import { timeAM, timePM } from "@/sampleData";

interface SelectGroupFieldProps {
  control: any;
  name: string;
  placeholder: string;
  label: string;
}

const SeletGroupFieldInput = ({
  control,
  name,
  placeholder,
  label,
}: SelectGroupFieldProps) => {
  return (
    <>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Morning</SelectLabel>
                  {timeAM.map((item, index) => (
                    <SelectItem key={index} value={item.time}>
                      {item.time}
                    </SelectItem>
                  ))}
                </SelectGroup>

                <SelectGroup>
                  <SelectLabel>Afternoon</SelectLabel>
                  {timePM.map((item, index) => (
                    <SelectItem key={index} value={item.time}>
                      {item.time}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default SeletGroupFieldInput;
