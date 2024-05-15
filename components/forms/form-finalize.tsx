import React from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import {
  hybridChoice,
  photoVideoChoice,
  purposeChoice,
  zoomMeetingChoice,
  zoomWebinarChoice,
} from "@/sampleData";

interface FinalizeFormProps {
  data: any;
}

const FinalizeForm = ({ data }: FinalizeFormProps) => {
  const generalInformations = data.slice(0, 4);
  const purposeInformation = data.slice(4, 7);
  const additonalInformation = data.slice(8, 11);
  const tcetAssitances = data[12];
  const tcetAssitanceName = data[13];

  const combinedChoices = zoomMeetingChoice.concat(
    zoomWebinarChoice,
    hybridChoice,
    photoVideoChoice
  );

  const zoomFeatureInformation = data[14];
  const zoomFeaturesData = data[15];
  const zoomFeatureDataLink = data[16];
  const cameraFeature = data[17];

  const zoomCompareTwoArray = combinedChoices
    .filter((item) => zoomFeaturesData.value.includes(item.id))
    .map((res) => res.label)
    .join(" ");


  return (
    <div className="h-[600px] w-full">
      <ScrollArea className="h-full w-full rounded-md border p-4">
        <div className="flex flex-col gap-y-2">
          <div className="flex flex-col gap-y-2">
            <p className="font-semibold text-gray-600">General Information</p>
            {generalInformations.map((item: any, index: number) => (
              <div
                key={index}
                className="flex w-full uppercase  items-center gap-x-2"
              >
                <div className="flex flex-1">
                  <Label>{item.label}</Label>
                </div>
                <div className="flex flex-1">
                  <p className="font-normal">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          <Separator
            orientation="horizontal"
            className="my-2 w-full bg-slate-200"
          />

          <div className="flex flex-col gap-y-2">
            <p className="font-semibold">Purpose, Date & Time</p>
            {purposeInformation.map((item: any, index: number) => (
              <div
                key={index}
                className="flex w-full uppercase  items-center gap-x-2"
              >
                <div className="flex flex-1">
                  <Label>{item.label}</Label>
                </div>
                <div className="flex flex-1">
                  <p className="font-normal">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          <Separator
            orientation="horizontal"
            className="my-2 w-full bg-slate-200"
          />

          <div className="flex flex-col gap-y-2">
            <p className="font-semibold">Additonal Information</p>
            {additonalInformation.map((item: any, index: number) => (
              <div
                key={index}
                className="flex w-full uppercase  items-center gap-x-2"
              >
                <div className="flex flex-1">
                  <Label>{item.label}</Label>
                </div>
                <div className="flex flex-1">
                  <p className="font-normal">{item.value}</p>
                </div>
              </div>
            ))}

            <div className="flex w-full uppercase  items-center gap-x-2">
              <div className="flex flex-1">
                <Label>{tcetAssitances.label}</Label>
              </div>
              <div className="flex flex-1">
                <p className="font-normal">
                  {tcetAssitances.value.join(" , ")}
                </p>
              </div>
            </div>
            <div className="flex w-full uppercase  items-center gap-x-2">
              <div className="flex flex-1">
                <Label>{tcetAssitanceName.label}</Label>
              </div>
              <div className="flex flex-1">
                <p className="font-normal">{tcetAssitanceName.value}</p>
              </div>
            </div>
          </div>

          <Separator
            orientation="horizontal"
            className="my-2 w-full bg-slate-200"
          />

          <div className="flex flex-col gap-y-2">
            <p className="font-semibold">Service Features</p>

            <div className="flex w-full uppercase  items-center gap-x-2">
              <div className="flex flex-1">
                <Label>{zoomFeatureInformation.label}</Label>
              </div>
              <div className="flex flex-1">
                <p className="font-normal">{zoomFeatureInformation.value}</p>
              </div>
            </div>

            <div className="flex w-full uppercase  items-center gap-x-2">
              <div className="flex flex-1">
                <Label>{zoomFeaturesData.label}</Label>
              </div>
              <div className="flex flex-wrap flex-1">
                <p className="font-normal">{zoomCompareTwoArray}</p>
              </div>
            </div>

            <div className="flex w-full uppercase  items-center gap-x-2">
              <div className="flex flex-1">
                <Label>{zoomFeatureDataLink.label}</Label>
              </div>
              <div className="flex flex-1">
                <p className="font-normal">{zoomFeatureDataLink.value}</p>
              </div>
            </div>

            <div className="flex w-full uppercase  items-center gap-x-2">
              <div className="flex flex-1">
                <Label>{cameraFeature.label}</Label>
              </div>
              <div className="flex flex-1">
                <p className="font-normal">{cameraFeature.value}</p>
              </div>
            </div>
          </div>

          <Separator
            orientation="horizontal"
            className="my-2 w-full bg-slate-200"
          />
        </div>
      </ScrollArea>
    </div>
  );
};

export default FinalizeForm;
