import { Button } from "@/components/atoms/button";
import DeleteComment from "@/components/molecules/delete-comment";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/organisms/card";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { notFound, useRouter } from "next/navigation";

interface CommentProps {
  params: {
    commentId: string;
  };
}
export default async function ConfirmDelete({ params }: CommentProps) {
  const profile = await currentProfile();

  if (!profile) {
    return notFound();
  }

  const comment = await db.comment.findUnique({
    where: { id: params.commentId, commenter: profile },
    include: { commenter: true },
  });

  if (!comment) {
    return notFound();
  }

  if (comment.commenter.userId !== profile.userId) {
    return notFound();
  }

  return <DeleteComment comment={comment} />;
}
