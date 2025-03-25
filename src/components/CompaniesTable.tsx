
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Define the company data interface
interface AICompany {
  id: number;
  name: string;
  category: string;
  city: string;
  country: string;
}

// Sample top 100 AI companies data
const aiCompaniesData: AICompany[] = [
  { id: 1, name: "OpenAI", category: "AI Research", city: "San Francisco", country: "USA" },
  { id: 2, name: "DeepMind", category: "Research & Development", city: "London", country: "UK" },
  { id: 3, name: "Anthropic", category: "AI Safety", city: "San Francisco", country: "USA" },
  { id: 4, name: "Midjourney", category: "Image Generation", city: "San Francisco", country: "USA" },
  { id: 5, name: "Scale AI", category: "Data Labeling", city: "San Francisco", country: "USA" },
  { id: 6, name: "Hugging Face", category: "Natural Language Processing", city: "New York", country: "USA" },
  { id: 7, name: "Stability AI", category: "Image Generation", city: "London", country: "UK" },
  { id: 8, name: "Cohere", category: "Natural Language Processing", city: "Toronto", country: "Canada" },
  { id: 9, name: "Synthesia", category: "Video Generation", city: "London", country: "UK" },
  { id: 10, name: "Runway", category: "Video Generation", city: "New York", country: "USA" },
  { id: 11, name: "Jasper", category: "Content Generation", city: "Austin", country: "USA" },
  { id: 12, name: "Adept", category: "AI Assistants", city: "San Francisco", country: "USA" },
  { id: 13, name: "Perplexity AI", category: "Search Engine", city: "San Francisco", country: "USA" },
  { id: 14, name: "Character.AI", category: "AI Characters", city: "Palo Alto", country: "USA" },
  { id: 15, name: "Inflection AI", category: "Personal AI", city: "Palo Alto", country: "USA" },
  { id: 16, name: "Eleven Labs", category: "Voice AI", city: "London", country: "UK" },
  { id: 17, name: "Nvidia", category: "AI Hardware", city: "Santa Clara", country: "USA" },
  { id: 18, name: "Databricks", category: "Data Processing", city: "San Francisco", country: "USA" },
  { id: 19, name: "Anthropic", category: "AI Safety", city: "San Francisco", country: "USA" },
  { id: 20, name: "Weights & Biases", category: "MLOps", city: "San Francisco", country: "USA" },
  { id: 21, name: "Replit", category: "AI Coding", city: "San Francisco", country: "USA" },
  { id: 22, name: "Notion AI", category: "Productivity", city: "San Francisco", country: "USA" },
  { id: 23, name: "Mistral AI", category: "Foundation Models", city: "Paris", country: "France" },
  { id: 24, name: "SambaNova", category: "AI Hardware", city: "Palo Alto", country: "USA" },
  { id: 25, name: "Cerebras", category: "AI Hardware", city: "Sunnyvale", country: "USA" },
  { id: 26, name: "DataRobot", category: "Machine Learning", city: "Boston", country: "USA" },
  { id: 27, name: "H2O.ai", category: "Machine Learning", city: "Mountain View", country: "USA" },
  { id: 28, name: "Dataiku", category: "Data Science", city: "New York", country: "USA" },
  { id: 29, name: "C3.ai", category: "Enterprise AI", city: "Redwood City", country: "USA" },
  { id: 30, name: "Samsara", category: "IoT & AI", city: "San Francisco", country: "USA" },
  { id: 31, name: "Anyscale", category: "Distributed Computing", city: "San Francisco", country: "USA" },
  { id: 32, name: "Snorkel AI", category: "Data Labeling", city: "Redwood City", country: "USA" },
  { id: 33, name: "Labelbox", category: "Data Labeling", city: "San Francisco", country: "USA" },
  { id: 34, name: "Rill Data", category: "Data Analytics", city: "San Francisco", country: "USA" },
  { id: 35, name: "Modal", category: "Cloud Functions", city: "San Francisco", country: "USA" },
  { id: 36, name: "Sycamore AI", category: "Computer Vision", city: "San Francisco", country: "USA" },
  { id: 37, name: "Typeface", category: "Content Generation", city: "San Francisco", country: "USA" },
  { id: 38, name: "Together AI", category: "Foundation Models", city: "San Francisco", country: "USA" },
  { id: 39, name: "Neural Magic", category: "Model Optimization", city: "Boston", country: "USA" },
  { id: 40, name: "OctoML", category: "Model Optimization", city: "Seattle", country: "USA" },
  { id: 41, name: "SingularityNET", category: "AI Marketplace", city: "Amsterdam", country: "Netherlands" },
  { id: 42, name: "Builder.ai", category: "AI Software Development", city: "London", country: "UK" },
  { id: 43, name: "Moveworks", category: "IT Support", city: "Mountain View", country: "USA" },
  { id: 44, name: "Cognition Labs", category: "AI Reasoning", city: "San Francisco", country: "USA" },
  { id: 45, name: "Claude AI", category: "AI Assistant", city: "San Francisco", country: "USA" },
  { id: 46, name: "Glean", category: "Enterprise Search", city: "Palo Alto", country: "USA" },
  { id: 47, name: "Mosaic ML", category: "Foundation Models", city: "San Francisco", country: "USA" },
  { id: 48, name: "Tome", category: "Presentation Generation", city: "San Francisco", country: "USA" },
  { id: 49, name: "Copy.ai", category: "Content Generation", city: "San Francisco", country: "USA" },
  { id: 50, name: "Vercel", category: "Web Development", city: "San Francisco", country: "USA" },
  { id: 51, name: "AssemblyAI", category: "Speech Recognition", city: "San Francisco", country: "USA" },
  { id: 52, name: "Pinecone", category: "Vector Database", city: "San Francisco", country: "USA" },
  { id: 53, name: "Weaviate", category: "Vector Database", city: "Amsterdam", country: "Netherlands" },
  { id: 54, name: "Chroma", category: "Vector Database", city: "San Francisco", country: "USA" },
  { id: 55, name: "Qdrant", category: "Vector Database", city: "Berlin", country: "Germany" },
  { id: 56, name: "LangChain", category: "AI Framework", city: "San Francisco", country: "USA" },
  { id: 57, name: "Fixie.ai", category: "AI Agents", city: "Seattle", country: "USA" },
  { id: 58, name: "Contextual AI", category: "LLM Development", city: "San Francisco", country: "USA" },
  { id: 59, name: "Eightfold AI", category: "HR & Recruitment", city: "Mountain View", country: "USA" },
  { id: 60, name: "Codeium", category: "Code Generation", city: "San Francisco", country: "USA" },
  { id: 61, name: "Sourcegraph", category: "Code Search", city: "San Francisco", country: "USA" },
  { id: 62, name: "GitLab", category: "DevOps", city: "San Francisco", country: "USA" },
  { id: 63, name: "Tabnine", category: "Code Completion", city: "Tel Aviv", country: "Israel" },
  { id: 64, name: "Kite", category: "Code Completion", city: "San Francisco", country: "USA" },
  { id: 65, name: "Pika Labs", category: "Video Generation", city: "San Francisco", country: "USA" },
  { id: 66, name: "Luma AI", category: "3D Generation", city: "San Francisco", country: "USA" },
  { id: 67, name: "Replicate", category: "AI Deployment", city: "San Francisco", country: "USA" },
  { id: 68, name: "Robust Intelligence", category: "AI Security", city: "San Francisco", country: "USA" },
  { id: 69, name: "Writer", category: "Enterprise Content", city: "San Francisco", country: "USA" },
  { id: 70, name: "Vectara", category: "Search & Retrieval", city: "Palo Alto", country: "USA" },
  { id: 71, name: "Harvey AI", category: "Legal AI", city: "Los Angeles", country: "USA" },
  { id: 72, name: "Casetext", category: "Legal Research", city: "San Francisco", country: "USA" },
  { id: 73, name: "Deep Lake AI", category: "Data Versioning", city: "San Francisco", country: "USA" },
  { id: 74, name: "Descript", category: "Audio & Video Editing", city: "San Francisco", country: "USA" },
  { id: 75, name: "Lilt", category: "Translation", city: "San Francisco", country: "USA" },
  { id: 76, name: "Deepgram", category: "Speech Recognition", city: "San Francisco", country: "USA" },
  { id: 77, name: "Rev", category: "Transcription", city: "San Francisco", country: "USA" },
  { id: 78, name: "Whisper AI", category: "Hearing Assistance", city: "San Francisco", country: "USA" },
  { id: 79, name: "Reka AI", category: "AI Research", city: "London", country: "UK" },
  { id: 80, name: "AI21 Labs", category: "Natural Language Processing", city: "Tel Aviv", country: "Israel" },
  { id: 81, name: "Quora (Poe)", category: "AI Chatbots", city: "Mountain View", country: "USA" },
  { id: 82, name: "Adobe (Firefly)", category: "Image Generation", city: "San Jose", country: "USA" },
  { id: 83, name: "Microsoft (Copilot)", category: "AI Assistants", city: "Redmond", country: "USA" },
  { id: 84, name: "Google (Gemini)", category: "Foundation Models", city: "Mountain View", country: "USA" },
  { id: 85, name: "Apple (Apple Intelligence)", category: "Mobile AI", city: "Cupertino", country: "USA" },
  { id: 86, name: "Meta AI", category: "AI Research", city: "Menlo Park", country: "USA" },
  { id: 87, name: "Tesla (Autopilot)", category: "Autonomous Driving", city: "Austin", country: "USA" },
  { id: 88, name: "IBM (Watson)", category: "Enterprise AI", city: "Armonk", country: "USA" },
  { id: 89, name: "Amazon (Alexa, Bedrock)", category: "AI Services", city: "Seattle", country: "USA" },
  { id: 90, name: "Palantir", category: "Data Analytics", city: "Denver", country: "USA" },
  { id: 91, name: "Snowflake", category: "Data Cloud", city: "Bozeman", country: "USA" },
  { id: 92, name: "ServiceNow", category: "Enterprise AI", city: "Santa Clara", country: "USA" },
  { id: 93, name: "SoftBank Robotics", category: "Robotics", city: "Tokyo", country: "Japan" },
  { id: 94, name: "Preferred Networks", category: "Deep Learning", city: "Tokyo", country: "Japan" },
  { id: 95, name: "Baidu", category: "AI Research", city: "Beijing", country: "China" },
  { id: 96, name: "Tencent", category: "AI Services", city: "Shenzhen", country: "China" },
  { id: 97, name: "Alibaba Cloud", category: "AI Cloud Services", city: "Hangzhou", country: "China" },
  { id: 98, name: "SenseTime", category: "Computer Vision", city: "Hong Kong", country: "China" },
  { id: 99, name: "Megvii", category: "Computer Vision", city: "Beijing", country: "China" },
  { id: 100, name: "Samsung Research", category: "AI Research", city: "Seoul", country: "South Korea" }
];

const CompaniesTable = () => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 25;
  const totalPages = Math.ceil(aiCompaniesData.length / itemsPerPage);
  
  // Get current items
  const indexOfLastItem = page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = aiCompaniesData.slice(indexOfFirstItem, indexOfLastItem);
  
  // Handle page change
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  
  return (
    <section id="companies" className="py-16 container-custom animate-fade-in">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold mb-4 text-white">Top 100 AI Companies</h2>
        <p className="text-foreground/70 max-w-2xl mx-auto">
          Explore the leading companies shaping the future of artificial intelligence
        </p>
      </div>
      
      <div className="glass-dark rounded-xl p-2 border border-white/5 shadow-xl overflow-hidden backdrop-blur-sm bg-black/40">
        <div className="overflow-x-auto">
          <Table>
            <TableCaption className="text-foreground/60">
              {`Showing ${indexOfFirstItem + 1}-${Math.min(indexOfLastItem, aiCompaniesData.length)} of ${aiCompaniesData.length} companies`}
            </TableCaption>
            <TableHeader>
              <TableRow className="border-white/10 hover:bg-white/5">
                <TableHead className="text-left font-semibold text-primary w-12">#</TableHead>
                <TableHead className="text-left font-semibold text-primary">Company</TableHead>
                <TableHead className="text-left font-semibold text-primary">Category</TableHead>
                <TableHead className="text-left font-semibold text-primary">City</TableHead>
                <TableHead className="text-left font-semibold text-primary">Country</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentItems.map((company) => (
                <TableRow 
                  key={company.id} 
                  className="border-white/5 hover:bg-white/5 transition-colors duration-200"
                >
                  <TableCell className="font-mono text-white/70">{company.id}</TableCell>
                  <TableCell className="font-medium text-white">{company.name}</TableCell>
                  <TableCell className="text-white/80">{company.category}</TableCell>
                  <TableCell className="text-white/80">{company.city}</TableCell>
                  <TableCell className="text-white/80">{company.country}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div className="mt-4 pb-2">
          <Pagination>
            <PaginationContent>
              {page > 1 && (
                <PaginationItem>
                  <PaginationPrevious 
                    className="text-primary hover:text-white hover:bg-primary/20 border-white/10" 
                    onClick={() => handlePageChange(page - 1)} 
                  />
                </PaginationItem>
              )}
              
              {Array.from({ length: totalPages }).map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink 
                    isActive={page === index + 1}
                    className={page === index + 1 
                      ? "bg-primary/20 text-white border-white/20" 
                      : "text-white/70 hover:text-white hover:bg-white/10 border-white/10"}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              {page < totalPages && (
                <PaginationItem>
                  <PaginationNext 
                    className="text-primary hover:text-white hover:bg-primary/20 border-white/10" 
                    onClick={() => handlePageChange(page + 1)} 
                  />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </section>
  );
};

export default CompaniesTable;
