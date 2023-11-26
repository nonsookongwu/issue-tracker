import { createIssueSchema, updateIssueSchema } from "@/app/ValidationSchema";
import authOptions from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";
import prisma from "@/prisma/client";
import { Issue } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface Props{
    params: { id: string };
}

export async function PATCH(request: NextRequest, { params: { id } }: { params: { id: string } }) {
    
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({}, { status: 401 });
    }

    const body: Issue = await request.json()

    const validation = updateIssueSchema.safeParse(body)
    if (!validation.success) {
        return NextResponse.json({error: validation.error.format()}, {status: 400})
    }

    const {title, description, assignedToUserId} = body

    if (assignedToUserId) {
      const user = await  prisma.user.findUnique({
            where:{id:assignedToUserId}
      })
        
        if (!user) {
            return NextResponse.json({error: "invalid user"}, {status: 400})
        }
    }


    const issue = await prisma.issue.findUnique({
        where: {id: +id}
    })

    if (!issue) {
        return NextResponse.json({error: "issue doesnt exist"}, {status: 400})
    }

    const updatedIssue = await prisma.issue.update({
        where: { id: issue?.id },
        data: {
            title,
            description,
            assignedToUserId
           
        }
    })

    return NextResponse.json({updatedIssue, msg:`issue with id ${issue?.id} has been updated`}, {status: 200})

}

export async function DELETE(request: NextRequest, { params: { id } }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({}, { status: 401 });
    }

    const issue = await prisma.issue.findUnique({
        where:{id: +id}
    })

    if (!issue) {
       return NextResponse.json({error: "issue doesnt exist"}, {status: 404})
    }

    await prisma.issue.delete({
        where:{id: issue?.id}
    })

    return NextResponse.json({msg:`issue number ${issue.id} as been deleted`}, {status: 200})
}