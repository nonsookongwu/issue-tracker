import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./issueDetails";
import DeleteIssueButton from "./DeleteIssueButton";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import AssigneeSelect from "./AssigneeSelect";
import { cache } from "react";

interface Props {
  params: { id: string };
}

const fetchUser = cache((issueId: number) => {
  return prisma.issue.findUnique({where:{id:issueId}})
})

const IssuesDetailPage = async ({ params: { id } }: Props) => {
  const session = await getServerSession(authOptions);

  const newIssue = await fetchUser(parseInt(id))

  if (!newIssue) notFound();

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap={"4"}>
      <Box className="md:col-span-4">
        <IssueDetails issue={newIssue} />
      </Box>
      {session && (
        <Box>
          <Flex direction={"column"} gap={"4"}>
            <AssigneeSelect issue={newIssue} />
            <EditIssueButton issueId={newIssue.id} />
            <DeleteIssueButton issueId={newIssue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export async function generateMetadata({ params }: Props) {
  const issue = await fetchUser(parseInt(params.id));

  return {
    title: issue?.title,
    description: `details of ${issue?.id}`
  }
}

export default IssuesDetailPage;
