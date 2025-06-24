export interface AIModel {
  id: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  capabilities: string[];
  category: string;
  demoUrl: string;
  imageUrl: string;
  featured: boolean;
  examples?: string[];
  icon?: React.ComponentType<{ className?: string }>;
  tags?: string[];
}

// Placeholder for lucide-react icons, assuming they exist
// For actual implementation, ensure these icons are available or use appropriate ones.
import { Bot, MessageSquare, Image as ImageIcon, BarChart, Code, Zap, Brain, Settings, Search } from 'lucide-react';


export const aiModels: AIModel[] = [
  {
    id: 'behr-color-recommender',
    name: 'Behr Color Recommender',
    shortDescription: 'chatHue is an AI-powered tool that recommends paint colors based on user preferences.',
    longDescription: 'chatHue is an AI-powered tool that recommends paint colors based on user preferences, coordinating colors, and design style, helping customers visualize and choose the perfect shade.',
    capabilities: ['Text Generation', 'Translation', 'Summarization', 'Q&A'],
    category: 'Consumer Recommendations',
    demoUrl: 'https://example.com/demo/textgen-alpha',
    imageUrl: '/behr.png',
    dataAiHint: 'abstract tech',
    featured: true,
    examples: ['Write a marketing email for a new product launch.', 'Translate "Hello, world!" into French.', 'Summarize a long news article.'],
    icon: Bot,
    tags: ['Conversational AI', 'RAG', 'Business Logic']
  },
  {
    id: 'pennzoil-drive-app',
    name: 'Pennzoil Drive App',
    shortDescription: 'Drive is an AI app that maps the ideal scenic drive based on your car type.',
    longDescription: 'Drive is an AI app that maps the ideal scenic drive based on your car type, location, and preferred distance—designed to maximize driving enjoyment.',
    capabilities: ['Object Detection', 'Image Classification', 'Facial Recognition', 'OCR'],
    category: 'Brand Engagement',
    demoUrl: 'https://example.com/demo/vision-pro',
    imageUrl: '/pennzoil.png',
    dataAiHint: 'futuristic optics',
    featured: true,
    examples: ['Identify all cars in an image.', 'Classify an image as "landscape" or "portrait".', 'Extract text from a scanned document.'],
    icon: ImageIcon,
    tags: ['Guided Experience', 'Maps', 'Recommendations']
  },
  {
    id: 'google-agentspace',
    name: 'Google Agentspace',
    shortDescription: 'Google Agentspace is a platform for building and managing AI agents.',
    longDescription: 'Google Agentspace is a platform for building and managing AI agents that can reason, take actions, and collaborate across tools to automate complex business workflows.',
    capabilities: ['Code Generation', 'Code Completion', 'Bug Detection', 'Language Translation (Code)'],
    category: 'Search and Workflow Automation',
    demoUrl: 'https://vertexaisearch.cloud.google.com/home/cid/e0156442-70a0-4580-af18-39802e155be7',
    imageUrl: '/agentspace.png',
    dataAiHint: 'coding lines',
    featured: false,
    examples: ['Generate a Python function to sort a list.', 'Complete a JavaScript arrow function.', 'Translate a Java snippet to C++.'],
    icon: Code,
    tags: ['AI Search', 'AI Agent', 'Automation', 'RAG']
  },
  {
    id: 'designiq',
    name: 'DesignIQ',
    shortDescription: 'DesignIQ is an AI tool that scans and scores competitor websites.',
    longDescription: 'DesignIQ is an AI tool that scans competitor websites and scores them across five key UX/UI categories using built-in heuristic models. Each category is broken into sub-scores (1–25 scale) to highlight strengths and gaps. The output is a fast, actionable analysis that drives smarter design, product, and marketing decisions.',
    capabilities: ['Natural Language Understanding', 'Dialogue Management', 'Intent Recognition', 'API Integration'],
    category: 'Competitor Insights',
    demoUrl: 'https://example.com/demo/chatterbox-v2',
    imageUrl: '/designiq.png',
    dataAiHint: 'speech bubbles',
    featured: true,
    examples: ['Build a customer support chatbot.', 'Create a virtual assistant for scheduling.', 'Develop an FAQ bot for a website.'],
    icon: MessageSquare,
    tags: ['Machine Learning']
  },
  {
    id: 'swiftdraft',
    name: 'Swiftdraft',
    shortDescription: 'Swiftdraft is a brand-aware agent that generates blogs, website copy, images, and internal content.',
    longDescription: 'Swiftdraft is a brand-aware agent that generates blogs, website copy, images, and internal content on behalf of the customer—guided by their tone, style, and Presence Score insights.',
    capabilities: ['Pattern Recognition', 'Anomaly Detection', 'Predictive Modeling', 'Data Visualization'],
    category: 'Content Generation',
    demoUrl: 'https://swiftdraftv1.glitch.me/',
    imageUrl: '/swiftdraft.png',
    dataAiHint: 'data graph',
    featured: false,
    examples: ['Identify fraudulent transactions.', 'Predict customer churn.', 'Forecast sales trends.'],
    icon: BarChart,
    tags: ['Generative AI', 'Recommendations', 'AI Agent ']
  },
  {
    id: 'cdp-assistant',
    name: 'CDP Assistant',
    shortDescription: 'The Composable CDP Assistant is a chatbot that delivers natural language insights about users and buying groups.',
    longDescription: 'The Composable CDP Assistant is a chatbot that delivers natural language insights about users and buying groups by combining CRM data with other sources in the CDP, giving sales teams a complete view of the customer journey.',
    capabilities: ['Speech-to-Text', 'Speaker Diarization', 'Audio Sentiment Analysis', 'Voice Command Recognition'],
    category: 'Customer Insights',
    demoUrl: 'https://example.com/demo/audiomind-pro',
    imageUrl: '/cdpassistant.png',
    dataAiHint: 'sound wave',
    featured: false,
    examples: ['Transcribe a podcast episode.', 'Analyze sentiment in customer service calls.', 'Enable voice control for an application.'],
    icon: Zap, // Placeholder, consider Waveform or Mic
    tags: []
  }
];

export const getModels = (category?: string): AIModel[] => {
  if (category && category !== 'All') {
    return aiModels.filter(model => model.category === category);
  }
  return aiModels;
};

export const getModelById = (id: string): AIModel | undefined => {
  return aiModels.find(model => model.id === id);
};

export const getFeaturedModels = (): AIModel[] => {
  return aiModels.filter(model => model.featured);
};

export const getModelCategories = (): string[] => {
  const categories = new Set(aiModels.map(model => model.category));
  return ['All', ...Array.from(categories)];
};
