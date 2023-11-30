'use client'

import { Card } from '@radix-ui/themes';
import React from 'react'
import {ResponsiveContainer, BarChart, XAxis, YAxis, Bar} from 'recharts'


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
      <BarChart data={data} width={600} height={300}>
        {/* <BarChart /> */}
        <XAxis dataKey={"name"} />
        <YAxis />
        <Bar dataKey={"value"} barSize={60} style={{fill: 'var(--accent-9)'}} />
      </BarChart>
    </Card>
  );
}

export default IssueChart