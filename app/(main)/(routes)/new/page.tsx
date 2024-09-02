"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Form, FormField, FormItem, FormMessage } from "@/components/organisms/form";
import { Input } from "@/components/atoms/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/organisms/card";
import { Button } from "@/components/atoms/button";
import { Textarea } from "@/components/atoms/textarea";
import axios from "axios";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
  content: z.string().min(1, {
    message: "Content is required",
  }),
  imageUrl: z.string(),
  published: z.boolean(),
});
export default function NewPost() {
  const form = useForm({
    resolver: zodResolver(formSchema),

    defaultValues: {
      title: "",
      content: "",
      imageUrl: "",
      published: false,
    },
  });

  const isLoading = form.formState.isSubmitting;
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      values.published = true;

      const response = await axios.post("/api/posts/", values);
      const { id } = response.data;

      form.reset();
      router.push(`/posts/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>
              <FormField
                disabled={isLoading}
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <Input placeholder="New post title here..." {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              disabled={isLoading}
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <Textarea className="resize-none" placeholder="Write your post content here..." {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="space-x-2">
            <Button disabled={isLoading}>Publish</Button>
            <Button variant="outline" disabled={isLoading}>
              Save draft
            </Button>
          </CardFooter>
        </Card>
        <div></div>
        <div></div>
      </form>
    </Form>
  );
}
