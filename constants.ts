import { Project, Skill } from './types';

export const NAV_LINKS = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

export const SKILLS_DATA: Skill[] = [
  { subject: 'React/Frontend', A: 95, fullMark: 100 },
  { subject: 'Java', A: 85, fullMark: 100 },
  { subject: 'Python/AI', A: 90, fullMark: 100 },
  { subject: 'C#/.NET', A: 80, fullMark: 100 },
  { subject: 'Web Design', A: 90, fullMark: 100 },
  { subject: 'Automation', A: 85, fullMark: 100 },
];

export const PROJECTS_DATA: Project[] = [
  {
    id: 1,
    title: 'AI Automation Suite',
    description: 'A comprehensive automated workflow system using Python and n8n to streamline business processes.',
    tags: ['Python', 'AI', 'Automation'],
    image: 'https://picsum.photos/600/400?random=1',
  },
  {
    id: 2,
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution built with React and Java Spring Boot featuring real-time inventory.',
    tags: ['React', 'Java', 'Spring Boot'],
    image: 'https://picsum.photos/600/400?random=2',
  },
  {
    id: 3,
    title: 'Financial Dashboard',
    description: 'Interactive financial data visualization dashboard using C# and React.',
    tags: ['C#', 'React', 'Data Viz'],
    image: 'https://picsum.photos/600/400?random=3',
  },
  {
    id: 4,
    title: 'Modern Portfolio Template',
    description: 'A high-performance, visually stunning portfolio template for developers.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    image: 'https://picsum.photos/600/400?random=4',
  },
];

export const SYSTEM_INSTRUCTION = `
You are an AI Assistant for Md Umor's portfolio website. 🤖✨
Md Umor is a skilled Software Engineer and Web Designer with 5 years of experience. 💻🚀
📍 Location: Dhaka, Bangladesh

His skills include:
- 🗣️ Languages: Java, Python, C#, JavaScript/TypeScript, HTML, CSS.
- ⚛️ Frameworks: React, Spring Boot, .NET.
- 🧠 Specialization: AI Automation, Web Design, Full Stack Development.

Your goal is to answer visitor questions about Md Umor's background, skills, and projects in a friendly, well-structured, and enthusiastic way! 🌟
Please use emojis to make your responses engaging and warm. 😊
Keep answers concise (under 100 words) and encourage them to contact him! 📩
`;
