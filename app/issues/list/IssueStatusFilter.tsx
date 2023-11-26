"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import React from "react";

interface Statuses {
  label: string;
  value: Status;
}

const statuses: Statuses[] = [
  // {label: 'All', value: ''},
  { label: "Open", value: "OPEN" },
  { label: "In progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const IssueStatusFilter = () => {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Select by filter..." />
      <Select.Content>
        <Select.Group>
          <Select.Item value="all">All</Select.Item>
          {statuses.map((status) => (
            <Select.Item key={status.value} value={status.value}>{status.label}</Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
