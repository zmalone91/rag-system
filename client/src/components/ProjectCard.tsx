import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, PlayCircle } from "lucide-react";
import { Link } from "wouter";
import type { Project } from "@shared/schema";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const hasLocalDemo = project.title === "End-to-End RAG System";

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex flex-col gap-2">
          <CardTitle className="line-clamp-1">{project.title}</CardTitle>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map(tech => (
              <Badge key={tech} variant="secondary">{tech}</Badge>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
        <p className="text-muted-foreground">{project.description}</p>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2">
        {/* Show local demo button for RAG system, otherwise show external demo if available */}
        {hasLocalDemo ? (
          <Button variant="default" asChild className="flex-1">
            <Link href={`/projects/demo/rag`}>
              <PlayCircle className="mr-2 h-4 w-4" />
              Try Demo
            </Link>
          </Button>
        ) : project.demoUrl && (
          <Button variant="outline" asChild className="flex-1">
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              Live Demo
            </a>
          </Button>
        )}
        {project.githubUrl && (
          <Button variant="outline" asChild className="flex-1">
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" />
              Code
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}