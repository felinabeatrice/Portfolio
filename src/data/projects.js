import {
  SiReact,
  SiNextdotjs,
  SiJavascript,
  SiTailwindcss,
  SiCss,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
} from "react-icons/si";

const projects = [
  {
    title: "LearnHub",
    year: "2026",
    description:
      "A full-stack Learning Management System built with PostgreSQL, Express, React & Node.js for managing courses, students, and progress tracking.",
    shortDescription: "Full-stack LMS — courses, students, progress tracking.",
    tech: [
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
      { name: "Express.js", icon: SiExpress, color: "#FFFFFF" },
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
    ],
    githubUrl: "https://github.com/felinabeatrice/LMS",
    featured: true,
  },
  {
    title: "Portfolio",
    year: "2026",
    description:
      "Modern developer portfolio showcasing full-stack projects, scalable web applications, and creative UI experiences.",
    shortDescription: "Cinematic developer portfolio with modern UI.",
    tech: [
      { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "CSS", icon: SiCss, color: "#1572B6" },
    ],
    githubUrl: "https://github.com/felinabeatrice/Portfolio",
    featured: false,
  },
  {
    title: "Courier Management System",
    year: "2025",
    description:
      "A full-stack web application for managing courier bookings, shipment tracking, delivery updates, and customer records efficiently.",
    shortDescription: "Courier booking, tracking and delivery management.",
    tech: [
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
      { name: "Express.js", icon: SiExpress, color: "#FFFFFF" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
    ],
    githubUrl: null,
    featured: false,
  },
];

export default projects;