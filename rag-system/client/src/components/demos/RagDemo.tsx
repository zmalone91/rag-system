import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Info, Book, FileText } from "lucide-react";
import type { RagQuery } from "@shared/schema";

const steps = [
  {
    title: "Context Processing",
    description: "The input text is split into smaller chunks for efficient processing",
    technical: "Uses LangChain's RecursiveCharacterTextSplitter with chunk size of 500 and overlap of 50 tokens"
  },
  {
    title: "Embedding Generation",
    description: "Each text chunk is converted into a numerical vector representation",
    technical: "Utilizes the Xenova/all-MiniLM-L6-v2 model to generate embeddings through BERT"
  },
  {
    title: "Similarity Search",
    description: "The system finds the most relevant context pieces by comparing vector similarities",
    technical: "Implements HNSW (Hierarchical Navigable Small World) algorithm for efficient nearest neighbor search"
  },
  {
    title: "Answer Generation",
    description: "GPT generates a response based on the retrieved relevant context",
    technical: "Uses OpenAI's GPT-4o model with temperature 0.7 and context-aware prompting"
  }
];

const examples = [
  {
    title: "With Context",
    context: `The James Webb Space Telescope (JWST) is the largest optical telescope in space. Launched in December 2021, it uses infrared astronomy to observe objects up to 13.6 billion light-years away. Unlike its predecessor Hubble, JWST primarily observes infrared light, allowing it to see through cosmic dust clouds.`,
    query: "How does the James Webb telescope differ from Hubble?",
  },
  {
    title: "Without Context",
    context: "",
    query: "What are the key features of the James Webb telescope?",
  }
];

export default function RagDemo() {
  const { toast } = useToast();
  const [query, setQuery] = useState("");
  const [context, setContext] = useState("");
  const [answer, setAnswer] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [showTechnical, setShowTechnical] = useState(false);

  const mutation = useMutation({
    mutationFn: async (data: RagQuery) => {
      setCurrentStep(0); // Reset step counter
      const response = await apiRequest("POST", "/api/demos/rag/query", data);
      return response.json();
    },
    onSuccess: (data) => {
      setAnswer(data.answer);
      setCurrentStep(4); // Complete all steps
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to process query. Please try again."
      });
      setCurrentStep(0);
    }
  });

  // Simulate step progress
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const timer = setInterval(() => {
      setCurrentStep(step => {
        if (step >= 3) {
          clearInterval(timer);
          return step;
        }
        return step + 1;
      });
    }, 1000);

    mutation.mutate({ query, context });
  };

  const loadExample = (example: typeof examples[0]) => {
    setContext(example.context);
    setQuery(example.query);
  };

  return (
    <div className="space-y-6">
      {/* Instructions Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Book className="h-5 w-5" />
            Instructions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">What is RAG?</h3>
            <p className="text-muted-foreground">
              Retrieval-Augmented Generation (RAG) is a technique that enhances AI responses by providing relevant context. 
              Instead of relying solely on the AI's training data, RAG allows the model to reference specific information 
              you provide, leading to more accurate and focused answers.
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-2">How to Use This Demo</h3>
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
              <li>Start by providing some context in the "Context" field (optional)</li>
              <li>Enter your question in the "Query" field</li>
              <li>Watch the step-by-step process visualization</li>
              <li>Review the generated answer</li>
            </ol>
          </div>

          <div>
            <h3 className="font-medium mb-2">Try These Examples</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {examples.map((example, idx) => (
                <Card key={idx} className="cursor-pointer hover:bg-accent" onClick={() => loadExample(example)}>
                  <CardContent className="pt-6">
                    <h4 className="font-medium mb-2">{example.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Query: {example.query}
                    </p>
                    {example.context && (
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        Context: {example.context}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">What You'll Learn</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>How RAG processes and chunks input text</li>
              <li>How vector embeddings enable semantic search</li>
              <li>The importance of relevant context in AI responses</li>
              <li>The difference between responses with and without context</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Query Input Card */}
      <Card>
        <CardHeader>
          <CardTitle>RAG Query System</CardTitle>
          <CardDescription>
            Experience a Retrieval-Augmented Generation system in action. Input some context and ask questions about it.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Context (Optional)</label>
              <Textarea
                value={context}
                onChange={(e) => setContext(e.target.value)}
                placeholder="Enter background context..."
                className="min-h-[100px]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Query</label>
              <Textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask your question..."
                className="min-h-[100px]"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full"
              disabled={mutation.isPending || !query.trim()}
            >
              {mutation.isPending ? "Processing..." : "Submit Query"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Process Visualization */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Process Overview</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowTechnical(!showTechnical)}
            >
              <Info className="w-4 h-4 mr-2" />
              {showTechnical ? "Hide" : "Show"} Technical Details
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {steps.map((step, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center gap-4">
                  <div className={`rounded-full w-8 h-8 flex items-center justify-center border
                    ${currentStep > index ? 'bg-primary text-primary-foreground' : 
                      currentStep === index ? 'border-primary text-primary' : 
                      'border-muted text-muted-foreground'}`}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                    {showTechnical && (
                      <p className="text-sm text-muted-foreground mt-1 pl-4 border-l-2">
                        {step.technical}
                      </p>
                    )}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <Progress 
                    value={currentStep > index ? 100 : currentStep === index ? 50 : 0} 
                    className="h-1"
                  />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {answer && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Answer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap">{answer}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}