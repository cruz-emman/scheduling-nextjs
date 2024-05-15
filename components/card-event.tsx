import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


type Event = {
  id: number;
  title: string;
  unit: string;
  type_of_event: string;
  date: string;
  type_of_service: string[];
};

type Props = {
  data: Event[];
};

export const CardEvent = ({ data }: Props) => {
  return (
    <>
      {data.map((event) => (
        <Card key={event.id}>
          <CardHeader>
            <CardTitle>{event.title}</CardTitle>
            <CardDescription>{event.unit}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{event.type_of_event}</p>
            <p>{event.date}</p>
            <p>{event.type_of_service.join(", ")}</p>
          </CardContent>
         
        </Card>
      ))}
    </>
  );
};
