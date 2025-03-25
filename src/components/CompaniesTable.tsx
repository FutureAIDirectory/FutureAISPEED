
import React, { useState, useEffect } from 'react';
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
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";

// Define the company data interface
interface AICompany {
  id: number;
  name: string;
  category: string;
  city: string;
  country: string;
}

// Categories for filter
const industryCategories = [
  "All Industries",
  "AI Research",
  "Natural Language Processing",
  "Image Generation",
  "Video Generation",
  "AI Hardware",
  "Foundation Models",
  "Enterprise AI",
  "AI Cloud Services",
  "Computer Vision"
];

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
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Industries");
  const [filteredData, setFilteredData] = useState<AICompany[]>(aiCompaniesData);
  const [animateRows, setAnimateRows] = useState(false);
  
  const itemsPerPage = 10;
  
  // Filter data based on search and category
  useEffect(() => {
    let filtered = aiCompaniesData;
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(company => 
        company.name.toLowerCase().includes(query) || 
        company.category.toLowerCase().includes(query) ||
        company.city.toLowerCase().includes(query) ||
        company.country.toLowerCase().includes(query)
      );
    }
    
    // Apply category filter
    if (selectedCategory !== "All Industries") {
      filtered = filtered.filter(company => 
        company.category === selectedCategory
      );
    }
    
    setFilteredData(filtered);
    setPage(1); // Reset to first page when filters change
    
    // Trigger animation for rows
    setAnimateRows(false);
    setTimeout(() => setAnimateRows(true), 100);
  }, [searchQuery, selectedCategory]);
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  
  // Handle page change
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    setAnimateRows(false);
    setTimeout(() => setAnimateRows(true), 100);
  };
  
  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setAnimateRows(true);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const tableElement = document.getElementById('companies-table');
    if (tableElement) {
      observer.observe(tableElement);
    }
    
    return () => {
      if (tableElement) {
        observer.unobserve(tableElement);
      }
    };
  }, []);
  
  return (
    <section id="companies" className="py-16 container-custom animate-fade-in">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold mb-4 text-white space-subheader">Top 100 AI Companies</h2>
        <p className="text-foreground/70 max-w-2xl mx-auto">
          Explore the leading companies shaping the future of artificial intelligence
        </p>
      </div>
      
      {/* Filter Bar */}
      <div className="mb-6 space-y-4 sm:space-y-0 sm:flex sm:items-center sm:space-x-4 p-4 bg-gradient-to-r from-[#0B0B2A] to-[#0c162f] rounded-xl border border-white/10 shadow-[0_0_15px_rgba(6,182,212,0.15)] backdrop-blur-md">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-300/60 h-4 w-4" />
          <Input
            className="pl-10 bg-black/30 border-white/10 text-white focus:border-cyan-300/50 focus:ring-1 focus:ring-cyan-300/30 transition-all rounded-lg"
            placeholder="Search companies, categories, locations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-300/60 h-4 w-4" />
          <select
            className="pl-10 py-2 pr-4 rounded-lg bg-black/30 border border-white/10 text-white focus:border-cyan-300/50 focus:ring-1 focus:ring-cyan-300/30 transition-all appearance-none"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {industryCategories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg className="h-4 w-4 text-cyan-300/60" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
      
      <div 
        id="companies-table"
        className="glass-dark rounded-xl p-2 border border-white/20 shadow-[0_0_30px_rgba(6,182,212,0.15)] overflow-hidden backdrop-blur-sm bg-gradient-to-b from-[#0c101a] to-black/60"
      >
        <div className="overflow-x-auto">
          <Table>
            <TableCaption className="text-foreground/60">
              {filteredData.length === 0 
                ? "No matching companies found" 
                : `Showing ${indexOfFirstItem + 1}-${Math.min(indexOfLastItem, filteredData.length)} of ${filteredData.length} companies`
              }
            </TableCaption>
            <TableHeader>
              <TableRow className="border-cyan-500/20 hover:bg-white/5 transform translate-z-0 transition-all">
                <TableHead className="text-left font-bold text-cyan-300 w-12 py-5">#</TableHead>
                <TableHead className="text-left font-bold text-cyan-300">Company</TableHead>
                <TableHead className="text-left font-bold text-cyan-300">Category</TableHead>
                <TableHead className="text-left font-bold text-cyan-300">City</TableHead>
                <TableHead className="text-left font-bold text-cyan-300">Country</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentItems.map((company, index) => (
                <TableRow 
                  key={company.id} 
                  className={`company-row border-white/5 transition-all duration-300 hover:bg-gradient-to-r from-white/5 to-transparent hover:scale-[1.02] hover:shadow-[0_5px_15px_rgba(6,182,212,0.1)] ${animateRows ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  style={{ 
                    transitionDelay: `${index * 50}ms`,
                    transformStyle: 'preserve-3d',
                  }}
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
                    className="text-cyan-300 hover:text-white hover:bg-cyan-500/20 border-white/10" 
                    onClick={() => handlePageChange(page - 1)} 
                  />
                </PaginationItem>
              )}
              
              {Array.from({ length: Math.min(5, totalPages) }).map((_, index) => {
                // Show pages around the current page
                let pageNum = page;
                if (totalPages <= 5) {
                  pageNum = index + 1;
                } else if (page <= 3) {
                  pageNum = index + 1;
                } else if (page >= totalPages - 2) {
                  pageNum = totalPages - 4 + index;
                } else {
                  pageNum = page - 2 + index;
                }
                
                return (
                  <PaginationItem key={index}>
                    <PaginationLink 
                      isActive={page === pageNum}
                      className={page === pageNum 
                        ? "bg-cyan-500/20 text-white border-cyan-500/30 shadow-[0_0_10px_rgba(6,182,212,0.2)]" 
                        : "text-white/70 hover:text-white hover:bg-white/10 border-white/10"}
                      onClick={() => handlePageChange(pageNum)}
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
              
              {page < totalPages && (
                <PaginationItem>
                  <PaginationNext 
                    className="text-cyan-300 hover:text-white hover:bg-cyan-500/20 border-white/10" 
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
