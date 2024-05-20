import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";

interface CheckboxOption {
  id: string;
  label: string;
}

interface CheckboxFieldInputProps {
  control: any;
  name: string;
  data: CheckboxOption[];
  openLiveStreaming?: any;
  linkControl?: any;
  linkInputField?: string | "";
  defaultValue?: string[];
}

export const CheckboxFieldInputAdmin = ({
  control,
  name,
  data,
  defaultValue,
}: CheckboxFieldInputProps) => {
  return (
    <>
      <FormField
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={() => (
          <FormItem>
            {data.map((item) => (
              <FormField
                key={item.id}
                control={control}
                name={name}
                render={({ field }) => {
                  return (
                    <FormItem
                      key={item.id}
                      className="flex flex-row items-start space-x-3 space-y-0"
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(item.id)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field.value, item.id])
                              : field.onChange(
                                  field.value?.filter(
                                    (value: any) => value !== item.id
                                  )
                                );
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {item.label}
                      </FormLabel>
                    </FormItem>
                  );
                }}
              />
            ))}
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
