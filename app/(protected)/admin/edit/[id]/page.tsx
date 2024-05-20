"use client";

import { updateForm } from "@/actions/submit-form";
import { CheckboxFieldInputAdmin } from "@/components/forms/admin-checkbox-input";
import SelectFieldInput from "@/components/forms/form-select";
import SeletGroupFieldInput from "@/components/forms/form-select-group";
import { Button } from "@/components/ui/button";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getDataById } from "@/data-query/appointment";
import { Events, Title, formSchemaData, titleSchema } from "@/lib/schema";
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
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format, parse } from "date-fns";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
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
      router.push("/");
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
    //pdateEvent({ values: updatedValues, id });

    console.log(updatedValues);
  };

  const onError = (error: any) => {
    console.log(error);
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
  let dryRunFormattedDate = formatDate(dataEvent?.dryRunDate);

  const currentMeetingType = dataEvent?.meetingTypeOption;
  const tcetAssitanceArray = dataEvent?.doesHaveTCETAssitance.split(",");
  const meetingTypeServicesArray = dataEvent?.meetingTypeServices.split(",");

  const typeOfMeeting = (meetingType: string | undefined) => {
    if (meetingType === "meeting") {
      return meetingType;
    }
    if (meetingType === "webinar") {
      return meetingType;
    }
    if (meetingType === "hybrid") {
      return meetingType;
    }
    if (meetingType === "documentation") {
      return meetingType;
    }
    if (meetingType === "training") {
      return meetingType;
    }
  };

  let watchEvent = form.watch('meetingTypeOption')
  console.log(watchEvent)


  const meetingTypeOnchange = (data: any) => {
    form.setValue("meetingTypeOption", data);
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
          <FormField
            control={form.control}
            name="doesHaveDryRun"
            defaultValue={dataEvent?.doesHaveDryRun}
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>
                  (Optional) Preffered Meeting Date / Dry Run
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => field.onChange(value === "true")}
                    defaultValue={String(field.value)}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="false" />
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
              </FormItem>
            )}
          />

          <div className="flex flex-row gap-x-2">
            <FormField
              control={form.control}
              name="dryRunDate"
              defaultValue={dryRunFormattedDate}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dry Run Date</FormLabel>
                  <FormControl>
                    <Input type="date" placeholder="Dry Run Date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SeletGroupFieldInput
              name="dryRunStart"
              placeholder="Dry Run Start."
              control={form.control}
              label="Start"
              defaultValue={dataEvent?.dryRunStart}
              className={`w-40`}
            />

            <SeletGroupFieldInput
              name="dryRunEnd"
              placeholder="Dry Run End"
              control={form.control}
              label="End"
              defaultValue={dataEvent?.dryRunEnd}
              className={`w-40`}
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
            defaultValue={dataEvent?.meetingTypeOption}
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
              {/* <CheckboxFieldInputAdmin
                control={form.control}
                name="meetingTypeServices"
                data={zoomMeetingChoice}
                defaultValue={dataEvent?.meetingTypeServices as string[] | undefined}
              /> */}
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

          {watchEvent=== "documentation" && (
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
