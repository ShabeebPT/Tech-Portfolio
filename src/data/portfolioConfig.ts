export const portfolioConfig = {
  name: "Muhammed Shabeeb PT",
  role: "Full Stack Developer",
  shortDescription: "I build scalable, modern and high-performance web applications using React, TypeScript, Node.js and modern backend technologies.",
  email: "ptmuhammadshabeeb@gmail.com",
  github: "https://github.com/ShabeebPT",
  linkedin: "https://www.linkedin.com/in/muhammed-shabeeb-pt",
  resume: "/resume.pdf",
};

export const skills = {
  frontend: [
    { name: "React", description: "UI Library", icon: "react" },
    { name: "TypeScript", description: "Static Typing", icon: "typescript" },
    { name: "JavaScript", description: "Language", icon: "javascript" },
    { name: "HTML5", description: "Markup", icon: "html" },
    { name: "CSS3", description: "Styling", icon: "css" },
    { name: "Tailwind CSS", description: "Utility CSS", icon: "tailwind" },
    { name: "Material UI", description: "UI Framework", icon: "mui" },
  ],
  backend: [
    { name: "Node.js", description: "Runtime", icon: "node" },
    { name: "Express.js", description: "Web Framework", icon: "express" },
    { name: "REST APIs", description: "Architecture", icon: "api" },
  ],
  database: [
    { name: "MongoDB", description: "NoSQL Database", icon: "mongodb" },
    { name: "MySQL", description: "SQL Database", icon: "mysql" },
  ],
  tools: [
    { name: "Git", description: "Version Control", icon: "git" },
    { name: "GitHub", description: "Code Hosting", icon: "github" },
    { name: "VS Code", description: "Code Editor", icon: "vscode" },
    { name: "Postman", description: "API Testing", icon: "postman" },
    { name: "Figma", description: "Design Tool", icon: "figma" },
  ],
};

export const projects = [
  {
    title: "Finance & HR Management System",
    description: "A comprehensive internal tool for managing finance, employee data, payroll, and invoice generation. Includes role-based permissions and robust reporting.",
    tech: ["React", "TypeScript", "Node.js", "Express", "MySQL", "JWT", "Razorpay"],
    features: [
      "Finance dashboard",
      "Employee management",
      "Payroll & Invoice management",
      "Payment processing",
      "Role-based permissions"
    ],
    github: "https://github.com/username/project",
    demo: "https://project-demo.com",
    image: "/project1.webp",
  },
  {
    title: "Document Management System",
    description: "A secure and efficient platform for managing documents, tracking work orders, and automating email/WhatsApp communications.",
    tech: ["React", "TypeScript", "Material UI", "Node.js", "MySQL"],
    features: [
      "Document & Invoice management",
      "Work orders & Quotations",
      "Commission management",
      "Email/WhatsApp automation"
    ],
    github: "https://github.com/username/project",
    demo: "https://project-demo.com",
    image: "/project2.webp",
  },
  {
    title: "FoodShare",
    description: "A food donation and distribution platform connecting local donors with recipients to minimize food waste and help communities.",
    tech: ["Flutter", "Dart", "Python"],
    features: [
      "Real-time location tracking",
      "Donor and recipient profiles",
      "Donation scheduling"
    ],
    github: "https://github.com/username/project",
    demo: "https://project-demo.com",
    image: "/project3.webp",
  },
  {
    title: "Violence Detection System",
    description: "A surveillance-video analysis project utilizing Deep Learning and Computer Vision for real-time detection of violent activities.",
    tech: ["Python", "Deep Learning", "Computer Vision"],
    features: [
      "Real-time video analysis",
      "High accuracy threat detection",
      "Alert generation"
    ],
    github: "https://github.com/username/project",
    demo: "https://project-demo.com",
    image: "/project4.webp",
  },
];

export const experience = [
  {
    period: "2025 — Present",
    role: "Full Stack Developer",
    company: "Wizzo Technologies",
    description: [
      "Developed responsive web applications",
      "Built REST APIs using Node.js and Express",
      "Integrated MySQL/MongoDB databases",
      "Implemented secure authentication flows",
      "Improved application performance and reduced load times"
    ],
  },
  {
    period: "2024 — 2025",
    role: "Junior Full Stack Developer",
    company: "Strokx Technologies",
    description: [
      "Developed responsive web applications",
      "Built REST APIs using Node.js and Express",
      "Integrated MySQL/MongoDB databases",
      "Implemented secure authentication flows",
      "Improved application performance and reduced load times"
    ],
  }
];

export const education = [
  {
    degree: "Internship",
    field: "Mern Stack Development",
    institution: "Techmaghi",
    period: "6 months",
  },
  {
    degree: "Bachelor of Technology",
    field: "Computer Science and Engineering",
    institution: "APJ Abdul Kalam Technological University",
    period: "2020 — 2024",
  }
];

export const services = [
  {
    title: "Frontend Development",
    description: "Modern, responsive interfaces using React, TypeScript, and modern CSS frameworks.",
    icon: "Code"
  },
  {
    title: "Backend Development",
    description: "Scalable and secure REST APIs using Node.js, Express, and modern databases.",
    icon: "Server"
  },
  {
    title: "Full Stack Applications",
    description: "End-to-end web applications, handling everything from the UI to the database architecture.",
    icon: "Layers"
  }
];
