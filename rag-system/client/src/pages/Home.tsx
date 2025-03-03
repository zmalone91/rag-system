import Hero from "@/components/Hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SiAmazon, SiPython, SiTensorflow, SiDocker } from "react-icons/si";

const skills = [
  {
    category: "LLM Engineering",
    items: ["Fine-tuning", "RAG architectures", "Prompt engineering", "Evaluation frameworks"]
  },
  {
    category: "ML Infrastructure",
    items: ["CI/CD for ML", "Feature stores", "Model monitoring", "Distributed training"]
  },
  {
    category: "Data Engineering",
    items: ["Streaming pipelines", "Data quality", "Schema evolution", "Warehouse optimization"]
  }
];

const certifications = [
  "AWS Machine Learning Specialty Certification (2023)",
  "Microsoft Azure AI Engineer Associate (2023)",
  "DeepLearning.AI LLM Engineering Specialization (2023)"
];

export default function Home() {
  return (
    <div className="space-y-16">
      <Hero />

      <section>
        <h2 className="text-3xl font-bold mb-8">Technical Expertise</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {skills.map((skill, idx) => (
            <Card key={idx}>
              <CardHeader>
                <CardTitle>{skill.category}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2">
                  {skill.items.map((item, i) => (
                    <li key={i} className="text-muted-foreground">{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-8">Certifications</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {certifications.map((cert, idx) => (
            <Card key={idx}>
              <CardContent className="pt-6">
                <p className="text-lg">{cert}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-8">Tech Stack</h2>
        <div className="flex justify-center gap-8 text-4xl text-muted-foreground">
          <SiPython />
          <SiTensorflow />
          <SiAmazon />
          <SiDocker />
        </div>
      </section>
    </div>
  );
}