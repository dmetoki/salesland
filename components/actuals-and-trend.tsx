import { TrendingDown, TrendingUp } from "lucide-react";
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatNumber } from "@/lib/utils";

export default function ActualsAndTrend(
    {title, description, value, variation}
    : {title: string, description?: string, value: number, variation?: number}
) {
    return (
        <Card>
            <CardHeader>
                <CardDescription>{title}</CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">{formatNumber(value)}</CardTitle>
                <CardAction>
                    {
                        variation && (
                            <Badge variant="outline" className="flex items-center gap-1 py-1 px-3" style={{ borderColor: "hsl(var(--chart-positive))" }}>
                                {variation >= 0 ? `+ ${variation}% variation` : `${variation}% variation`}
                            </Badge>
                        )
                    }
                </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start text-sm -mt-4">
                {
                    variation && (
                            variation >= 0 ? (
                        <div className="line-clamp-1 flex gap-2 font-medium">
                            Trending up <TrendingUp className="size-4" />
                        </div>
                    ) : (
                        <div className="line-clamp-1 flex gap-2 font-medium">
                            Trending down <TrendingDown className="size-4" />
                        </div>
                    )
                    )
                }
                <div className="text-muted-foreground">{description}</div>
            </CardFooter>
        </Card>
    )
}