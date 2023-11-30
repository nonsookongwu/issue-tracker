import prisma from "@/prisma/client";
import { Avatar, Card, Flex, Heading, Table, Tooltip } from "@radix-ui/themes";
import Link from "next/link";
import IssueBadge from "./components/Badge";
import { FaUser } from "react-icons/fa";

const LatestIssues = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include:{assignedToUser:true}
  });

  return (
    <Card>
      <Heading size={"4"} mb={"5"}>
        Latest Issues
      </Heading>
      <Table.Root>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Flex justify={"between"}>
                  <Tooltip content="view issues">
                    <Flex direction={"column"} align={"start"} gap={"2"}>
                      <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                      <IssueBadge status={issue.status} />
                    </Flex>
                  </Tooltip>
                  {issue.assignedToUser && (
                    <>
                      <Tooltip
                        content={`issue assigned to ${issue.assignedToUser.name}`}
                      >
                        <Avatar
                          fallback={<FaUser />}
                          src={issue.assignedToUser.image!}
                          radius="full"
                          size={"2"}
                        />
                      </Tooltip>
                    </>
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestIssues;
