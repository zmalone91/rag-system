import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const experiences = [
  {
    company: "Troon Golf",
    location: "Scottsdale, AZ",
    position: "AI/ML Engineering Lead",
    period: "04/2024 – Present",
    achievements: [
      "Architected and deployed a RAG solution for automated account mappings using custom fine-tuned LLaMA2-7B models with BERT embeddings, reducing manual efforts by 70%",
      "Designed high-availability inference API serving 300+ concurrent users with 99.9% uptime and p95 latency under 200ms",
      "Implemented data lineage tracking for ML systems, enabling automated compliance reporting and model governance"
    ]
  },
  {
    company: "Amino Health",
    location: "San Francisco, CA",
    position: "Senior Data Scientist & MLOps Engineer",
    period: "03/2022 – 09/2023",
    achievements: [
      "Built production ML platform supporting 15+ models with automated retraining, monitoring, and A/B testing capabilities",
      "Scaled healthcare recommendation system to process 500M+ claims daily, reducing employer medical spend by 15%",
      "Architected modular ML pipeline in AWS SageMaker with Dagster workflows and dbt transformations"
    ]
  }
];

export default function ExperienceTimeline() {
  return (
    <div className="space-y-8">
      {experiences.map((exp, idx) => (
        <Card key={idx}>
          <CardHeader>
            <CardTitle className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold">{exp.position}</h3>
                <p className="text-muted-foreground">
                  {exp.company} • {exp.location}
                </p>
              </div>
              <span className="text-sm text-muted-foreground">{exp.period}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              {exp.achievements.map((achievement, i) => (
                <li key={i} className="text-muted-foreground">{achievement}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
