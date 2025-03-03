import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import type { BlogPost } from "@shared/schema";

interface BlogPostProps {
  post: BlogPost;
}

export default function BlogPost({ post }: BlogPostProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start gap-4">
          <CardTitle className="line-clamp-2">{post.title}</CardTitle>
          <Badge>{post.category}</Badge>
        </div>
        <time className="text-sm text-muted-foreground">
          {format(new Date(post.publishDate), "MMM d, yyyy")}
        </time>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-muted-foreground line-clamp-4">{post.content}</p>
      </CardContent>
    </Card>
  );
}
