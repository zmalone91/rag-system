import ExperienceTimeline from "@/components/ExperienceTimeline";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";

export default function Experience() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Professional Experience</h1>
        <Button variant="outline">
          <FileDown className="mr-2 h-4 w-4" />
          Download Resume
        </Button>
      </div>
      
      <ExperienceTimeline />
    </div>
  );
}
