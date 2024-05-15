"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Events, formSchemaData } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
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
      const response = await axios.get(`/api/edit/${id}`);
      return response.data;
    },
  });

  const { mutate: updateEvent } = useMutation({
    mutationFn: (updateEvent: Events) => {
      return axios.patch(`/api/edit/${id}`, updateEvent);
    },
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
    defaultValues: dataEvent
  });



  const onEdit: SubmitHandler<Events> = (data) => {
    updateEvent(data);
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
      <form onSubmit={form.handleSubmit(onEdit)}>
        <FormField
          control={form.control}
          name="title"
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default EditPage;
