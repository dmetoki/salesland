import { Fragment } from "react/jsx-runtime";
import TweetCard from "./tweet-card";

type PostsListProps = {
  _id: string;
  url: string;
  published: string; // e.g. "20250723"
  title: string;
  content: string;
  reach: number;
  sentiment: number;
  source_type: string;
  dimension: string;
  stakeholder: string;
  speaker: string | null;
  is_owned: boolean;
  author: {
    id: string;
    name: string;
    short_name: string;
    image_url?: string;
  };
  engagement: {
    total: number;
    num_comments: number;
    page_views: number;
    unique_visitors: number;
  }
};

export default function PostsList({ id, data }: { id: number, data: PostsListProps[] }) {
    return (
        <Fragment>
            <div className="w-full flex flex-col gap-4" key={id}>
                {
                    data.map((post, i) => (
                        <div key={i} className="w-full">
                            <TweetCard
                                author={post.author}
                                content={post.content}
                                timestamp={post?.published}
                                reach={post?.reach}
                                engagement={post.engagement?.total}
                            />
                        </div>
                    ))
                }
            </div>
        </Fragment>
    )
}