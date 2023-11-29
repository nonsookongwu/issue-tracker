"use client";
import { Issue, Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface Statuses {
  label: string;
  value: Status;
}

interface Props {
  searchParams: { status: Status; orderBy: keyof Issue };
}

const statuses: Statuses[] = [
  { label: "Open", value: "OPEN" },
  { label: "In progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const IssueStatusFilter = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const params = new URLSearchParams();
    const orderBy = searchParams.get("orderBy");

    // console.log(searchParams)

  return (
      <Select.Root
          defaultValue={searchParams.get('status') || 'ALL'}
          onValueChange={(status) => {
          
          console.log(params)
          if (status) params.append('status', status)
          if (orderBy) params.append('orderBy', orderBy )
          
          const query = params.size ? `?${params.toString()}` : ''
            router.push(`/issues/list/${query}`)
        
    }}>
      <Select.Trigger placeholder="Select by filter..." />
      <Select.Content>
        <Select.Group>
          <Select.Item value="ALL">All</Select.Item>
          {statuses.map((status) => (
            <Select.Item key={status.value} value={status.value}>{status.label}</Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
