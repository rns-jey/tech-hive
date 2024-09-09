"use client";

import * as z from "zod";

import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

import { Textarea } from "../atoms/textarea";
import { Button } from "../atoms/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import qs from "query-string";
import { Form, FormField, FormItem } from "../organisms/form";
import axios from "axios";
import { db } from "@/lib/db";

interface PostCommentProps {
  postId: string;
  profile: {
    imageUrl: string;
    name: string;
  } | null;
}

const formSchema = z.object({
  content: z.string().min(1, {
    message: "Content is required",
  }),
});

export default function PostComment({ postId, profile }: PostCommentProps) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  const isLoading = form.formState.isSubmitting;
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: "/api/comments",
        query: {
          postId: postId,
        },
      });

      await axios.post(url, values);

      form.reset();
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex space-x-2 w-full">
      <Avatar>
        <AvatarImage src={profile?.imageUrl} alt={profile?.name} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <Form {...form}>
          <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
            <FormItem>
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => <Textarea disabled={isLoading} {...field} placeholder="Add to the discussion" />}
              />
            </FormItem>

            <Button disabled={isLoading}>Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
