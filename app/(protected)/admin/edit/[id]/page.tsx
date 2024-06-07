"use client";

import { updateForm } from "@/actions/submit-form";
import SelectFieldInput from "@/components/forms/form-select";
import SeletGroupFieldInput from "@/components/forms/form-select-group";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getDataById } from "@/data-query/appointment";
import { Events, formSchemaData } from "@/lib/schema";
import { cn } from "@/lib/utils";
import {
  doesHaveTCETAssitanceOptions,
  hybridChoice,
  photoVideoChoice,
  purposeChoice,
  trainingChoice,
  zoomMeetingChoice,
  zoomWebinarChoice,
} from "@/sampleData";
import { zodResolver } from "@hookform/resolvers/zod";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { format, parse } from "date-fns";
import { CalendarIcon, TriangleAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface EditPostPage {
  params: {
    id: string;
  };
}

const EditPage = ({ params }: EditPostPage) => {
  const { id } = params;
  const router = useRouter();

  const { data: dataEvent, isLoading: isLoadingEvent } = useQuery({
    queryKey: ["edit", id],
    queryFn: async () => {
      const res = await getDataById(id);
      router.refresh();

      return res;
    },
  });

  const { mutate: updateEvent } = useMutation({
    mutationFn: async ({ values, id }: { values: Events; id: string }) =>
      await updateForm({ values, id }),
    onError: (error) => {
      console.error("Update failed:", error);
    },
    onSuccess: () => {
      router.push("/admin");
      router.refresh();
    },
  });

  const form = useForm<Events>({
    resolver: zodResolver(formSchemaData),
  });

  const onEdit: SubmitHandler<Events> = (values) => {
    // Modify the values
    let dateOfEventChange = values.dateOfEvent;
    let dryRunDateChange = values.dryRunDate;

    let dateOfEventChangeFormat = dateOfEventChange
      ? new Date(dateOfEventChange).toLocaleDateString()
      : "";
    let dryRunDateChangeFormat = dryRunDateChange
      ? new Date(dryRunDateChange).toLocaleDateString()
      : "";

    // Set the modified values
    form.setValue("dateOfEvent", dateOfEventChangeFormat);
    form.setValue("dryRunDate", dryRunDateChangeFormat);

    // Get the updated values
    const updatedValues = form.getValues();

    // Perform the update or submission with updated values
    updateEvent({ values: updatedValues, id });
  };

  const onError = (error: any) => {
    console.log(error);
  };

  const handleClick = () => {
    form.resetField("dryRunDate");
    form.setValue("dryRunStart", undefined);
    form.setValue("dryRunEnd", undefined);

    // form.resetField("dryRunStart");
    // form.resetField("dryRunEnd");
  };

  const formatDate = (data: any) => {
    const inputFormat = "M/d/yyyy";
    const outputFormat = "yyyy-MM-dd";

    let formattedDate = "";
    if (data) {
      const parsedDate = parse(data, inputFormat, new Date());
      formattedDate = format(parsedDate, outputFormat);

      return formattedDate;
    }
  };

  let FormattedDate = formatDate(dataEvent?.dateOfEvent);
  let dryRunFormattedDate = formatDate(dataEvent?.dryRunDate) || "";

  const tcetAssitanceArray = dataEvent?.doesHaveTCETAssitance.split(",");
  const meetingTypeServicesArray = dataEvent?.meetingTypeServices.split(",");

  let watchEvent = form.watch("meetingTypeOption");
  let watchDryRunEvent = form.watch("doesHaveDryRun");

  const intialValue = dataEvent?.meetingTypeOption;
  const initalServices = dataEvent?.meetingTypeServices.split(",");

  const meetingTypeOnchange = (data: any) => {
    if (intialValue === data) {
      const meetingTypeServicesValue = initalServices ? [initalServices] : [];
      form.setValue("meetingTypeServices", meetingTypeServicesValue[0]);
    } else {
      form.setValue("meetingTypeServices", []);
    }
    form.setValue("meetingTypeOption", data);
  };

  const [optionalDate, setOptionalDate] = useState<Date | undefined>(
    new Date()
  );

  const convertDateToString = (currentDate: Date | undefined) => {
    if (currentDate) {
      setOptionalDate(currentDate);
      const dryRunDate = currentDate ? currentDate.toLocaleDateString() : ""; // Convert Date to string
      form.setValue("dryRunDate", dryRunDate); // Set the value of dateOfEvent field in the form
    } else {
      setOptionalDate(currentDate);
    }
  };

  if (isLoadingEvent) {
    return (
      <div className="text-center">
        <span>loading..</span>
      </div>
    );
  }
  return (
    <Form {...form}>
      <form
        className="w-full flex flex-col gap-y-6 mx-16"
        onSubmit={form.handleSubmit(onEdit, onError)}
      >
        <div className="flex flex-col gap-y-2 w-full">
          <FormField
            control={form.control}
            name="status"
            defaultValue={
              dataEvent?.status as "approved" | "pending" | "done" | "cancel"
            }
            render={({ field }) => (
              <FormItem>
                <div
                  className={cn(
                    "w-full gap-x-2 rounded-md shadow-md flex items-center justify-start p-3",
                    {
                      "bg-green-200 text-green-800":
                        dataEvent?.status === "approved",
                      "bg-red-200 text-red-800": dataEvent?.status === "cancel",
                      "bg-yellow-200 text-yellow-800":
                        dataEvent?.status === "pending",
                      "bg-violet-200 text-violet-800":
                        dataEvent?.status === "done",
                    }
                  )}
                >
                  <p>{dataEvent?.status}</p>
                </div>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="done">Done</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="cancel">Cancel</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <p className="text-xl font-semibold">General Information</p>
          <FormField
            control={form.control}
            name="title"
            defaultValue={dataEvent?.title}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Event Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="w-full flex flex-col ">
            <div className="flex flex-row gap-x-2">
              <div className="flex flex-1 ">
                <FormField
                  control={form.control}
                  name="fullName"
                  defaultValue={dataEvent?.fullName}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Full Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-1 ">
                <FormField
                  control={form.control}
                  name="contactPerson"
                  defaultValue={dataEvent?.contactPerson}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Contact Person</FormLabel>
                      <FormControl>
                        <Input placeholder="Contact Person" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex flex-row gap-x-2">
              <div className="flex flex-1 ">
                <FormField
                  control={form.control}
                  name="email"
                  defaultValue={dataEvent?.email}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-1 ">
                <FormField
                  control={form.control}
                  name="department"
                  defaultValue={dataEvent?.department}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Department</FormLabel>
                      <FormControl>
                        <Input placeholder="Department" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-y-2 w-full">
          <p className="text-xl font-semibold">Purpose, Date , and Time</p>

          <div className="flex flex-row gap-x-2">
            <FormField
              control={form.control}
              name="dateOfEvent"
              defaultValue={FormattedDate}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Event</FormLabel>
                  <FormControl>
                    <Input type="date" placeholder="Date of Event" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SeletGroupFieldInput
              name="startingTime"
              placeholder="start of event.."
              control={form.control}
              label="Start"
              defaultValue={dataEvent?.startingTime}
              className={`w-40`}
            />

            <SeletGroupFieldInput
              name="endingTime"
              placeholder="end of event.."
              control={form.control}
              label="End"
              defaultValue={dataEvent?.endingTime}
              className={`w-40`}
            />

            <SelectFieldInput
              control={form.control}
              name="purpose"
              label="Purpose"
              placeholder="select a purpose"
              data={purposeChoice}
              defaultValue={dataEvent?.purpose}
              className={`w-full`}
            />
          </div>
        </div>

        <div className="flex flex-col gap-y-2 w-full">
          <p className="text-xl font-semibold">Additional Information</p>

          <div className="flex flex-row gap-x-2">
            <FormField
              control={form.control}
              name="doesHaveDryRun"
              defaultValue={dataEvent?.doesHaveDryRun}
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>
                    (Optional) Preferred Meeting Date / Dry Run
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) =>
                        field.onChange(value === "true")
                      }
                      defaultValue={String(field.value)}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem onClick={handleClick} value="false" />
                        </FormControl>
                        <FormLabel className="font-normal">None / No</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="true" />
                        </FormControl>
                        <FormLabel className="font-normal">Yes</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>

                  {field.value === true && (
                    <FormItem>
                      <div className="flex flex-col gap-2 pt-2">
                        <Label>(Dry Run) Time of Event</Label>
                        <div className="flex flex-col gap-2">
                          <FormField
                            control={form.control}
                            defaultValue={dryRunFormattedDate || ""}
                            name="dryRunDate"
                            render={({ field }) => (
                              <FormItem className="flex flex-col">
                                <FormLabel>Date</FormLabel>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <FormControl>
                                      <Button
                                        variant={"outline"}
                                        className={cn(
                                          "w-[240px] pl-3 text-left font-normal",
                                          !field.value &&
                                            "text-muted-foreground"
                                        )}
                                      >
                                        {field.value ? (
                                          format(field.value, "PPP")
                                        ) : (
                                          <span>Pick a date</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent
                                    className="w-auto p-0"
                                    align="start"
                                  >
                                    <Calendar
                                      mode="single"
                                      disabled={(date) =>
                                        new Date(date) <= new Date()
                                      } // Disable past dates and today's date
                                      selected={optionalDate}
                                      onSelect={convertDateToString}
                                      initialFocus
                                    />
                                  </PopoverContent>
                                </Popover>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <SeletGroupFieldInput
                            name="dryRunStart"
                            placeholder="Dry Run Start."
                            control={form.control}
                            disabled={!watchDryRunEvent}
                            label="Start"
                            defaultValue={dataEvent?.dryRunStart || ""}
                            className={`w-40`}
                          />

                          <SeletGroupFieldInput
                            name="dryRunEnd"
                            placeholder="Dry Run End"
                            control={form.control}
                            disabled={!watchDryRunEvent}
                            label="End"
                            defaultValue={dataEvent?.dryRunEnd || ""}
                            className={`w-40`}
                          />
                        </div>
                      </div>
                    </FormItem>
                  )}

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="doesHaveTCETAssitance"
          defaultValue={tcetAssitanceArray}
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Tech Assitance</FormLabel>
              </div>
              {doesHaveTCETAssitanceOptions.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="doesHaveTCETAssitance"
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

        <FormField
          control={form.control}
          name="tcetOtherAssitance"
          defaultValue={dataEvent?.department}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Assistance</FormLabel>
              <FormControl>
                <Input placeholder="Assistance" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-y-2 w-full">
          <p className="text-xl font-semibold">Zoom Features</p>

          <FormField
            control={form.control}
            name="meetingTypeOption"
            defaultValue={
              dataEvent?.meetingTypeOption as
                | "meeting"
                | "webinar"
                | "hybrid"
                | "documentation"
                | "training"
                | undefined
            }
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Type of Service</FormLabel>
                <Select
                  onValueChange={(value) => meetingTypeOnchange(value)}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a meeting type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="meeting">Zoom Meeting</SelectItem>
                    <SelectItem value="webinar">Zoom Webinar</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                    <SelectItem value="documentation">Documentation</SelectItem>
                    <SelectItem value="training">Training</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          {watchEvent === "meeting" && (
            <>
              <FormField
                control={form.control}
                name="meetingTypeServices"
                defaultValue={meetingTypeServicesArray}
                render={() => (
                  <FormItem>
                    {zoomMeetingChoice.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="meetingTypeServices"
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
                                      ? field.onChange([
                                          ...field.value,
                                          item.id,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item.id
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
          )}

          {watchEvent === "webinar" && (
            <>
              <FormField
                control={form.control}
                name="meetingTypeServices"
                defaultValue={meetingTypeServicesArray}
                render={() => (
                  <FormItem>
                    {zoomWebinarChoice.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="meetingTypeServices"
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
                                      ? field.onChange([
                                          ...field.value,
                                          item.id,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item.id
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
          )}

          {watchEvent === "hybrid" && (
            <>
              <FormField
                control={form.control}
                name="meetingTypeServices"
                defaultValue={meetingTypeServicesArray}
                render={() => (
                  <FormItem>
                    {hybridChoice.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="meetingTypeServices"
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
                                      ? field.onChange([
                                          ...field.value,
                                          item.id,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item.id
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

              <FormField
                control={form.control}
                name="cameraSetup"
                defaultValue={dataEvent?.cameraSetup || ""}
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Camera Setup</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="oneCamera" />
                          </FormControl>
                          <FormLabel>1 Camera set-up</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="twoCamera" />
                          </FormControl>
                          <FormLabel>2 Camera set-up</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {watchEvent === "documentation" && (
            <>
              <FormField
                control={form.control}
                name="meetingTypeServices"
                defaultValue={meetingTypeServicesArray}
                render={() => (
                  <FormItem>
                    {photoVideoChoice.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="meetingTypeServices"
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
                                      ? field.onChange([
                                          ...field.value,
                                          item.id,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item.id
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
          )}

          {watchEvent === "training" && (
            <>
              <FormField
                control={form.control}
                name="meetingTypeServices"
                defaultValue={meetingTypeServicesArray}
                render={() => (
                  <FormItem>
                    {trainingChoice.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="meetingTypeServices"
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
                                      ? field.onChange([
                                          ...field.value,
                                          item.id,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item.id
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
          )}

          <FormField
            control={form.control}
            name="meetingTypeServiceLink"
            defaultValue={dataEvent?.meetingTypeServiceLink || ""}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Link</FormLabel>
                <FormControl>
                  <Input placeholder="Link" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default EditPage;
