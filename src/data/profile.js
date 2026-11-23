// Single source of truth for all content. Nothing here is invented:
// every value comes from the supplied brief.

export const profile = {
  name: "Chaitanya Vibhute",
  firstName: "Chaitanya",
  title: "Frontend Developer | React.js Developer",
  location: "Nagpur, India",
  experienceYears: "3+",
  email: "chaitanyavibhute9@gmail.com",
  phone: "+91 98343 72951",
  phoneHref: "+919834372951",
  company: "Cloud Solution Pvt. Ltd.",
  position: "Frontend Developer",
  employment: "February 2024 – Present",
  subtitle:
    "Frontend Developer with 3+ years of experience building responsive, scalable, and performance-oriented web applications.",
  linkedin: import.meta.env.VITE_LINKEDIN_URL || "",
  github: import.meta.env.VITE_GITHUB_URL || "",
  resumeUrl: "/resume.pdf", // place your resume at public/resume.pdf
  siteUrl: import.meta.env.VITE_SITE_URL || "https://YOUR-DOMAIN.com",
};

export const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Experience", to: "/experience" },
  { label: "Contact", to: "/contact" },
];

export const stats = [
  { value: 3, suffix: "+", label: "Years Experience" },
  { text: "React.js & Angular", label: "Core Frameworks" },
  { value: 25, prefix: "20–", suffix: "%", label: "Reported UI Performance Improvement", countFrom: 20 },
  { text: "Modern Web Apps", label: "Application Development" },
];

export const skillGroups = [
  {
    title: "Frontend Development",
    icon: "code",
    items: ["React.js", "Angular", "JavaScript ES6+", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap"],
  },
  {
    title: "React & UI Architecture",
    icon: "layers",
    items: ["Component-Based Architecture", "Reusable Components", "Redux", "Context API", "Responsive Web Design"],
  },
  {
    title: "Backend & APIs",
    icon: "server",
    items: ["Node.js", "Express.js", "REST APIs", "JWT Authentication", "API Validation", "Error Handling"],
  },
  {
    title: "Database & Tools",
    icon: "database",
    items: ["MongoDB", "Git", "GitHub", "Electron.js"],
  },
  {
    title: "Development Practices",
    icon: "workflow",
    items: ["Performance Optimization", "Agile Development", "Code Reviews"],
  },
];

export const education = {
  degree: "Bachelor of Computer Applications (BCA)",
  school: "Shivaji Science College, Nagpur",
  date: "June 2022",
};

export const responsibilities = [
  "Develop and maintain web applications using React.js and Angular for business workflows.",
  "Build reusable UI components to support consistent interfaces and maintainable frontend architecture.",
  "Integrate REST APIs for billing, inventory tracking, and reporting modules.",
  "Optimize component rendering and API calls, improving reported UI performance by approximately 20–25%.",
  "Implement responsive layouts for consistent usability across device sizes.",
  "Implement JWT-based authentication and authorization flows.",
  "Collaborate with backend developers on API validation and error handling.",
  "Contribute to sprint-based delivery, task tracking, and peer code reviews.",
];

export const expertise = [
  { title: "Frontend Application Development", icon: "monitor", blurb: "Business-workflow web applications built with React.js and Angular." },
  { title: "React.js Development", icon: "atom", blurb: "Component-based, reusable interfaces and maintainable architecture." },
  { title: "Angular Development", icon: "triangle", blurb: "Angular applications supporting business workflows." },
  { title: "REST API Integration", icon: "plug", blurb: "Billing, inventory tracking, and reporting modules." },
  { title: "State Management", icon: "git", blurb: "Redux and Context API for predictable application state." },
  { title: "JWT Authentication", icon: "lock", blurb: "JWT-based authentication and authorization flows." },
  { title: "Performance Optimization", icon: "gauge", blurb: "Optimized rendering and API calls, with a reported 20–25% UI improvement." },
  { title: "Responsive UI Development", icon: "smartphone", blurb: "Consistent usability across device sizes." },
];

export const careerHighlights = [
  "3+ years of professional experience.",
  "React.js and Angular development.",
  "Business workflow applications.",
  "Billing and inventory management interfaces.",
  "Reported 20–25% UI performance improvement.",
];

export const strengths = [
  "Reusable, maintainable component architecture",
  "REST API integration and JWT-based auth flows",
  "Performance-minded rendering and API usage",
  "Collaboration through sprints and peer code reviews",
];
