import { createIssueSchema } from "@/app/ValidationSchema";
import prisma from "@/prisma/client";
import { Issue } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface Props{
    params: { id: string };
}

export async function PATCH(request: NextRequest, {params:{id}}:{params: { id: string }}) {

    const body: Issue = await request.json()

    const validation = createIssueSchema.safeParse(body)
    if (!validation.success) {
        return NextResponse.json({error: validation.error.format()}, {status: 400})
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
            title: body.title,
            description: body.description,
           
        }
    })

    return NextResponse.json({updatedIssue, msg:`issue with id ${issue?.id} has been updated`}, {status: 200})

}
