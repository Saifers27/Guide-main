// // app/api/lessons.ts
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export async function getLessons() {
//   return await prisma.lesson.findMany({
//     take: 100, // adjust number of lessons
//   });
// }

// export async function addLesson(data: {
//   jp: string;
//   romaji: string;
//   np: string;
//   category: string;
//   type: string;
// }) {
//   return await prisma.lesson.create({ data });
// }
// import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export async function GET() {
//   try {
//     const lessons = await prisma.lesson.findMany({
//       orderBy: { id: "asc" },
//       take: 5000, // fetch up to 5000 lessons
//     });
//     return NextResponse.json(lessons);
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: "Failed to fetch lessons" }, { status: 500 });
//   }
// }
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { search } = Object.fromEntries(request.nextUrl.searchParams.entries());

    if (!search) {
      // return empty array or first 50 rows if needed
      const lessons = await prisma.lesson.findMany({
        take: 50,
      });
      return NextResponse.json(lessons);
    }

    // server-side filtering
    const term = search.toLowerCase();
    const lessons = await prisma.lesson.findMany({
     
  where: {
    OR: [
      { jp: { contains: term } },
      { romaji: { contains: term } },  // no mode
      { np: { contains: term } },
      { category: { contains: term } },  // no mode
    ],
  },
  take: 50,
});


    return NextResponse.json(lessons);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch lessons" }, { status: 500 });
  }
}
