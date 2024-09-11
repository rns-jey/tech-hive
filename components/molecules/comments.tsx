import { db } from "@/lib/db";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { format } from "date-fns";
import { EllipsisIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./dropdown-menu";

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
          <div className="flex flex-col min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm space-y-2 relative">
            <div className="flex flex-col">
              <h3 className=" font-bold">{comment.commenter.name}</h3>
              <p className="text-xs">{format(new Date(comment.commenter.createdAt), "MMM d, yyyy")}</p>
            </div>
            <p>{comment.content}</p>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <EllipsisIcon className="absolute top-0 right-3 hover:bg-slate-100 rounded-md p-1 cursor-pointer" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Copy link</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Report abuse</DropdownMenuItem>
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ))}
    </div>
  );
}
