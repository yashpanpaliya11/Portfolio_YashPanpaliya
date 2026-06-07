export interface Project {
  id: string;
  title: string;
  date: string;
  shortDesc: string;
  description: string;
  tags: string[];
  features?: string[];
  challenges?: string[];
  link?: string;
  videoUrl?: string;
  images: Array<{
    url: string;
    caption: string;
  }>;
}

export const projects: Project[] = [
  {
    id: 'voice-agent',
    title: 'AI Voice Booking Agent',
    date: 'MAY 2026 - PRESENT',
    shortDesc: 'End-to-end Hindi-speaking voice AI system that automatically books appointments over a phone call.',
    description: 'Built an end-to-end Hindi-speaking voice AI system that automatically books appointments over a phone call — no human receptionist needed. The agent naturally handles conversations, checks calendar availability, confirms slots, collects user details, and logs everything to Google Sheets automatically.',
    tags: ['#ElevenLabs', '#n8n', '#Cal.com', '#Twilio'],
    features: [
      'Real-time slot availability check & auto-booking',
      'Phone call support via Twilio connection',
      'Automated Google Sheets logging for pipeline'
    ],
    challenges: [
      '"Kal/parso" date calculation managed directly by AI',
      'Proper Hindi/Hinglish numeric pronunciations',
      'Overcame TZ formatting (+05:30) & v2 API migration'
    ],
    link: 'https://drive.google.com/file/d/1sjqjjRJlOzbz4XBmJsVMqHNCFfpjDlPJ/view',
    images: [
      { url: 'https://i.ibb.co/VYQV20Z7/1780487143638.jpg', caption: 'Voice Agent Flow 1' },
      { url: 'https://i.ibb.co/BHYgTC2Z/1780487142586.jpg', caption: 'Voice Agent Flow 2' },
      { url: 'https://i.ibb.co/8DXPb5JN/1780487145898.jpg', caption: 'Voice Agent Flow 3' },
      { url: 'https://i.ibb.co/mrn9LkxK/1780487143973.jpg', caption: 'Voice Agent Flow 4' }
    ]
  },
  {
    id: 'crm-dashboard',
    title: 'CRM Dashboard',
    date: 'FEB-MAR 2026',
    shortDesc: 'Full-stack Lead Management CRM with Firebase Auth, protected routes, and real-time pipeline tracking.',
    description: 'Full-stack Lead Management CRM with Firebase Auth, protected routes, and real-time pipeline tracking. Built to streamline workflow efficiency with automated reminders and an intuitive user interface.',
    tags: ['#React', '#Firebase', '#Firestore', '#TailwindCSS'],
    features: [
      'Authentication and secure protected routes',
      'Kanban pipeline for managing prospects',
      'Responsive design for desktop and mobile'
    ],
    link: 'https://crm-gharpayy.vercel.app',
    images: [
      { url: 'https://i.ibb.co/DsC8Ssm/Screenshot-2026-05-31-at-12-58-52-AM.png', caption: 'Pipeline View' },
      { url: 'https://i.ibb.co/PKZKtKs/Screenshot-2026-05-31-at-1-04-03-AM.png', caption: 'Admin Dashboard' },
      { url: 'https://i.ibb.co/qLSgjBTP/1779904304632.jpg', caption: 'Mobile Experience' }
    ]
  },
  {
    id: 'dukaan-mate',
    title: 'Dukaan Mate',
    date: '2026',
    shortDesc: 'AI retail platform featuring voice "Rush Mode" via Gemini API and interactive dashboards.',
    description: 'AI retail platform featuring voice "Rush Mode" via Gemini API and interactive dashboards. Dukaan Mate helps retail store owners track inventory, get smart insights, and manage sales hands-free using AI.',
    tags: ['#React', '#TS', '#GeminiAPI'],
    link: 'https://dukaan-mate-final.vercel.app/#/dashboard',
    images: [
      { url: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=2670&auto=format&fit=crop', caption: 'Retail Dashboard' }
    ]
  },
  {
    id: 'whatsapp-bot',
    title: 'WhatsApp AI Bot',
    date: 'MAY 2026',
    shortDesc: 'AI-powered WhatsApp Assistant for automated ordering built with n8n and AI agents.',
    description: 'AI-powered WhatsApp Assistant for automated food ordering and customer support. Implemented real-time inventory checking, automated order tracking, MVP building with zero human intervention.',
    tags: ['#n8n', '#AI_Agents', '#Automation'],
    link: 'https://github.com/yashpanpaliya11/n8n-Restaurant',
    images: [
      { url: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?q=80&w=2670&auto=format&fit=crop', caption: 'WhatsApp Ordering' },
      { url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop', caption: 'Automation Workflows' }
    ]
  }
];
