import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Event = {
  title: string;
  department: string;
  dateOfEvent: string;
  startingTime: string;
  endingTime: string;
  meetingTypeOption: string;
};

type Props = {
  data: Event[];
};

export const CardEvent = ({ data }: Props) => {
  return (
    <>
      {data.map((event) => {
       
        return (
          <Card>
            <CardHeader>
              <CardTitle
              className={cn('text-xl')}
              >{event.title}</CardTitle>
              <CardDescription>{event.department}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="font-semibold text-gray-400">{event.startingTime} <span className="font-bold">-</span>{event.endingTime}</p>
              <Badge>{event.meetingTypeOption}</Badge>
            </CardContent>
          </Card>
        );
      })}
    </>
  );
};
