import { useQuery } from "@tanstack/react-query";
import ProjectCard from "@/components/ProjectCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Project } from "@shared/schema";

const categories = [
  "All",
  "RAG Systems",
  "MLOps",
  "LLM Fine-tuning",
  "Data Engineering"
];

export default function Projects() {
  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"]
  });

  if (isLoading) {
    return <div>Loading projects...</div>;
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Projects</h1>
      
      <Tabs defaultValue="All" className="mb-8">
        <TabsList>
          {categories.map(category => (
            <TabsTrigger key={category} value={category}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map(category => (
          <TabsContent key={category} value={category}>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects
                ?.filter(p => category === "All" || p.category === category)
                .map(project => (
                  <ProjectCard key={project.id} project={project} />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
