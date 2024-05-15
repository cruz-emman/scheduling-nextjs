import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Checkbox } from "../ui/checkbox";
import FormInputField from "./form-input";
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
  linkInputField?:string | ""
}

const CheckboxFieldInput = ({
  control,
  name,
  data,
  openLiveStreaming,
  linkControl,
  linkInputField
}: CheckboxFieldInputProps) => {
  return (
    <>
      <FormField
        control={control}
        name={name}
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

      {(openLiveStreaming[0].includes("meeting_livestream") ||
        openLiveStreaming[0].includes("hybrid_livestreaming") ||
        openLiveStreaming[0].includes("webinar_livestreaming")) && (
        <FormField
          control={linkControl}
          name={"meetingTypeServiceLink"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link</FormLabel>
              <FormControl>
                <Input
                  placeholder="ex. https://www.facebook.com/..."
                  {...field}
                />
              </FormControl>
        
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </>
  );
};

export default CheckboxFieldInput;
