import { Status } from "@prisma/client";
import { Box, Card, Flex, Text, Tooltip } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

interface Containers {
  label: string;
  value: number;
  status: Status;
  toolTipContent: string;
}

const IssueSummary = ({ closed, inProgress, open }: Props) => {
  const containers: Containers[] = [
    {
      label: "Open Issues",
      value: open,
      status: "OPEN",
      toolTipContent: "view open issues",
    },
    {
      label: "In-Progress Issues",
      value: inProgress,
      status: "IN_PROGRESS",
      toolTipContent: "view in-progress issues",
    },
    {
      label: "Closed Issues",
      value: closed,
      status: "CLOSED",
      toolTipContent: "view closed issues",
    },
  ];

  return (
    <Flex gap={"4"} direction={{ initial: "column", sm: "row" }}>
      {containers.map((container) => (
        <Card key={container.value}>
          <Tooltip className="sm" content={container.toolTipContent}>
            <Flex
              direction={{ initial: "row", sm: "column" }}
              justify={{ initial: "between", sm: "start" }}
              gap={"1"}
             
            >
              <Link
                className="text-sm font-medium max-sm:py-3"
                href={`/issues/list?status=${container.status}`}
              >
                {container.label}
              </Link>
              <Text size={"7"} className="font-bold">
                {container.value}
              </Text>
            </Flex>
          </Tooltip>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;
