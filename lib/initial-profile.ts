import { currentUser } from "@clerk/nextjs/server";
import { db } from "./db";

export async function initialProfile() {
  const user = await currentUser();

  if (!user) return;

  const profile = await db.profile.findUnique({
    where: {
      userID: user.id,
    },
  });

  if (profile) {
    return profile;
  }

  const newProfile = await db.profile.create({
    data: {
      userID: user.id,
      name: `${user.firstName} ${user.lastName}`,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
    },
  });

  return newProfile;
}
