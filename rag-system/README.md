# RAG System Demo

A comprehensive implementation of a Retrieval-Augmented Generation (RAG) system, showcasing advanced AI/ML engineering capabilities. This demo is part of a larger portfolio demonstrating expertise in LLM deployment, MLOps infrastructure, and scalable data pipelines.

## Features

- **Interactive RAG Demo**: Test the system with custom queries and context
- **Educational Visualization**: Step-by-step process breakdown with technical details
- **Vector Similarity Search**: Using HNSW algorithm for efficient nearest neighbor search
- **Context Processing**: Smart text chunking and embedding generation
- **Real-time Response Generation**: Integration with OpenAI's GPT-4o model

## Technical Stack

- **Frontend**: React, TypeScript, TailwindCSS
- **Backend**: Node.js, Express
- **ML Libraries**: 
  - Xenova/transformers for BERT embeddings
  - LangChain for text splitting
  - HNSW-node for vector search
  - OpenAI API for response generation

## Architecture

The system implements a modern RAG pipeline:

1. **Context Processing**: 
   - Uses LangChain's RecursiveCharacterTextSplitter
   - Chunks size: 500 tokens
   - Overlap: 50 tokens

2. **Embedding Generation**:
   - Model: Xenova/all-MiniLM-L6-v2
   - Embedding dimension: 384
   - Pooling strategy: mean pooling

3. **Vector Search**:
   - Algorithm: HNSW (Hierarchical Navigable Small World)
   - Distance metric: L2
   - Similarity threshold: 0.5

4. **Answer Generation**:
   - Model: GPT-4o
   - Temperature: 0.7
   - Context-aware prompting

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/zmalone91/rag-system.git
   cd rag-system
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file with:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Visit `http://localhost:5000` to access the demo

## Educational Resources

The demo includes interactive elements to help understand:
- RAG architecture and implementation
- Vector embeddings and similarity search
- Context processing strategies
- The impact of context on AI responses

## Future Enhancements

- [ ] Integration with persistent vector database
- [ ] Query result caching
- [ ] Performance monitoring
- [ ] Advanced error tracking
- [ ] Extended usage examples

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
