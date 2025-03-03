import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function Hero() {
  return (
    <div className="py-20 text-center">
      <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
        Senior AI/ML Engineer
      </h1>
      <p className="text-xl text-muted-foreground max-w-[600px] mx-auto mb-8">
        Architecture-focused engineer with 9+ years experience productionizing AI systems across healthcare and finance. Expert in LLM deployment, MLOps infrastructure, and scalable data pipelines.
      </p>
      <div className="flex justify-center gap-4">
        <Link href="/projects">
          <Button size="lg">
            View Projects
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
        <Link href="/contact">
          <Button variant="outline" size="lg">Contact Me</Button>
        </Link>
      </div>
    </div>
  );
}
