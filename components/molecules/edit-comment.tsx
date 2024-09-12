"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../organisms/card";
import { Form, FormField, FormItem } from "../organisms/form";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import qs from "query-string";
import { Comment, Profile } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Avatar, AvatarImage } from "./avatar";
import { Textarea } from "../atoms/textarea";
import { Button } from "../atoms/button";

interface EditCommentProps {
  comment: Comment;
  profile: Profile;
}

const formSchema = z.object({
  content: z.string().min(1, {
    message: "Content is required",
  }),
});

export default function EditComment({ comment, profile }: EditCommentProps) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: comment.content,
    },
  });

  const isLoading = form.formState.isSubmitting;
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: "/api/comments",
        query: {
          commentId: comment.id,
        },
      });

      await axios.patch(url, values);

      form.reset();
      router.push(`/posts/${comment.postId}/comments/${comment.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card className="max-w-5xl m-auto px-10 py-5">
      <CardHeader>
        <CardTitle className="text-3xl">Editing comment</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <FormItem className="flex space-y-0 space-x-2">
              <Avatar>
                <AvatarImage src={profile.imageUrl} alt={profile.name} />
              </Avatar>
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => <Textarea disabled={isLoading} {...field} />}
              />
            </FormItem>
          </CardContent>
          <CardFooter>
            <Button disabled={isLoading} className="ml-auto">
              Submit
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
