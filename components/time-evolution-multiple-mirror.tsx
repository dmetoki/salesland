"use client"

import { useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatNumber } from "@/lib/utils";


const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  volumePositive: {
    label: "VolumePositive",
    color: "var(--chart-1)",
  },
  volumeNegative: {
    label: "VolumePositive",
    color: "var(--chart-2)",
  },
  volumeNeutral: {
    label: "VolumeNeutral",
    color: "var(--chart-3)",
  },
  reachPositive: {
    label: "VolumePositive",
    color: "var(--chart-1)",
  },
  reachNegative: {
    label: "VolumePositive",
    color: "var(--chart-2)",
  },
  reachNeutral: {
    label: "VolumeNeutral",
    color: "var(--chart-3)",
  },
}

const byDateSample = [
  {
    date: "2025-08-01",
    volume: {
      positive: 23,
      negative: 6,
      neutral: 6
    },
    reach: {
      positive: 140715,
      negative: 5779,
      neutral: 1977294
    }
  },
  {
    date: "2025-08-02",
    volume: {
      positive: 7,
      negative: 0,
      neutral: 0
    },
    reach: {
      positive: 45797,
      negative: 0,
      neutral: 0
    }
  },
  {
    date: "2025-08-03",
    volume: {
      positive: 5,
      negative: 0,
      neutral: 0
    },
    reach: {
      positive: 18989,
      negative: 0,
      neutral: 0
    }
  },
  {
    date: "2025-08-04",
    volume: {
      positive: 12,
      negative: 0,
      neutral: 0
    },
    reach: {
      positive: 425925,
      negative: 0,
      neutral: 0
    }
  },
  {
    date: "2025-08-05",
    volume: {
      positive: 26,
      negative: 1,
      neutral: 2
    },
    reach: {
      positive: 26907438,
      negative: 55,
      neutral: 3655
    }
  },
  {
    date: "2025-08-06",
    volume: {
      positive: 30,
      negative: 2,
      neutral: 0
    },
    reach: {
      positive: 650457,
      negative: 213873,
      neutral: 0
    }
  },
  {
    date: "2025-08-07",
    volume: {
      positive: 27,
      negative: 0,
      neutral: 2
    },
    reach: {
      positive: 206496,
      negative: 0,
      neutral: 44356
    }
  },
  {
    date: "2025-08-08",
    volume: {
      positive: 13,
      negative: 1,
      neutral: 6
    },
    reach: {
      positive: 547633,
      negative: 25019,
      neutral: 840
    }
  },
  {
    date: "2025-08-09",
    volume: {
      positive: 1,
      negative: 0,
      neutral: 0
    },
    reach: {
      positive: 24924,
      negative: 0,
      neutral: 0
    }
  },
  {
    date: "2025-08-10",
    volume: {
      positive: 3,
      negative: 0,
      neutral: 0
    },
    reach: {
      positive: 32257,
      negative: 0,
      neutral: 0
    }
  },
  {
    date: "2025-08-11",
    volume: {
      positive: 4,
      negative: 0,
      neutral: 0
    },
    reach: {
      positive: 147716,
      negative: 0,
      neutral: 0
    }
  },
  {
    date: "2025-08-12",
    volume: {
      positive: 20,
      negative: 0,
      neutral: 3
    },
    reach: {
      positive: 472243,
      negative: 0,
      neutral: 749113
    }
  },
  {
    date: "2025-08-13",
    volume: {
      positive: 10,
      negative: 2,
      neutral: 5
    },
    reach: {
      positive: 85947,
      negative: 4322,
      neutral: 12105
    }
  },
  {
    date: "2025-08-14",
    volume: {
      positive: 22,
      negative: 0,
      neutral: 0
    },
    reach: {
      positive: 467947,
      negative: 0,
      neutral: 0
    }
  },
  {
    date: "2025-08-15",
    volume: {
      positive: 3,
      negative: 1,
      neutral: 1
    },
    reach: {
      positive: 1680,
      negative: 352,
      neutral: 43573
    }
  },
  {
    date: "2025-08-16",
    volume: {
      positive: 2,
      negative: 0,
      neutral: 1
    },
    reach: {
      positive: 35369,
      negative: 0,
      neutral: 0
    }
  },
  {
    date: "2025-08-17",
    volume: {
      positive: 3,
      negative: 2,
      neutral: 0
    },
    reach: {
      positive: 16436,
      negative: 16738586,
      neutral: 0
    }
  },
  {
    date: "2025-08-18",
    volume: {
      positive: 9,
      negative: 0,
      neutral: 43
    },
    reach: {
      positive: 1398133,
      negative: 0,
      neutral: 2817582
    }
  },
  {
    date: "2025-08-19",
    volume: {
      positive: 8,
      negative: 7,
      neutral: 5
    },
    reach: {
      positive: 1011795,
      negative: 64983,
      neutral: 1349508
    }
  },
  {
    date: "2025-08-20",
    volume: {
      positive: 10,
      negative: 4,
      neutral: 6
    },
    reach: {
      positive: 431970,
      negative: 13117,
      neutral: 1543776
    }
  },
]

const volume = byDateSample.map(item => ({date: item.date, ...item.volume}));
const reach = byDateSample.map(item => ({date: item.date, ...item.reach}));

export default function TimeEvolutionMultipleMirror({title, description}: {title?: string, description?: string}) {
    const [timeRange, setTimeRange] = useState("90d")
    const filteredVolumeData = volume.filter((item) => {
        const date = new Date(item.date)
        const referenceDate = new Date("2025-08-01")
        let daysToSubtract = 90
        if (timeRange === "30d") {
            daysToSubtract = 30
        } else if (timeRange === "7d") {
            daysToSubtract = 7
        }
        const startDate = new Date(referenceDate)
        startDate.setDate(startDate.getDate() - daysToSubtract)
        return date >= startDate
    })
        const filteredReachData = reach.filter((item) => {
        const date = new Date(item.date)
        const referenceDate = new Date("2025-08-01")
        let daysToSubtract = 90
        if (timeRange === "30d") {
            daysToSubtract = 30
        } else if (timeRange === "7d") {
            daysToSubtract = 7
        }
        const startDate = new Date(referenceDate)
        startDate.setDate(startDate.getDate() - daysToSubtract)
        return date >= startDate
    })

    return (
        <Card>
            <CardHeader className="flex items-center gap-2 space-y-0 border-b">
                <div className="grid flex-1 gap-1">
                    {title && <CardTitle>{title}</CardTitle>}
                    {description && <CardDescription>{description}</CardDescription>}
                </div>
                <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger
                        className="w-[160px] rounded-lg cursor-pointer mr-2"
                        aria-label="Select a value"
                    >
                        <SelectValue placeholder="Last 3 months" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                        <SelectItem value="90d" className="rounded-lg cursor-pointer">Last 3 months</SelectItem>
                        <SelectItem value="30d" className="rounded-lg cursor-pointer">Last 30 days</SelectItem>
                        <SelectItem value="7d" className="rounded-lg cursor-pointer">Last 7 days</SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[150px] w-full"
                >
                    <AreaChart data={filteredVolumeData} margin={{right: 10}} syncId="mirror-chart">
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={10}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value)
                                return date.toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric"
                                })
                            }}
                        />
                        <YAxis
                            type="number"
                            orientation="right"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: "currentColor", dx: 6 }}
                            tickMargin={18} // 👈 adds space between ticks and chart
                            tickFormatter={(value) => (value === 0 ? "" : formatNumber(value))} // 👈 skip 0
                        />
                        <ChartTooltip
                            cursor={{ stroke: "currentColor", strokeWidth: 1 }} // 👈 this draws the hover line
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(value) => {
                                        return new Date(value).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric"
                                        })
                                    }}
                                    indicator="dot"
                                    className="min-w-[180px] space-x-4"
                                />
                            }
                        />
                        <Area
                            dataKey="positive"
                            type="natural"
                            fill={chartConfig.volumePositive.color}
                            fillOpacity={0.1}
                            stroke={chartConfig.volumePositive.color}
                            strokeWidth={1.5}
                            stackId="a"
                        />
                        <Area
                            dataKey="negative"
                            type="natural"
                            fillOpacity={0.1}
                            fill={chartConfig.volumeNegative.color}
                            stroke={chartConfig.volumeNegative.color}
                            strokeWidth={1.5}
                            stackId="a"
                        />
                        <Area
                            dataKey="neutral"
                            type="natural"
                            fillOpacity={0.1}
                            fill={chartConfig.volumeNeutral.color}
                            stroke={chartConfig.volumeNeutral.color}
                            strokeWidth={1.5}
                            stackId="a"
                        />
                    </AreaChart>
                </ChartContainer>
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[150px] w-full"
                >
                    <AreaChart data={filteredReachData} margin={{right: 10, top: 8}} syncId="mirror-chart">
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={10}
                            minTickGap={32}
                            tick={false}
                        />
                        <YAxis
                            reversed={true}
                            type="number"
                            orientation="right"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: "currentColor", dx: 6 }}
                            tickMargin={18} // 👈 adds space between ticks and chart
                            tickFormatter={(value) => (value === 0 ? "" : formatNumber(value))} // 👈 skip 0
                        />
                        <ChartTooltip
                            cursor={{ stroke: "currentColor", strokeWidth: 1 }} // 👈 this draws the hover line
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(value) => {
                                        return new Date(value).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric"
                                        })
                                    }}
                                    indicator="dot"
                                    className="min-w-[180px] space-x-4"
                                />
                            }
                        />
                        <Area
                            dataKey="positive"
                            type="natural"
                            fill={chartConfig.reachPositive.color}
                            fillOpacity={0.1}
                            stroke={chartConfig.reachPositive.color}
                            strokeWidth={1.5}
                            stackId="a"
                        />
                        <Area
                            dataKey="negative"
                            type="natural"
                            fill={chartConfig.reachNegative.color}
                            fillOpacity={0.1}
                            stroke={chartConfig.reachNegative.color}
                            strokeWidth={1.5}
                            stackId="a"
                        />
                        <Area
                            dataKey="neutral"
                            type="natural"
                            fill={chartConfig.reachNeutral.color}
                            fillOpacity={0.1}
                            stroke={chartConfig.reachNeutral.color}
                            strokeWidth={1.5}
                            stackId="a"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}