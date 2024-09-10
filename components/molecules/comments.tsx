import { db } from "@/lib/db";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { format } from "date-fns";

interface CommentListProps {
  postId: string;
}

export default async function CommentList({ postId }: CommentListProps) {
  const comments = await db.comment.findMany({
    where: {
      postId,
    },
    include: { commenter: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="w-full space-y-2">
      {comments.map((comment) => (
        <div key={comment.id} className="flex space-x-2 w-full">
          <Avatar>
            <AvatarImage src={comment.commenter.imageUrl} alt={comment.commenter.name} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm space-y-2">
            <div className="flex flex-col">
              <h3 className=" font-bold">{comment.commenter.name}</h3>
              <p className="text-xs">{format(new Date(comment.commenter.createdAt), "MMM d, yyyy")}</p>
            </div>
            <p>{comment.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
