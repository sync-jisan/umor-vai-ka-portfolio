export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  link?: string;
  image: string;
}

export interface Skill {
  subject: string;
  A: number;
  fullMark: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model' | 'assistant';
  text: string;
  timestamp: Date;
  reasoning_details?: any;
}

export enum SectionId {
  HERO = 'hero',
  ABOUT = 'about',
  SKILLS = 'skills',
  PROJECTS = 'projects',
  CONTACT = 'contact',
}
