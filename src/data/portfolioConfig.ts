export const portfolioConfig = {
  name: "Muhammed Shabeeb PT",
  role: "Full Stack Developer",
  shortDescription: "I build scalable, modern and high-performance web applications using React, TypeScript, Node.js and modern backend technologies.",
  email: "ptmuhammadshabeeb@gmail.com",
  github: "https://github.com/ShabeebPT",
  linkedin: "https://www.linkedin.com/in/muhammed-shabeeb-pt",
  resume: "/CV_FILE.pdf",
};

export const skills = {
  frontend: [
    { name: "React", description: "UI Library", icon: "react" },
    { name: "TypeScript", description: "Static Typing", icon: "typescript" },
    { name: "JavaScript", description: "Language", icon: "javascript" },
    { name: "Fabric.js", description: "Canvas Library", icon: "fabric" },
    { name: "HTML5", description: "Markup", icon: "html" },
    { name: "CSS3", description: "Styling", icon: "css" },
    { name: "Tailwind CSS", description: "Utility CSS", icon: "tailwind" },
    { name: "Material UI", description: "UI Framework", icon: "mui" },
  ],
  backend: [
    { name: "Node.js", description: "Runtime", icon: "node" },
    { name: "Express.js", description: "Web Framework", icon: "express" },
    { name: "RESTful API", description: "Architecture", icon: "api" },
  ],
  database: [
    { name: "MongoDB", description: "NoSQL Database", icon: "mongodb" },
    { name: "MySQL", description: "SQL Database", icon: "mysql" },
    { name: "PostgreSQL", description: "SQL Database", icon: "postgresql" }
  ],
  tools: [
    { name: "Git", description: "Version Control", icon: "git" },
    { name: "GitHub", description: "Code Hosting", icon: "github" },
    { name: "Gitlab", description: "Code Hosting", icon: "gitlab" },
    { name: "VS Code", description: "Code Editor", icon: "vscode" },
    { name: "Postman", description: "API Testing", icon: "postman" },
  ],
  soft_skills: [
    { name: "Teamwork", description: "Teamwork", icon: "teamwork" },
    { name: "Problem Solving", description: "Problem Solving", icon: "problem-solving" },
    { name: "Communication", description: "Communication", icon: "communication" },
    { name: "Adaptability", description: "Adaptability", icon: "adaptability" },
    { name: "Time Management", description: "Time Management", icon: "time-management" },
  ],
};

export const projects = [
  {
    title: "Finance & HR Management System",
    description: "A comprehensive internal tool for managing finance, employee data, payroll, and invoice generation. Includes role-based permissions and robust reporting.",
    tech: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "JWT", "Razorpay"],
    features: [
      "Finance dashboard",
      "Employee management",
      "Payroll & Invoice management",
      "Payment processing",
      "Role-based permissions",
      "Reporting & analytics",
      "EMI Payment management",
    ],
    github: "https://github.com/ShabeebPT/Finance-Payments-System",
    image: "/hrmangement.mp4",
  },
  {
    title: "Document Management System",
    description: "A secure and efficient platform for managing documents, tracking work orders, and automating email/WhatsApp communications.",
    tech: ["React", "TypeScript", "Material UI", "Node.js", "MySQL"],
    features: [
      "Document & Invoice management",
      "Work orders & Quotations",
      "Commission management",
      "Reports & Analytics",
      "Master sections for Services, Customers, and Documents",
      "Email/WhatsApp automation"
    ],
    image: "/DocumentManagement.png",
  },
  {
    title: "Doctor Appointment Web Application",
    description: "A MERN stack-based web application that enables patients to book, manage, and track doctor appointments while allowing doctors to manage their availability and appointments.",
    tech: ["React", "Node.js", "MongoDB", "Express", "JWT", "Tailwind CSS", "Stripe"],
    features: [
      "Developed a patient appointment booking and management system using the MERN stack.",
      "Implemented user authentication and role-based access for patients and doctors.",
      "Enabled doctors to manage their availability and view scheduled appointments.",
      "Provided patients with features to book, track, and manage appointments.",
      "Implemented appointment reminders to help users stay informed about upcoming appointments."
    ],
    github: "https://github.com/zadic42/Doctor_Appointment_Web_Application",
    demo: "https://prescripto-b0fj.onrender.com",
    image: "/Animate_this_image.mp4",
  },
  {
    title: "Print Engine & Report Designer System",
    description: "Designed and developed a web-based Print Engine and Report Designer similar to Jasper iReport, enabling users to create and customize dynamic printable templates using a drag-and-drop interface.",
    tech: ["React", "Node.js", "MySQL", "Express", "Fabric.js", "Material-ui"],
    features: [
      "Developed an intuitive drag-and-drop template designer for creating customizable business documents.",
      "Implemented dynamic MySQL data binding for generating invoices, quotations, work orders, reports, labels, and other documents.",
      "Added PDF export, print preview, barcode/QR code generation, and multi-page layout support.",
      "Implemented template version management to maintain and manage different template versions.",
      "Developed RESTful APIs for template design, report generation, and user access control.",
      "Built a scalable document automation solution for flexible and efficient business reporting."
    ],
    image: "/it_is_print_engine_create_a_s.mp4",
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
