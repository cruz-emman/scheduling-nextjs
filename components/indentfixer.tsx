"use client";

import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { format, formatDate, parse } from "date-fns";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
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
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { formSchemaData } from "@/lib/schema";
import { timeAM, timePM } from "@/sampleData";
import { Checkbox } from "./ui/checkbox";
import { Separator } from "./ui/separator";
import TableDataSample from "./table-data";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import FormInputField from "./forms/form-input";

const steps = [
  {
    id: "Step 1",
    name: "General Information",
    fields: ["title", "email", "fullName", "department"],
  },
  {
    id: "Step 2",
    name: "Purpose, Date and Time",
    fields: ["dateOfEvent", "staringTime", "endingTime", "purpose"],
  },
  {
    id: "Step 3",
    name: "Additional Information",
    fields: ["doesHaveDryRun"],
  },
  {
    id: "Step 4",
    name: "Type of Service",
  },
  {
    id: "Step 5",
    name: "Finalization",
  },
];

const doesHaveTCETAssitanceOptions = [
  {
    id: "tcet",
    label: "TCET",
  },
  {
    id: "others",
    label: "Others",
  },
];

export function CalendarPicker() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [dialogBox, setDialogBox] = useState(false);

  const [currentFormPage, setCurrentFormPage] = useState(0);
  const [previousStep, setPreviousStep] = useState(0);

  type Inputs = z.infer<typeof formSchemaData>;
  const form = useForm<Inputs>({
    resolver: zodResolver(formSchemaData),
    defaultValues: {
      title: "",
      email: "",
      fullName: "",
      department: "",
      dateOfEvent: "",
      purpose: "",
      startingTime: "",
      endingTime: "",
      doesHaveDryRun: "no",
      dryRunDate: "",
      dryRunStart: "",
      dryRunEnd: "",
      // doesHaveTCETAssitance: ["tcet"],
      // tcetOtherAssitance: "",
      // meetingType: "meeting",
    },
  });

  const processForm: SubmitHandler<Inputs> = (data) => {
  
  };




  const openDialogBox = (currentDate: Date | undefined) => {
    if (currentDate) {
      setDate(currentDate);
      const dateString = currentDate ? currentDate.toLocaleDateString() : ""; // Convert Date to string
      form.setValue("dateOfEvent", dateString); // Set the value of dateOfEvent field in the form
      setDialogBox(true);
    } else {
      setDate(currentDate);

      setDialogBox(false);
    }
  };

  type FieldName = keyof Inputs;

  const goToNextPage = async () => {
    const fields = steps[currentFormPage].fields;
    const output = await form.trigger(fields as FieldName[], {
      shouldFocus: true,
    });

    if (!output) return;

    if (currentFormPage !== 3) {
      const watch = form.watch([
        "title",
        "email",
        "fullName",
        "department",
        "dateOfEvent",
        "startingTime",
        "startingTime",
        "endingTime",
        "purpose",
        "doesHaveDryRun",
        "dryRunDate",
        "dryRunStart",
        "dryRunEnd",
      ]);


      setPreviousStep(currentFormPage);
      setCurrentFormPage((step) => step + 1);
    }
  };

  const goToPreviewsPage = () => {
    if (currentFormPage > 0) {
      setPreviousStep(currentFormPage);
      setCurrentFormPage((step) => step - 1);
    }
  };

  let hasDryRun = form.watch("doesHaveDryRun");

  const handleClick = () => {
    form.resetField("dryRunDate");
    form.resetField("dryRunStart");
    form.resetField("dryRunEnd");
  };

  return (
    <div className="flex flex-col h-full gap-y-2">
      {dialogBox && (
        <Dialog>
          <DialogTrigger asChild>
            <Button color="primary-foreground">Add Schedule</Button>
          </DialogTrigger>
          <DialogContent
            className={cn("sm:max-w-[700px] sm:max-h-[900px]", {
              "sm:max-w-[1000px]  sm:max-h-[900px]": currentFormPage === 3,
            })}
          >
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(processForm)}
                className="space-y-8"
              >
                {currentFormPage === 0 && (
                  <>
                    <DialogHeader>
                      <DialogTitle>General Information</DialogTitle>
                      <DialogDescription>
                        provides assistance in gathering general information,
                        including the name, email, department, and purpose of
                        the meeting
                      </DialogDescription>
                    </DialogHeader>

                    <FormInputField
                      control={form.control}
                      name="title"
                      placeholder="ex. Lorem Ipsum..."
                      type="text"
                      label="Title of Event"
                    />

                    <FormInputField
                      control={form.control}
                      name="email"
                      label="Email"
                      type="email"
                      placeholder="ex. johndoe@tua.edu.ph..."
                    />

                    <FormInputField
                      control={form.control}
                      name="fullName"
                      label="Full Name"
                      type="text"
                      placeholder="ex. Jhon Doe..."
                    />

                    <FormInputField
                      control={form.control}
                      name="department"
                      label="Department"
                      type="text"
                      placeholder="ex. tcet,..."
                    />
                  </>
                )}

                {currentFormPage === 1 && (
                  <>
                    <DialogHeader>
                      <DialogTitle>Purpose, Date and Time</DialogTitle>
                    </DialogHeader>
                    <FormInputField
                      control={form.control}
                      name="dateOfEvent"
                      label="Date of Event (DD/MM/YYY)"
                      type="text"
                      disabled={true}
                    />

                    <FormField
                      control={form.control}
                      name="startingTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Starting Time</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="start of event " />
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

                    <FormField
                      control={form.control}
                      name="endingTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ending Time</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="end of event" />
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

                    <FormField
                      control={form.control}
                      name="purpose"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Purpose</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a purpose" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="class">
                                Online Class
                              </SelectItem>
                              <SelectItem value="academicCulminatingClass">
                                Online Academic Culminating Classes
                              </SelectItem>
                              <SelectItem value="meeting">
                                Online Meeting
                              </SelectItem>
                              <SelectItem value="studentDevelopment">
                                Online Student Development
                              </SelectItem>
                              <SelectItem value="facultyDevelopment">
                                Online Faculty Development
                              </SelectItem>
                            </SelectContent>
                          </Select>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                {currentFormPage === 2 && (
                  <>
                    <DialogHeader>
                      <DialogTitle>Purpose, Date and Time</DialogTitle>
                    </DialogHeader>

                    <FormField
                      control={form.control}
                      name="doesHaveDryRun"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>
                            (Optional) Preffered Meeting Date / Dry Run
                          </FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-1"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem
                                    onClick={handleClick}
                                    value="no"
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  None / No
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="yes" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Yes
                                </FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>

                          {hasDryRun === "yes" && (
                            <FormItem>
                              <div className="flex flex-col gap-2 pt-2">
                                <Label>(Dry Run) Time of Event</Label>
                                <div className="flex flex-col gap-2">
                                  <FormField
                                    control={form.control}
                                    name="dryRunDate"
                                    render={({ field }) => (
                                      <FormItem className="flex flex-col">
                                        <FormLabel>Date of birth</FormLabel>
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
                                            {/* Customized Calendar */}
                                            <Calendar
                                              mode="single"
                                              selected={
                                                field.value
                                                  ? parse(
                                                      field.value,
                                                      "MM/dd/yyyy",
                                                      new Date()
                                                    )
                                                  : undefined
                                              }
                                              onSelect={field.onChange}
                                              initialFocus
                                            />
                                          </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  <FormField
                                    control={form.control}
                                    name="dryRunStart"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>
                                          Dry Run Starting Time
                                        </FormLabel>
                                        <Select
                                          onValueChange={field.onChange}
                                          defaultValue={field.value}
                                        >
                                          <FormControl>
                                            <SelectTrigger>
                                              <SelectValue placeholder="end of event" />
                                            </SelectTrigger>
                                          </FormControl>
                                          <SelectContent>
                                            <SelectGroup>
                                              <SelectLabel>Morning</SelectLabel>
                                              {timeAM.map((item, index) => (
                                                <SelectItem
                                                  key={index}
                                                  value={item.time}
                                                >
                                                  {item.time}
                                                </SelectItem>
                                              ))}
                                            </SelectGroup>

                                            <SelectGroup>
                                              <SelectLabel>
                                                Afternoon
                                              </SelectLabel>
                                              {timePM.map((item, index) => (
                                                <SelectItem
                                                  key={index}
                                                  value={item.time}
                                                >
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
                                  <FormField
                                    control={form.control}
                                    name="dryRunEnd"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Dry Run End Time</FormLabel>
                                        <Select
                                          onValueChange={field.onChange}
                                          defaultValue={field.value}
                                        >
                                          <FormControl>
                                            <SelectTrigger>
                                              <SelectValue placeholder="end of event" />
                                            </SelectTrigger>
                                          </FormControl>
                                          <SelectContent>
                                            <SelectGroup>
                                              <SelectLabel>Morning</SelectLabel>
                                              {timeAM.map((item, index) => (
                                                <SelectItem
                                                  key={index}
                                                  value={item.time}
                                                >
                                                  {item.time}
                                                </SelectItem>
                                              ))}
                                            </SelectGroup>

                                            <SelectGroup>
                                              <SelectLabel>
                                                Afternoon
                                              </SelectLabel>
                                              {timePM.map((item, index) => (
                                                <SelectItem
                                                  key={index}
                                                  value={item.time}
                                                >
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
                                </div>
                              </div>
                            </FormItem>
                          )}

                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* <FormField
                      control={form.control}
                      name="doesHaveTCETAssitance"
                      render={() => (
                        <FormItem>
                          <div className="mb-4">
                            <FormLabel className="text-base">
                              TCET Assitance
                            </FormLabel>
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
                    /> */}
                    {/* {hasOtherAssistance.includes("others") && (
                      <FormField
                        control={form.control}
                        name="tcetOtherAssitance"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Other Assistance</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="please type the other assitance"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )} */}
                  </>
                )}

                {currentFormPage === 3 && (
                  <>
                    <DialogHeader>
                      <DialogTitle>Zoom Features</DialogTitle>
                      <DialogDescription>
                        Please check all things that is necessary
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex gap-x-2 ">
                      <div className="flex flex-1">
                        <TableDataSample />
                      </div>
                      <Separator
                        className="mr-4 bg-violet-400"
                        orientation="vertical"
                      />
                      <div className="flex flex-col gap-y-2 flex-1 ">
                        <FormField
                          control={form.control}
                          name="meetingType"
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormLabel>Type of Service</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a meeting type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="meeting">
                                    Zoom Meeting
                                  </SelectItem>
                                  <SelectItem value="webinar">
                                    Zoom Webinar
                                  </SelectItem>
                                  <SelectItem value="hybrid">Hybrid</SelectItem>
                                  <SelectItem value="photo-video">
                                    Photo-Video
                                  </SelectItem>
                                </SelectContent>
                              </Select>

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </>
                )}

                {currentFormPage === 4 && (
                  <>
                    <DialogHeader>
                      <DialogTitle>Finalize</DialogTitle>
                    </DialogHeader>
                  </>
                )}

                <DialogFooter>
                  <Button
                    type="button"
                    variant="default"
                    onClick={goToPreviewsPage}
                  >
                    Back
                  </Button>
                  <Button type={"button"} onClick={goToNextPage}>
                    {currentFormPage === steps.length - 1 ? "Submit" : "Next"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      )}

      <Calendar
        mode="single"
        selected={date}
        onSelect={openDialogBox} // Pass selected date to a function
        disabled={(date) => new Date(date) <= new Date()} // Disable past dates and today's date
        className="shadow border rounded-md h-full w-full flex"
        classNames={{
          months:
            "flex w-full flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 flex-1",
          month: "space-y-4 w-full flex flex-col",
          table: "w-full h-full border-collapse space-y-1",
          head_row: "",
          row: "w-full mt-2",
        }}
      />
    </div>
  );
}
