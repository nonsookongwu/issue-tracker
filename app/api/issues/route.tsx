import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

import { z } from "zod";

const createIssueSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1),
});

interface Issue{
    title: string;
    description: string;
}


export async function GET(request: NextRequest) {
    try {
      const allIssues = await prisma.issue.findMany();

      return NextResponse.json(allIssues);
    } catch (error) {
      return NextResponse.json(error, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body: Issue = await request.json();

        const validation = createIssueSchema.safeParse(body);

        if (!validation.success) {
          return NextResponse.json(
            { error: validation.error.errors[0].message },
            { status: 400 }
          );
        }

        const issue = await prisma.issue.create({
          data: {
            title: body.title,
            description: body.description,
          },
        });

        return NextResponse.json(issue, { status: 201 });
    
   } catch (error) {
    return NextResponse.json(error, {status: 500})
   }
}