'use client';
import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';
import { Button, Flex, Text } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react'

interface Props{
    itemCount: number;
    pageSize: number;
    currentPage: number
}

const Pagination = ({ currentPage, itemCount, pageSize }: Props) => {
    const router = useRouter() //for updating the current URL

    const searchParams = useSearchParams() //assessing the current query parameters in the URL

    const pageCount = Math.ceil(itemCount / pageSize)
    if (pageCount <= 1) return null
    if (currentPage > pageCount) currentPage = 1

    const changePage = (page:number) => {
        const params = new URLSearchParams(searchParams)
        params.set('page', page.toString())
        router.push(`?${params.toString()}`)
    }

  return (
    <Flex align={"center"} gap={"3"}>
      <Text size={"2"}>
        {" "}
        page {currentPage} of {pageCount}
      </Text>
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === 1}
        onClick={() => changePage(1)}
      >
        <DoubleArrowLeftIcon />
      </Button>
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === 1}
        onClick={() => changePage(currentPage - 1)}
      >
        <ChevronLeftIcon />
      </Button>
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === pageCount}
        onClick={() => changePage(currentPage + 1)}
      >
        <ChevronRightIcon />
      </Button>
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === pageCount}
        onClick={() => changePage(pageCount)}
      >
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
}

export default Pagination