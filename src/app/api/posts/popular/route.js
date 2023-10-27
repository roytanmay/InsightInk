import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    const topViewedPosts = await prisma.post.findMany({
      take: 5, // Get the top 5 most viewed posts
      orderBy: { views: "desc" }, // Order by views in descending order
      include: { user: true },
    });

    if (topViewedPosts.length === 0) {
      return new NextResponse(
        JSON.stringify(
          { message: "No top viewed posts found." },
          { status: 404 }
        )
      );
    }

    return new NextResponse(JSON.stringify(topViewedPosts, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};
