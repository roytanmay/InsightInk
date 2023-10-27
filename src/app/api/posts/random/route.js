import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  const query = {
    take: 10,
    orderBy: [{ createdAt: "desc" }],
  };

  try {
    const recentPosts = await prisma.post.findMany(query);

    // console.log(recentPosts);

    if (recentPosts.length === 0) {
      return new NextResponse(
        JSON.stringify({ message: "No recent posts found." }, { status: 404 })
      );
    }

    // Choose a random index within the recent posts
    const randomIndex = Math.floor(Math.random() * recentPosts.length);

    // Get the random post
    const randomPost = recentPosts[randomIndex];

    return new NextResponse(JSON.stringify(randomPost, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};
