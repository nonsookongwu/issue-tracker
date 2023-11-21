import IssueBadge from '@/app/components/Badge';
import { Issue } from '@prisma/client';
import { Card, Flex, Heading, Text } from '@radix-ui/themes';
import ReactMarkdown from 'react-markdown';

interface Props{
    issue: Issue
}

const IssueDetails = ({issue}:Props) => {
  return (
    <div>
      <Heading>{issue.title}</Heading>
      <Flex gap={"5"} my={"4"}>
        <IssueBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose max-w-full" mt={"4"}>
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </div>
  );
}

export default IssueDetails