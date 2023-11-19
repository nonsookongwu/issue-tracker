import IssueBadge from '@/app/components/Badge';
import { Card, Flex, Heading } from '@radix-ui/themes';
import React from 'react'
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ReactMarkdown from 'react-markdown'

const IssueDetailsPageLoading = () => {
    const newIssue = [1,2,3,4,5]
  return (
    <div className='max-w-xl'>
      <Heading><Skeleton/></Heading>
      <Flex gap={"5"} my={"4"}>
        <Skeleton width={'5rem'}/>
        <Skeleton width={'8rem'}/>
      </Flex>
      <Card className="prose" mt={"4"}>
        <Skeleton count={3}/>
      </Card>
    </div>
  );
}

export default IssueDetailsPageLoading