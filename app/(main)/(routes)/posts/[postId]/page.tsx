import { Button } from "@/components/atoms/button";
import { Separator } from "@/components/atoms/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/molecules/avatar";
import CommentList from "@/components/molecules/comments";
import PostComment from "@/components/molecules/post-comment";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/organisms/card";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { format } from "date-fns";
import { Fragment } from "react";

interface PostIdPageProps {
  params: {
    postId: string;
  };
}

export default async function PostIdPage({ params }: PostIdPageProps) {
  const profile = await currentProfile();

  const post = await db.post.findUnique({
    where: { id: params.postId },
    include: { author: true },
  });

  const authorPosts = await db.post.findMany({
    where: { authorId: post?.authorId, NOT: { id: post?.id } },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="flex space-x-3">
      <Card className="flex-1">
        <CardHeader className="space-y-5">
          <div className="flex space-x-2 items-center">
            <Avatar>
              <AvatarImage src={post.author.imageUrl} alt={post.author.name} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="font-bold">{post.author.name}</p>
              <CardDescription className="text-xs">
                Posted on {format(new Date(post.createdAt), "MMM d")}
              </CardDescription>
            </div>
          </div>
          <CardTitle className="text-5xl font-bold">{post.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{post.content}</p>
        </CardContent>
        <Separator className="mb-4" />
        <CardFooter className="flex flex-col items-start space-y-4">
          <p className="font-bold text-2xl">Top comments</p>
          <PostComment postId={post.id} profile={profile} />
          <CommentList postId={post.id} />
        </CardFooter>
      </Card>
      <div className="flex flex-col min-w-72 space-y-3 max-w-96">
        <Card>
          <CardHeader>
            <CardTitle>{post.author.name}</CardTitle>
            <Button>Follow</Button>
          </CardHeader>
          <CardContent>
            <p>{post.content}</p>
          </CardContent>
          <CardFooter className="flex flex-col items-start">
            <p>JOINED</p>
            <p>{format(new Date(post.author.createdAt), "MMM d, yyyy")}</p>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>More from {post.author.name}</CardTitle>
          </CardHeader>
          <CardContent className="pb-0">
            {authorPosts.map((post) => (
              <Fragment key={post.id}>
                <Separator />
                <p className="my-4">{post.title}</p>
              </Fragment>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
