"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartData = [
  { date: "2024-07-15", running: 450, swimming: 300 },
  { date: "2024-07-16", running: 380, swimming: 420 },
  { date: "2024-07-17", running: 520, swimming: 120 },
  { date: "2024-07-18", running: 140, swimming: 550 },
  { date: "2024-07-19", running: 600, swimming: 350 },
  { date: "2024-07-20", running: 480, swimming: 400 },
]

const chartConfig = {
  running: {
    label: "Running",
    color: "var(--chart-1)",
  },
  swimming: {
    label: "Swimming",
    color: "var(--chart-2)",
  },
}

export default function BarChartComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Horizontal Bar Chart</CardTitle>
        <CardDescription>Running vs. Swimming</CardDescription>
      </CardHeader>
      <CardContent className="max-h-[310px] flex-1 p-0">
        <ChartContainer config={chartConfig} className="size-full">
          <BarChart
            data={chartData}
            layout="vertical"
            barSize={14}
            margin={{ left: 0, right: 50 }}
          >
            {/* Y-axis now holds the categories */}
            <YAxis
              dataKey="date"
              type="category"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("en-US", {
                  weekday: "short",
                })
              }
            />
            <CartesianGrid horizontal={false} vertical={true} />
            {/* X-axis now holds the numeric values */}
            <XAxis
              type="number"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "currentColor" }}
            />
            <Bar
              dataKey="running"
              fill="var(--color-running)"
              stackId="a"
            />
            <Bar
              dataKey="swimming"
              fill="var(--color-swimming)"
              radius={[0, 4, 4, 0]}
              stackId="a"
            />
            <ChartTooltip
              content={<ChartTooltipContent indicator="line" />}
              cursor={false}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}