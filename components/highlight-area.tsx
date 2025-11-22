import { Fragment } from "react/jsx-runtime";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChartContainer } from "@/components/ui/chart";
import { Area, AreaChart } from "recharts";

const data = [
  {
    revenue: 10400,
    subscription: 40,
  },
  {
    revenue: 14405,
    subscription: 90,
  },
  {
    revenue: 9400,
    subscription: 200,
  },
  {
    revenue: 8200,
    subscription: 278,
  },
  {
    revenue: 7000,
    subscription: 89,
  },
  {
    revenue: 9600,
    subscription: 239,
  },
  {
    revenue: 11244,
    subscription: 78,
  },
  {
    revenue: 26475,
    subscription: 89,
  },
]

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--primary)",
  },
  subscription: {
    label: "Subscriptions",
    color: "var(--primary)",
  },
}

export default function HighlightArea() {
    return (
        <Fragment>
            <Card>
                <CardHeader>
                    <CardDescription>Subscriptions</CardDescription>
                    <CardTitle className="text-3xl">+2,350</CardTitle>
                    <CardDescription>+180.1% from last month</CardDescription>
                    <CardAction>
                        <Button variant="outline" size="sm">View More</Button>
                    </CardAction>
                </CardHeader>
                <CardContent className="max-h-[180px] flex-1 p-0">
                    <ChartContainer config={chartConfig} className="size-full">
                        <AreaChart
                            data={data}
                            margin={{left: 0, right: 0,}}
                        >
                            <Area
                                dataKey="subscription"
                                fill="var(--color-subscription)"
                                fillOpacity={0.05}
                                stroke="var(--color-subscription)"
                                strokeWidth={2}
                                type="monotone"
                            />
                        </AreaChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </Fragment>
    )
}