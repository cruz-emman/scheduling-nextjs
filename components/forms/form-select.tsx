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

interface PurposeOption {
    id: string;
    label: string;
}

type SelectFieldGroup = {
    name: string;
    label: string;
    placeholder: string,
    data: PurposeOption[]; // Use the interface from option 1 here
    control: any
}

const SelectFieldInput = ({
    control,
    name,
    label,
    placeholder,
    data
} : SelectFieldGroup) => {
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
                {data.map((item, index) => (
                    <SelectItem key={index} value={item.id}>
                        {item.label}
                    </SelectItem>
                ))}
               
              </SelectContent>
            </Select>

            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default SelectFieldInput;
