import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const profile = await currentProfile();
    const { content } = await req.json();
    const { searchParams } = new URL(req.url);

    const postId = searchParams.get("postId");

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!postId) {
      return new NextResponse("Missing post ID", { status: 400 });
    }

    const comment = await db.comment.create({
      data: {
        content,
        postId,
        commenterId: profile.id,
      },
    });

    return NextResponse.json(comment);
  } catch (error) {
    console.error("POSTS_POST", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
