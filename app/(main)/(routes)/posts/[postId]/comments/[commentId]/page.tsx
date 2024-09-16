import { Button } from "@/components/atoms/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/molecules/avatar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/organisms/card";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/molecules/dropdown-menu";
import { EllipsisIcon } from "lucide-react";
import Link from "next/link";

interface CommentPageProps {
  params: {
    commentId: string;
  };
}

export default async function Comment({ params }: CommentPageProps) {
  const profile = await currentProfile();

  if (!profile) {
    return notFound();
  }

  const comment = await db.comment.findUnique({
    where: { id: params.commentId, commenter: profile },
    include: { post: true, commenter: true },
  });

  if (!comment) {
    return notFound();
  }

  return (
    <div className="flex flex-col items-center">
      <Card className="max-w-4xl mx-4 w-full">
        <CardHeader>
          <CardTitle className="flex space-x-2">
            <p className="">Discussion on:</p>
            <p>{comment.content}</p>
          </CardTitle>
        </CardHeader>
        <CardFooter>
          <Link href={`/posts/${comment.postId}`}>
            <Button variant="outline">View post</Button>
          </Link>
        </CardFooter>
      </Card>
      <Card className="max-w-5xl w-full -mt-4">
        <CardContent className="flex space-x-2 p-6">
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
                <DropdownMenuItem>Report abuse</DropdownMenuItem>

                {profile?.id === comment.commenter.id && (
                  <>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <Link href={`${comment.postId}/comments/${comment.id}/edit`}>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                    </Link>
                    <Link href={`${comment.postId}/comments/${comment.id}/delete`}>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </Link>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
