import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThumbsUp, Volume2 } from "lucide-react"
import { formatNumber, formatYYYYMMDDToDate } from "@/lib/utils"

interface TweetCardProps {
  author: {
    name: string
    short_name: string
    image_url?: string
  }
  content: string
  timestamp: string
  reach: number
  engagement: number
}

export default function TweetCard({ author, content, timestamp, reach, engagement }: TweetCardProps) {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={author.image_url || "/placeholder.svg"} alt={author.name} />
                        <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                            <p className="font-semibold text-sm leading-none">{author.name}</p>
                            <p className="text-muted-foreground text-sm">@{author.short_name}</p>
                        </div>
                        <p className="text-muted-foreground text-xs mt-1">{formatYYYYMMDDToDate('en-US', timestamp)}</p>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-sm leading-relaxed">{content}</p>
                <div className="flex items-center gap-6 pt-4 border-t">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Volume2 className="h-4 w-4" />
                        <span className="text-sm font-medium">{formatNumber(reach)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <ThumbsUp className="h-4 w-4" />
                        <span className="text-sm font-medium">{formatNumber(engagement)}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}