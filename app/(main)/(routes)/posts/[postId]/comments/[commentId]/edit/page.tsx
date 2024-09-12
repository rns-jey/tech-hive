import EditComment from "@/components/molecules/edit-comment";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

interface EditCommentPageProps {
  params: {
    commentId: string;
  };
}

export default async function EditCommentPage({ params }: EditCommentPageProps) {
  const profile = await currentProfile();

  if (!profile) {
    return notFound();
  }

  const comment = await db.comment.findUnique({
    where: { id: params.commentId },
    include: { commenter: true },
  });

  if (!comment) {
    return;
  }

  return <EditComment profile={profile} comment={comment} />;
}
