'use client'

import { Card } from '@radix-ui/themes';
import React from 'react'

import {ResponsiveContainer, BarChart, XAxis, YAxis, Bar, Tooltip} from 'recharts'



interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueChart = ({ closed, inProgress, open }: Props) => {
  
  const data = [
    {name: "Open", value: open},
    {name: "In progress", value: inProgress},
    {name: "Closed", value: closed},
  ]

  return (
    <Card>

      <ResponsiveContainer width={"100%"} height={300} className="items-center">
        <BarChart data={data}>
          <XAxis dataKey={"name"} />
          <YAxis />
          <Tooltip/>
          <Bar
            dataKey={"value"}
            barSize={60}
            style={{ fill: "var(--accent-9)" }}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}

export default IssueChart