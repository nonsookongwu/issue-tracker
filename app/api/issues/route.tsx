import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { createIssueSchema } from "../../ValidationSchema";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

interface Issue {
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
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({}, {status: 401})
    }
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
    return NextResponse.json(error, { status: 500 });
  }
}

