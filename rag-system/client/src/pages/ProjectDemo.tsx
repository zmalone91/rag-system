import { useParams } from "wouter";
import RagDemo from "@/components/demos/RagDemo";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function ProjectDemo() {
  const params = useParams();
  const demoType = params.type;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <Link href="/projects">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Button>
        </Link>
        <h1 className="text-4xl font-bold">
          {demoType === 'rag' ? 'RAG System Demo' : 'Project Demo'}
        </h1>
      </div>

      {demoType === 'rag' && <RagDemo />}
    </div>
  );
}
