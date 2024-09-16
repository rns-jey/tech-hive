"use client";

import { Comment } from "@prisma/client";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../organisms/card";
import { Button } from "../atoms/button";
import { useRouter } from "next/navigation";

import qs from "query-string";
import axios from "axios";

interface DeleteCommentProps {
  comment: Comment;
}

export default function DeleteComment({ comment }: DeleteCommentProps) {
  const router = useRouter();

  const onSubmit = async () => {
    try {
      const url = qs.stringifyUrl({
        url: "/api/comments",
        query: {
          commentId: comment.id,
        },
      });

      await axios.delete(url);

      router.push(`/posts/${comment.postId}/comments/${comment.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Card className="max-w-4xl mx-4 w-full">
        <CardContent className="px-12 py-8">
          <p>{comment.content}</p>
        </CardContent>
      </Card>
      <Card className="max-w-5xl w-full -mt-4">
        <CardHeader>
          <CardTitle>Are you certain you want to remove this comment?</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This action cannot be undone. Would you like to edit instead?</p>
        </CardContent>
        <CardFooter className="space-x-1">
          <Button onClick={() => onSubmit()}>Delete</Button>
          <Button>Edit</Button>
          <Button>Cancel</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
