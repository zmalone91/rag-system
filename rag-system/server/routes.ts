import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertContactSchema, ragQuerySchema } from "@shared/schema";
import { pipeline } from "@xenova/transformers";
import HNSWLib from "hnswlib-node";
import { Document } from "langchain/document";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { generateAnswer } from "./openai";

// Initialize BERT pipeline for embeddings
let embeddingPipeline: any;

async function initializePipeline() {
  embeddingPipeline = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
}

// Initialize the pipeline
initializePipeline().catch(console.error);

export async function registerRoutes(app: Express) {
  const httpServer = createServer(app);

  // Projects API - no changes
  app.get("/api/projects", (_req, res) => {
    res.json([
      {
        id: 1,
        title: "End-to-End RAG System",
        description: "Complete RAG implementation with vector DB integration and evaluation suite. Features custom fine-tuned LLaMA2 models and BERT embeddings.",
        image: "https://images.unsplash.com/photo-1496096265110-f83ad7f96608",
        category: "RAG Systems",
        demoUrl: "/projects/demo/rag",
        githubUrl: "", 
        techStack: ["Python", "LangChain", "PostgreSQL", "FastAPI"]
      },
      {
        id: 2,
        title: "MLOps Platform",
        description: "Kubernetes-based ML platform with automated testing, monitoring, and A/B testing capabilities.",
        image: "https://images.unsplash.com/photo-1542744173-05336fcc7ad4",
        category: "MLOps",
        githubUrl: "https://github.com/zmalone91/MLOps-Platform",
        techStack: ["Kubernetes", "Docker", "GitHub Actions", "Prometheus"]
      },
      {
        id: 3,
        title: "Efficient Transformers",
        description: "Implementation of adapter-based fine-tuning techniques for LLMs with comprehensive evaluation metrics and cost optimization strategies.",
        image: "https://images.unsplash.com/photo-1677442136019-21c1f48c4932",
        category: "LLM Fine-tuning",
        githubUrl: "https://github.com/zmalone91/Efficient-Transformers",
        techStack: ["PyTorch", "Transformers", "PEFT", "Weights & Biases"]
      },
      {
        id: 4,
        title: "Healthcare NLP Pipeline",
        description: "HIPAA-compliant medical text processing pipeline using fine-tuned BERT models for entity extraction and document classification.",
        image: "https://images.unsplash.com/photo-1576671081837-49000212a370",
        category: "LLM Fine-tuning",
        githubUrl: "https://github.com/zmalone91/Healthcare-NLP",
        techStack: ["Transformers", "spaCy", "scikit-learn", "Ray"]
      },
      {
        id: 5,
        title: "Streaming Data Pipeline",
        description: "Real-time data processing architecture using Azure Event Hubs, reducing data latency from hours to minutes for ML model inputs.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
        category: "Data Engineering",
        githubUrl: "https://github.com/zmalone91/streaming-pipeline",
        techStack: ["Apache Spark", "Azure Event Hubs", "Delta Lake", "Databricks"]
      },
      {
        id: 6,
        title: "Healthcare Claims ETL",
        description: "Scalable ETL pipeline processing 500M+ daily healthcare claims with automated quality checks and schema evolution handling.",
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef",
        category: "Data Engineering",
        githubUrl: "https://github.com/zmalone91/claims-etl",
        techStack: ["Apache Airflow", "dbt", "Snowflake", "Great Expectations"]
      }
    ]);
  });

  // Blog API - no changes
  app.get("/api/blog", (_req, res) => {
    res.json([
      {
        id: 1,
        title: "Scaling LLM Applications in Production",
        content: "Best practices and lessons learned from deploying large language models in production environments...",
        category: "LLMs",
        publishDate: "2024-03-01T00:00:00Z"
      },
      {
        id: 2,
        title: "Building Robust MLOps Pipelines",
        content: "A comprehensive guide to creating reliable and scalable MLOps pipelines...",
        category: "MLOps",
        publishDate: "2024-02-15T00:00:00Z"
      }
    ]);
  });

  // RAG Demo API
  app.post("/api/demos/rag/query", async (req, res) => {
    try {
      const { query, context } = ragQuerySchema.parse(req.body);

      if (!embeddingPipeline) {
        throw new Error("Model not initialized");
      }

      // Process the context if provided
      let relevantContext = "";
      if (context) {
        try {
          // Validate context
          if (context.trim().length < 10) {
            throw new Error("Context is too short to be meaningful");
          }

          // Split text into chunks
          const splitter = new RecursiveCharacterTextSplitter({
            chunkSize: 500,
            chunkOverlap: 50,
          });
          const docs = await splitter.createDocuments([context]);

          console.log("Processing chunks:", docs.length);
          const contextEmbeddings = [];

          for (const doc of docs) {
            try {
              const output = await embeddingPipeline(doc.pageContent, {
                pooling: 'mean',
                normalize: true
              });

              if (!output || !output.data) {
                console.error("Invalid embedding output for chunk");
                continue;
              }

              contextEmbeddings.push(Array.from(output.data));
            } catch (err) {
              console.error("Error processing chunk:", err);
            }
          }

          if (contextEmbeddings.length === 0) {
            throw new Error("Failed to generate embeddings for context");
          }

          console.log("Generated embeddings:", contextEmbeddings.length);

          // Get query embedding
          const queryOutput = await embeddingPipeline(query, {
            pooling: 'mean',
            normalize: true
          });

          if (!queryOutput || !queryOutput.data) {
            throw new Error("Failed to generate query embedding");
          }

          const queryEmbedding = Array.from(queryOutput.data);
          const dimension = queryEmbedding.length;

          // Create and configure HNSW index
          const index = new HNSWLib.HierarchicalNSW('l2', dimension);
          const maxElements = contextEmbeddings.length;

          index.initIndex(maxElements);

          // Add vectors to index
          for (let i = 0; i < contextEmbeddings.length; i++) {
            index.addPoint(contextEmbeddings[i], i);
          }

          // Search for nearest neighbors
          const k = Math.min(3, contextEmbeddings.length);
          const result = index.searchKnn(queryEmbedding, k);

          // Calculate similarity scores
          const similarities = result.distances.map(distance => 1 / (1 + distance));
          const threshold = 0.5; // Similarity threshold

          // Only include context chunks with high enough similarity
          relevantContext = result.neighbors
            .filter((_, idx) => similarities[idx] > threshold)
            .map((idx: number) => docs[idx].pageContent)
            .join("\n\n");

          if (!relevantContext) {
            relevantContext = "No sufficiently relevant context found for the query.";
          }

        } catch (error: any) {
          console.error("Context processing error:", error);
          throw new Error(`Failed to process context: ${error.message}`);
        }
      }

      // Generate answer using OpenAI
      const answer = await generateAnswer(query, relevantContext || "No context was provided.");
      res.json({ answer });

    } catch (error) {
      console.error("RAG Demo Error:", error);
      res.status(400).json({
        message: error instanceof Error ? error.message : "Failed to process query"
      });
    }
  });

  // Contact API - no changes
  app.post("/api/contact", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      await storage.createContact(contactData);
      res.status(200).json({ message: "Message sent successfully" });
    } catch (error) {
      res.status(400).json({ message: "Invalid request data" });
    }
  });

  return httpServer;
}