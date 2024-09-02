import { Post, Profile } from "@prisma/client";

export type PostWithAuthor = Post & { author: Profile };
