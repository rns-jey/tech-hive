import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const profile = await currentProfile();
    const { title, content, imageUrl, published } = await req.json();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const post = await db.post.create({
      data: {
        title,
        content,
        published,
        imageUrl,
        authorId: profile.id,
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error("POSTS_POST", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
