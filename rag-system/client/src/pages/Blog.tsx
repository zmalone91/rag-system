import { useQuery } from "@tanstack/react-query";
import BlogPost from "@/components/BlogPost";
import type { BlogPost as BlogPostType } from "@shared/schema";

export default function Blog() {
  const { data: posts, isLoading } = useQuery<BlogPostType[]>({
    queryKey: ["/api/blog"]
  });

  if (isLoading) {
    return <div>Loading blog posts...</div>;
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        {posts?.map(post => (
          <BlogPost key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
