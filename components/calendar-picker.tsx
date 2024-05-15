"use client";

import { Calendar } from "@/components/ui/calendar";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { format, formatDate, parse } from "date-fns";
import {
  Dialog,
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
import { useForm } from "react-hook-form";
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
import { Events, formSchemaData } from "@/lib/schema";
import {
  hybridChoice,
  photoVideoChoice,
  purposeChoice,
  trainingChoice,
  zoomMeetingChoice,
  zoomWebinarChoice,
} from "@/sampleData";
import { Checkbox } from "./ui/checkbox";
import { Separator } from "./ui/separator";
import TableDataSample from "./table-data";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import FormInputField from "./forms/form-input";
import SeletGroupFieldInput from "./forms/form-select-group";
import SelectFieldInput from "./forms/form-select";
import CheckboxFieldInput from "./forms/form-checkbox-input";
import FinalizeForm from "./forms/form-finalize";
import { submitForm } from "@/actions/submit-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const steps = [
  {
    id: "Step 1",
    name: "General Information",
    fields: ["title", "email", "fullName", "department"],
  },
  {
    id: "Step 2",
    name: "Purpose, Date and Time",
    fields: ["dateOfEvent", "startingTime", "endingTime", "purpose"],
  },
  {
    id: "Step 3",
    name: "Additional Information",
    fields: [
      "doesHaveDryRun",
      "dryRunDate",
      "dryRunStart",
      "dryRunEnd",
      "doesHaveTCETAssitance",
      "tcetOtherAssitance",
    ],
  },
  {
    id: "Step 4",
    name: "Type of Service",
    fields: [
      "meetingTypeOption",
      "meetingTypeServices",
      "meetingTypeServiceLink",
    ],
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
  const [optionalDate, setOptionalDate] = useState<Date | undefined>(
    new Date()
  );
  const [dataFinalize, setDataFinalize] = useState<any>();

  const [meetingType, setMeetingType] = useState("meeting"); // Optional
  const [confirmAgreement, setConfirmAgreement] = useState(false);

const [dialogBox, setDialogBox] = useState(false);

  const [currentFormPage, setCurrentFormPage] = useState(0);
  const [previousStep, setPreviousStep] = useState(0);

  const form = useForm<Events>({
    resolver: zodResolver(formSchemaData),
    defaultValues: {
      title: "",
      email: "",
      fullName: "",
      contactPerson: "",
      department: "",
      dateOfEvent: "",
      purpose: "",
      startingTime: "",
      endingTime: "",
      doesHaveDryRun: "no",
      dryRunDate: "",
      dryRunStart: "",
      dryRunEnd: "",
      doesHaveTCETAssitance: ["tcet"],
      tcetOtherAssitance: "",
      meetingTypeOption: "meeting",
      meetingTypeServices: [],
      meetingTypeServiceLink: "",
      cameraSetup: "",
    },
  });

  const router = useRouter();

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  // const [isPending, startTransition] = useTransition();

  const { mutate: createPost, isPending: isPending } = useMutation({
    mutationFn: async (values: Events) => await submitForm(values),
    onError: (error) => {
      console.error(error);
    },
    onSuccess: () => {
      router.push("/");
      router.refresh();
    },
  });

  const processForm = (values: z.infer<typeof formSchemaData>) => {
    console.log(values)
    createPost(values);

    form.reset();
    setCurrentFormPage(0);
    setDialogBox(false);
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

  type FieldName = keyof Events;

  const goToNextPage = async () => {
    const fields = steps[currentFormPage].fields;
    const output = await form.trigger(fields as FieldName[], {
      shouldFocus: true,
    });

    if (!output) return;

    if (currentFormPage !== 4) {
      const watch = form.watch([
        "title",
        "email",
        "fullName",
        "department",
        "dateOfEvent",
        "startingTime",
        "endingTime",
        "purpose",
        "doesHaveDryRun",
        "dryRunDate",
        "dryRunStart",
        "dryRunEnd",
        "doesHaveTCETAssitance",
        "tcetOtherAssitance",
        "meetingTypeOption",
        "meetingTypeServices",
        "meetingTypeServiceLink",
        "cameraSetup",
      ]);

      const previewResult = [
        {
          label: "Title: ",
          value: watch[0],
        },
        {
          label: "Email: ",
          value: watch[1],
        },
        {
          label: "Full Name: ",
          value: watch[2],
        },
        {
          label: "Department: ",
          value: watch[3],
        },
        {
          label: "Date of Event: ",
          value: watch[4],
        },
        {
          label: "Starting Time: ",
          value: watch[5],
        },
        {
          label: "Ending Time: ",
          value: watch[6],
        },
        {
          label: "Purpose: ",
          value: watch[7],
        },

        {
          label: "Dry Run: ",
          value: watch[8],
        },
        {
          label: "Dry Label Date: ",
          value: watch[9] ? watch[9] : "None",
        },
        {
          label: "Dry Run Staring Time: ",
          value: watch[10] ? watch[10] : "None",
        },
        {
          label: "Dry Run Ending Time: ",
          value: watch[11] ? watch[11] : "None",
        },
        {
          label: "Tech Assitance: ",
          value: watch[12],
        },
        {
          label: "Tech Assistance Name: ",
          value: watch[13] ? watch[13] : "None",
        },
        {
          label: "Service: ",
          value: watch[14],
        },
        {
          label: "Service Type: ",
          value: watch[15],
        },
        {
          label: "Livestream Link",
          value: watch[16] ? watch[16] : "None",
        },
        {
          label: "Camera Setup",
          value: watch[17] ? watch[17] : "None",
        },
      ];

      setDataFinalize(previewResult);

      setPreviousStep(currentFormPage);
      setCurrentFormPage((step) => step + 1);
    }
  };

  const goToPreviewsPage = () => {
    if (currentFormPage > 0) {
      setPreviousStep(currentFormPage);

      setCurrentFormPage((step) => step - 1);
    }

    if (currentFormPage !== 5) {
      setConfirmAgreement(false);
    }
  };

  let hasDryRun = form.watch("doesHaveDryRun");
  let hasOtherAssistance = form.watch("doesHaveTCETAssitance");

  const handleClick = () => {
    form.resetField("dryRunDate");
    form.resetField("dryRunStart");
    form.resetField("dryRunEnd");
  };

  const convertDateToString = (currentDate: Date | undefined) => {
    if (currentDate) {
      setOptionalDate(currentDate);
      const dryRunDate = currentDate ? currentDate.toLocaleDateString() : ""; // Convert Date to string
      form.setValue("dryRunDate", dryRunDate); // Set the value of dateOfEvent field in the form
    } else {
      setOptionalDate(currentDate);
    }
  };

  const handleMeetingTypeChange = (newMeetingType: any) => {
    form.setValue("meetingTypeOption", newMeetingType);
    form.resetField("meetingTypeServiceLink");
    form.setValue("meetingTypeServices", []);
    form.resetField("cameraSetup");
    setMeetingType(newMeetingType);
  };

  let watchChoices = form.watch(["meetingTypeServices"]);
  let watchChoices1 = form.watch(["meetingTypeOption"]);

  const handleSubmit = () => {
    form.handleSubmit(processForm)();
  };

  const confirmAgreementFuntion = () => {
    setConfirmAgreement(true);
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
              "sm:max-w-[1000px]  sm:max-h-[900px]":
                currentFormPage === 3 || currentFormPage === 4,
            })}
          >
            <Form {...form}>
              <form className="space-y-8">
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
                      name="fullName"
                      label="Requested By"
                      type="text"
                      placeholder="ex. Jhon Doe..."
                    />

                    <FormInputField
                      control={form.control}
                      name="contactPerson"
                      label="Contact Person / Event Handler"
                      type="text"
                      placeholder="ex. Jhon Doe..."
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

                    <SeletGroupFieldInput
                      name="startingTime"
                      placeholder="start of event.."
                      control={form.control}
                      label="Start"
                    />

                    <SeletGroupFieldInput
                      name="endingTime"
                      placeholder="end of event.."
                      control={form.control}
                      label="End"
                    />

                    <SelectFieldInput
                      control={form.control}
                      name="purpose"
                      label="Purpose"
                      placeholder="select a purpose"
                      data={purposeChoice}
                    />
                  </>
                )}

                {currentFormPage === 2 && (
                  <>
                    <DialogHeader>
                      <DialogTitle>Additonal Information</DialogTitle>
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
                                            {/* Customized Calendar */}

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
                                    placeholder="start of event.."
                                    control={form.control}
                                    label="Dry Run Start"
                                  />

                                  <SeletGroupFieldInput
                                    name="dryRunEnd"
                                    placeholder="start of event.."
                                    control={form.control}
                                    label="Dry Run End"
                                  />
                                </div>
                              </div>
                            </FormItem>
                          )}

                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="doesHaveTCETAssitance"
                      render={() => (
                        <FormItem>
                          <div className="mb-4">
                            <FormLabel className="text-base">
                              Tech Assitance
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
                                                  (value:any) => value !== item.id
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
                    {hasOtherAssistance.includes("others") && (
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
                    )}
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
                          name="meetingTypeOption"
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormLabel>Type of Service</FormLabel>
                              <Select
                                onValueChange={(value) =>
                                  handleMeetingTypeChange(value)
                                }
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
                                  <SelectItem value="documentation">
                                    Documentation
                                  </SelectItem>
                                  <SelectItem value="training">
                                    Training
                                  </SelectItem>
                                </SelectContent>
                              </Select>

                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {meetingType === "meeting" && (
                          <>
                            <CheckboxFieldInput
                              control={form.control}
                              name="meetingTypeServices"
                              data={zoomMeetingChoice}
                              linkControl={form.control}
                              openLiveStreaming={watchChoices}
                              linkInputField="meetingTypeServiceLink"
                            />
                          </>
                        )}

                        {meetingType === "webinar" && (
                          <>
                            <CheckboxFieldInput
                              control={form.control}
                              name="meetingTypeServices"
                              data={zoomWebinarChoice}
                              linkControl={form.control}
                              openLiveStreaming={watchChoices}
                              linkInputField="meetingTypeServiceLink"
                            />
                          </>
                        )}

                        {meetingType === "hybrid" && (
                          <>
                            <CheckboxFieldInput
                              control={form.control}
                              name="meetingTypeServices"
                              data={hybridChoice}
                              linkControl={form.control}
                              openLiveStreaming={watchChoices}
                              linkInputField="meetingTypeServiceLink"
                            />

                            <FormField
                              control={form.control}
                              name="cameraSetup"
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

                        {meetingType === "documentation" && (
                          <>
                            <CheckboxFieldInput
                              control={form.control}
                              name="meetingTypeServices"
                              data={photoVideoChoice}
                              linkControl={form.control}
                              openLiveStreaming={watchChoices}
                              linkInputField="meetingTypeServiceLink"
                            />
                          </>
                        )}
                        {meetingType === "training" && (
                          <>
                            <CheckboxFieldInput
                              control={form.control}
                              name="meetingTypeServices"
                              data={trainingChoice}
                              linkControl={form.control}
                              openLiveStreaming={watchChoices}
                              linkInputField="meetingTypeServiceLink"
                            />
                          </>
                        )}
                      </div>
                    </div>
                  </>
                )}

                {currentFormPage === 4 && (
                  <>
                    <DialogHeader>
                      <DialogTitle>Finalize</DialogTitle>
                    </DialogHeader>
                    <FinalizeForm data={dataFinalize} />
                    <div className="items-top flex space-x-2">
                      <Checkbox id="terms1" onClick={confirmAgreementFuntion} />
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor="terms1"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          I understand
                        </label>
                        <p className="text-sm text-muted-foreground">
                          If you have{" "}
                          <span className="font-bold text-red-500">
                            Zoom Background, Banner, Poster or Program Flow
                          </span>{" "}
                          please email{" "}
                          <span className="font-bold text-blue-600 underline">
                            tcet@tua.edu.ph
                          </span>
                        </p>
                      </div>
                    </div>
                  </>
                )}

                <DialogFooter>
                  <Button
                    type="button"
                    variant="default"
                    disabled={currentFormPage === 0 ? true : false}
                    onClick={goToPreviewsPage}
                  >
                    Back
                  </Button>

                  {currentFormPage < 4 && (
                    <Button type="button" onClick={goToNextPage}>
                      Next
                    </Button>
                  )}

                  {currentFormPage === 4 && (
                    <Button
                      type="button"
                      disabled={!confirmAgreement}
                      onClick={handleSubmit}
                    >
                      Submit
                    </Button>
                  )}
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
