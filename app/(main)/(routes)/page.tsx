import { Button } from "@/components/atoms/button";
import { Separator } from "@/components/atoms/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/molecules/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/organisms/card";
import { db } from "@/lib/db";
import { PostWithAuthor } from "@/types";
import { SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { format } from "date-fns";

export default async function Home() {
  const posts = await db.post.findMany({
    include: { author: true },
    orderBy: { createdAt: "desc" },
    take: 5,
  });
  const postss = [
    {
      author: "Magnus Flours",
      date: "Aug 30",
      title: "NEON OSS Next.js Starter Kit",
      tags: ["#devchallenge", "#neonchallenge", "#postgres", "#database"],
      reactions: 3,
      readTime: "1 min read",
    },
    {
      author: "Andy Arenas",
      date: "Aug 29",
      title: "React 18 Released",
      tags: ["#react", "#javascript", "#webdev"],
      reactions: 12,
      readTime: "2 min read",
    },
    {
      author: "Hazel Bulatao",
      date: "Aug 28",
      title: "Understanding Async/Await in JavaScript",
      tags: ["#javascript", "#async", "#webdev"],
      reactions: 5,
      readTime: "3 min read",
    },
    {
      author: "Tristan Gascon",
      date: "Aug 27",
      title: "CSS Grid vs. Flexbox: When to Use Which",
      tags: ["#css", "#webdesign", "#frontend"],
      reactions: 8,
      readTime: "4 min read",
    },
    {
      author: "Hazmin Diaz",
      date: "Aug 26",
      title: "Exploring Node.js Performance Tips",
      tags: ["#nodejs", "#performance", "#backend"],
      reactions: 10,
      readTime: "5 min read",
    },
  ];

  const threads = [
    {
      title: "Bug Bounties",
    },
    {
      title: "What Does a -2 Reaction Mean? Is It a Bug?",
    },
    {
      title: "Latest Newsletter: Javascripts, Exponentials, Aliens & Slaves",
    },
    {
      title: "Using LLMs for productivity without replacing the human originality",
    },
    {
      title: "Seeking Feedback: A Chrome Extension for Tracking dev.to Reactions?",
    },
  ];

  return (
    <div className="  flex space-x-4">
      {/* <div className="w-60 p-4 max-w-xs bg-white">Tech Hive is a community of 1,980,279 amazing developers</div> */}

      <div className="w-60">
        <SignedOut>
          <Card>
            <CardHeader>
              <CardTitle>Tech Hive is a community of 1,980,279 amazing developers</CardTitle>
            </CardHeader>
            <CardContent>
              <p>We&apos;re a place where coders share, stay up-to-date and grow their careers.</p>
            </CardContent>
            <CardFooter className="flex flex-col space-y-1">
              <SignUpButton>
                <Button className="w-full" variant="outline">
                  Create account
                </Button>
              </SignUpButton>

              <SignInButton>
                <Button className="w-full" variant="ghost">
                  Login
                </Button>
              </SignInButton>
            </CardFooter>
          </Card>
        </SignedOut>
        <div className="flex flex-col">
          <div>Home</div>
          <div>Code of Conduct</div>
          <div>Privacy Policy</div>
          <div>Terms of use</div>
        </div>
      </div>

      <div className="flex flex-col flex-1 space-y-2">
        <div className="flex space-x-6">
          <p>Relevant</p>
          <p>Latest</p>
          <p>Top</p>
        </div>
        {posts.map((post: PostWithAuthor) => (
          <Card key={post.id}>
            <CardHeader>
              <Avatar>
                <AvatarImage src={post.author.imageUrl} alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <CardDescription className="flex flex-col">{post.author.name}</CardDescription>
              <CardDescription className="flex flex-col">{format(new Date(post.createdAt), "MMM d")}</CardDescription>
              <CardTitle>
                <p className="hover:text-blue-700">
                  <a href={`/posts/${post.id}`}>{post.title}</a>
                </p>
              </CardTitle>
            </CardHeader>
            <CardContent>{/* <p>{post.tags.join(" ")}</p> */}</CardContent>
            <CardFooter className="w-full flex gap-1">
              <Button>reactions</Button>
              <Button>Add Comment</Button>
              <p className="ml-auto"></p>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="w-72">
        <Card>
          <CardHeader>
            <CardTitle>#discuss</CardTitle>
            <CardDescription>Discussion threads targeting the whole community</CardDescription>
          </CardHeader>
          <CardContent>
            {threads.map((thread, i) => (
              <div key={i}>
                <Separator className="mb-4" />
                <p className="mb-4">{thread.title}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
