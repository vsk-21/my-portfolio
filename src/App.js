import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import {
  Home, User, Code, Briefcase, Mail, Github, Linkedin, Twitter, Download, Sun, // Removed Moon icon
  Figma, GitBranch, Database, Server, Palette, LayoutGrid,
  Laptop, Smartphone, Zap, CheckCircle, Award, Lightbulb, MessageSquare, BookOpen,
  Send, Globe
} from 'lucide-react';

/**
 * @typedef {Object} NavItem
 * @property {string} id - Unique identifier for the navigation item and section.
 * @property {string} label - Display label for the navigation item.
 * @property {React.ComponentType<any>} icon - Lucide React icon component.
 * @property {React.RefObject<HTMLElement>} ref - React ref object for the corresponding section.
 */

/**
 * @typedef {Object} Project
 * @property {string} title - Title of the project.
 * @property {string} description - Short description of the project.
 * @property {string} imageUrl - URL for the project image.
 * @property {string[]} technologies - Array of technologies used in the project.
 * @property {string} liveDemoUrl - URL for the live demo.
 * @property {string} githubRepoUrl - URL for the GitHub repository.
 */

/**
 * @typedef {Object} ExperienceItem
 * @property {string} title - Job title or role.
 * @property {string} company - Company name.
 * @property {string} duration - Employment duration (e.g., "Jan 2022 - Present").
 * @property {string[]} responsibilities - Array of key responsibilities/achievements.
 */

/**
 * @typedef {Object} EducationItem
 * @property {string} degree - Degree obtained.
 * @property {string} institution - Name of the educational institution.
 * @property {string} duration - Education duration (e.g., "2015 - 2019").
 * @property {string} description - Short description or highlights.
 */

// Mock Data (simulating data fetched from an API or service)
/** @type {Project[]} */
const mockProjects = [
  {
    title: "Enterprise CRM System",
    description: "Developed a robust CRM system using ASP.NET Core MVC, integrating with SQL Server and Azure services.",
    imageUrl: "https://placehold.co/600x400/3B82F6/FFFFFF?text=CRM+System",
    technologies: ["ASP.NET Core", "C#", "SQL Server", "Entity Framework Core", "Azure"],
    liveDemoUrl: "https://example.com/crm-demo",
    githubRepoUrl: "https://github.com/your-username/enterprise-crm",
  },
  {
    title: "Microservices E-commerce API",
    description: "Designed and implemented a scalable e-commerce backend using .NET 6 microservices, Docker, and Kubernetes.",
    imageUrl: "https://placehold.co/600x400/F97316/FFFFFF?text=E-commerce+API",
    technologies: [".NET 6", "C#", "Microservices", "Docker", "Kubernetes", "Azure DevOps"],
    liveDemoUrl: "https://example.com/ecommerce-api-demo",
    githubRepoUrl: "https://github.com/your-username/ecommerce-microservices",
  },
  {
    title: "Healthcare Data Analytics Dashboard",
    description: "Built a Blazor WebAssembly application for visualizing healthcare data, consuming RESTful APIs.",
    imageUrl: "https://placehold.co/600x400/10B981/FFFFFF?text=Analytics+Dashboard",
    technologies: ["Blazor WebAssembly", "C#", "ASP.NET Web API", "Azure SQL Database", "D3.js"],
    liveDemoUrl: "https://example.com/healthcare-dashboard-demo",
    githubRepoUrl: "https://github.com/your-username/healthcare-dashboard",
  },
];

/** @type {ExperienceItem[]} */
const mockExperience = [
 
  {
    title: ".NET Software Engineer",
    company: "Tata Consultancy Service",
    duration: "Jan 2021 - Present",
    responsibilities: [
      "Developed and maintained web applications using .NET Framework, ASP.NET MVC, and SQL Server.",
      "Participated in the full software development lifecycle, from requirements gathering to deployment.",
      "Contributed to the migration of legacy applications to .NET Core.",
      "Collaborated with cross-functional teams to define, design, and ship new features.",
      "Implemented RESTful APIs and integrated with various third-party systems and databases.",
      "Optimized database queries and application performance, resulting in a 30% reduction in response times.",
    ],
  },
];

/** @type {EducationItem[]} */
const mockEducation = [
  {
    degree: "Master of Computer Application/MCA",
    institution: "Sastra University",
    duration: "2021 - 2023",
    description: "Specialized in distributed systems and cloud computing, with a focus on Microsoft Azure technologies.",
  },
  {
    degree: "Bachelor of Computer Application/BCA",
    institution: "Marwari College , Ranchi",
    duration: "2017 - 2020",
    description: "Focused on object-oriented programming, data structures, and web development fundamentals.",
  },
];


// Reusable AnimatedSection Component
/**
 * A section component that animates its children based on scroll direction and visibility.
 * @param {Object} props
 * @param {React.ReactNode} props.children - The content to be rendered inside the section.
 * @param {string} props.id - The HTML ID for the section, used for navigation and observation.
 * @param {React.RefObject<HTMLElement>} props.sectionRef - A ref to attach to the section for Intersection Observer.
 * @param {'up' | 'down'} props.scrollDirection - The current scroll direction ('up' or 'down').
 */
const AnimatedSection = ({ children, id, sectionRef, scrollDirection }) => {
  const controls = useAnimation();
  const inView = useInView(sectionRef, { once: false, amount: 0.2 }); // Trigger when 20% of the element is visible

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, x: 0 }); // Animate to visible state
    } else {
      // If not in view, determine slide direction based on scroll
      if (scrollDirection === 'up') {
        controls.start({ opacity: 0, x: -100 }); // Slide out to the left when scrolling up
      } else {
        controls.start({ opacity: 0, x: 100 }); // Slide in from the right when scrolling down (or initially out of view below)
      }
    }
  }, [controls, inView, scrollDirection]); // Re-run effect when inView or scrollDirection changes

  return (
    <motion.section
      id={id}
      ref={sectionRef}
      initial={{ opacity: 0, x: 100 }} // Initial state for all sections (off-screen right)
      animate={controls}
      transition={{ duration: 0.6, ease: "easeOut" }} // Smooth transition
      className="py-20 border-t border-gray-200" // Removed dark:border-gray-700
    >
      {children}
    </motion.section>
  );
};

/**
 * ProjectCard Component
 * @param {Object} props
 * @param {Project} props.project - The project data to display.
 */
const ProjectCard = ({ project }) => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300"> {/* Removed dark:bg-gray-800 */}
    <img
      src={project.imageUrl}
      alt={project.title}
      className="w-full h-48 object-cover"
    />
    <div className="p-6">
      <h3 className="text-2xl font-semibold text-gray-900 mb-2">{project.title}</h3> {/* Removed dark:text-white */}
      <p className="text-gray-800 text-sm mb-4"> {/* Removed dark:text-gray-300 */}
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.technologies.map((tech, index) => (
          <span key={index} className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full"> {/* Removed dark:bg-indigo-900 dark:text-indigo-300 */}
            {tech}
          </span>
        ))}
      </div>
      <div className="flex justify-between space-x-4">
        <a
          href={project.liveDemoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white text-center py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2"
        >
          <Globe size={18} />
          <span>Live Demo</span>
        </a>
        <a
          href={project.githubRepoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 text-center py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2" // Removed dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200
        >
          <Github size={18} />
          <span>GitHub Repo</span>
        </a>
      </div>
    </div>
  </div>
);

/**
 * ExperienceTimelineItem Component
 * @param {Object} props
 * @param {ExperienceItem} props.item - The experience item data.
 * @param {React.ComponentType<any>} props.icon - Icon component for the timeline point.
 */
const ExperienceTimelineItem = ({ item, icon: Icon }) => (
  <div className="ml-10 relative">
    <div className="absolute left-[-40px] top-0 w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-white text-sm font-bold"> {/* Removed dark:bg-indigo-400 */}
      <Icon size={16} />
    </div>
    <h4 className="text-2xl font-semibold text-gray-900 mb-1">{item.title}</h4> {/* Removed dark:text-white */}
    <p className="text-indigo-600 text-lg mb-2">{item.company} | {item.duration}</p> {/* Removed dark:text-indigo-400 */}
    <ul className="list-disc list-inside text-gray-800 space-y-2"> {/* Removed dark:text-gray-300 */}
      {item.responsibilities.map((resp, index) => (
        <li key={index}>{resp}</li>
      ))}
    </ul>
  </div>
);

/**
 * EducationTimelineItem Component
 * @param {Object} props
 * @param {EducationItem} props.item - The education item data.
 * @param {React.ComponentType<any>} props.icon - Icon component for the timeline point.
 */
const EducationTimelineItem = ({ item, icon: Icon }) => (
  <div className="ml-10 relative">
    <div className="absolute left-[-40px] top-0 w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-white text-sm font-bold"> {/* Removed dark:bg-indigo-400 */}
      <Icon size={16} />
    </div>
    <h4 className="text-2xl font-semibold text-gray-900 mb-1">{item.degree}</h4> {/* Removed dark:text-white */}
    <p className="text-indigo-600 text-lg mb-2">{item.institution} | {item.duration}</p> {/* Removed dark:text-indigo-400 */}
    <p className="text-gray-800"> {/* Removed dark:text-gray-300 */}
      {item.description}
    </p>
  </div>
);


// Main App Component
const App = () => {
  // Removed isDarkMode state and setIsDarkMode setter
  const [activeSection, setActiveSection] = useState('home');
  const [scrollDirection, setScrollDirection] = useState('down');
  const lastScrollY = useRef(0);

  // State for the custom message modal
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  // Refs for each section to observe for active navigation
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const projectsRef = useRef(null);
  const experienceRef = useRef(null);
  const contactRef = useRef(null);

  // Removed toggleDarkMode function
  // Removed useEffect for dark mode class on html element

  // Effect to track scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current) {
        setScrollDirection('down');
      } else if (currentScrollY < lastScrollY.current) {
        setScrollDirection('up');
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer to highlight active navigation section
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5, // Adjust threshold as needed
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    const sections = [
      homeRef.current,
      aboutRef.current,
      skillsRef.current,
      projectsRef.current,
      experienceRef.current,
      contactRef.current,
    ];

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    // Clean up observer on component unmount
    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  // Smooth scroll to section
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Show custom modal
  const showModal = (message) => {
    setModalMessage(message);
    setShowMessageModal(true);
  };

  // Close custom modal
  const closeModal = () => {
    setShowMessageModal(false);
    setModalMessage('');
  };

  // Navigation items - Using JSDoc for type clarity
  /** @type {NavItem[]} */
  const navItems = [
    { id: 'home', label: 'Home', icon: Home, ref: homeRef },
    { id: 'about', label: 'About', icon: User, ref: aboutRef },
    { id: 'skills', label: 'Skills', icon: Code, ref: skillsRef },
    { id: 'projects', label: 'Projects', icon: Briefcase, ref: projectsRef },
    { id: 'experience', label: 'Experience', icon: Award, ref: experienceRef },
    { id: 'contact', label: 'Contact', icon: Mail, ref: contactRef },
  ];

  return (
    <div className="min-h-screen font-inter bg-gray-50 text-gray-900"> {/* Removed dark:bg-gray-900 text-gray-100 */}
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white shadow-md rounded-b-lg p-4 transition-colors duration-300"> {/* Removed dark:bg-gray-800 */}
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-indigo-600"> {/* Removed dark:text-indigo-400 */}
            Vishal Sinha
          </div>
          <div className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300
                  ${activeSection === item.id
                    ? 'bg-indigo-100 text-indigo-700 shadow-sm' // Removed dark:bg-indigo-700 dark:text-white
                    : 'text-gray-600 hover:text-indigo-600' // Removed dark:text-gray-300 dark:hover:text-indigo-400
                  }`}
              >
                <item.icon size={18} />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </div>
          {/* Removed Dark mode toggle button */}
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <AnimatedSection id="home" sectionRef={homeRef} scrollDirection={scrollDirection}>
          <div className="min-h-screen flex items-center justify-center text-center py-20">
            <div className="max-w-4xl mx-auto">
              <img
                src="profilepic.jpeg"
                alt="Profile"
                className="w-40 h-40 rounded-full mx-auto mb-6 shadow-lg border-4 border-indigo-400 transition-transform duration-500 hover:scale-105" // Removed dark:border-indigo-600
              />
              <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 leading-tight"> {/* Removed dark:text-white */}
                Hi, I'm <span className="text-indigo-600">Vishal Sinha</span> {/* Removed dark:text-indigo-400 */}
              </h1>
              <p className="text-2xl md:text-3xl font-light text-gray-800 mb-8"> {/* Removed dark:text-gray-300 */}
                A passionate Full-Stack .NET Developer crafting robust and scalable enterprise solutions.
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={() => scrollToSection('projects')}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <LayoutGrid size={20} />
                  <span>View My Work</span>
                </button>
                <a
                  href="\Resume_dotnet.pdf" // Placeholder URL
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2" // Removed dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200
                >
                  <Download size={20} />
                  <span>Download Resume</span>
                </a>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* About Me Section */}
        <AnimatedSection id="about" sectionRef={aboutRef} scrollDirection={scrollDirection}>
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">About Me</h2> {/* Removed dark:text-white */}
          <div className="flex flex-col md:flex-row items-center md:space-x-12 max-w-5xl mx-auto">
            <div className="md:w-1/3 mb-8 md:mb-0">
              <img
                src="/myphoto.png"
                alt="About Me"
                className="w-full h-auto rounded-lg shadow-xl border-4 border-indigo-400 transition-transform duration-500 hover:scale-105" // Removed dark:border-indigo-600
              />
            </div>
            <div className="md:w-2/3 text-lg leading-relaxed text-gray-800"> {/* Removed dark:text-gray-300 */}
              <p className="mb-4">
                Hello! I'm Vishal Sinha, a dedicated Full-Stack .NET Developer with over 4 years of experience in designing, developing, and deploying robust and scalable enterprise applications. My expertise spans the entire software development lifecycle, from conceptualization to production.
              </p>
              <p className="mb-4">
                I specialize in building high-performance backend services with ASP.NET Core, C#, and various database technologies like SQL Server and Azure SQL Database. I'm also proficient in modern frontend frameworks, ensuring seamless user experiences.
              </p>
              <p className="mb-4">
                I thrive in agile environments, leveraging my problem-solving skills and passion for clean architecture to deliver efficient and maintainable code. I am committed to continuous learning and staying updated with the latest advancements in the .NET ecosystem and cloud technologies, particularly Azure.
              </p>
              <div className="mt-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Key Soft Skills:</h3> {/* Removed dark:text-white */}
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <li className="flex items-center space-x-2">
                    <CheckCircle size={20} className="text-green-500" />
                    <span>Architectural Design</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle size={20} className="text-green-500" />
                    <span>Problem-Solving</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle size={20} className="text-green-500" />
                    <span>Team Leadership & Mentoring</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle size={20} className="text-green-500" />
                    <span>Agile Methodologies</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Skills Section */}
        <AnimatedSection id="skills" sectionRef={skillsRef} scrollDirection={scrollDirection}>
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">My Skills</h2> {/* Removed dark:text-white */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Backend Development Skills */}
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"> {/* Removed dark:bg-gray-800 */}
              <h3 className="text-2xl font-semibold text-indigo-600 mb-6 flex items-center space-x-3"> {/* Removed dark:text-indigo-400 */}
                <Server size={28} />
                <span>Backend Development</span>
              </h3>
              <ul className="space-y-4 text-gray-800"> {/* Removed dark:text-gray-300 */}
                <li className="flex items-center space-x-3">
                  <CheckCircle size={20} className="text-green-500" />
                  <span>C# / .NET Core / .NET Framework</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle size={20} className="text-green-500" />
                  <span>ASP.NET Core (MVC, Web API, Blazor)</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle size={20} className="text-green-500" />
                  <span>RESTful APIs / gRPC</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle size={20} className="text-green-500" />
                  <span>Microservices Architecture</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle size={20} className="text-green-500" />
                  <span>Azure Functions / Logic Apps</span>
                </li>
              </ul>
            </div>

            {/* Database & ORM Skills */}
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"> {/* Removed dark:bg-gray-800 */}
              <h3 className="text-2xl font-semibold text-indigo-600 mb-6 flex items-center space-x-3"> {/* Removed dark:text-indigo-400 */}
                <Database size={28} />
                <span>Databases & ORM</span>
              </h3>
              <ul className="space-y-4 text-gray-800"> {/* Removed dark:text-gray-300 */}
                <li className="flex items-center space-x-3">
                  <CheckCircle size={20} className="text-green-500" />
                  <span>SQL Server / Azure SQL Database</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle size={20} className="text-green-500" />
                  <span>Entity Framework Core</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle size={20} className="text-green-500" />
                  <span>Cosmos DB / NoSQL</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle size={20} className="text-green-500" />
                  <span>LINQ</span>
                </li>
              </ul>
            </div>

            {/* Cloud & DevOps Skills */}
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"> {/* Removed dark:bg-gray-800 */}
              <h3 className="text-2xl font-semibold text-indigo-600 mb-6 flex items-center space-x-3"> {/* Removed dark:text-indigo-400 */}
                <Globe size={28} />
                <span>Cloud & DevOps</span>
              </h3>
              <ul className="space-y-4 text-gray-800"> {/* Removed dark:text-gray-300 */}
                <li className="flex items-center space-x-3">
                  <CheckCircle size={20} className="text-green-500" />
                  <span>Microsoft Azure (App Services, VMs, AKS)</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle size={20} className="text-green-500" />
                  <span>Azure DevOps (Pipelines, Boards)</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle size={20} className="text-green-500" />
                  <span>Docker / Kubernetes</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle size={20} className="text-green-500" />
                  <span>Git / GitHub / Azure Repos</span>
                </li>
              </ul>
            </div>

            {/* Frontend & Other Skills (if applicable for full-stack .NET) */}
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"> {/* Removed dark:bg-gray-800 */}
              <h3 className="text-2xl font-semibold text-indigo-600 mb-6 flex items-center space-x-3"> {/* Removed dark:text-indigo-400 */}
                <Laptop size={28} />
                <span>Frontend & Other</span>
              </h3>
              <ul className="space-y-4 text-gray-800"> {/* Removed dark:text-gray-300 */}
                <li className="flex items-center space-x-3">
                  <CheckCircle size={20} className="text-green-500" />
                  <span>React.js / Blazor / Angular</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle size={20} className="text-green-500" />
                  <span>JavaScript / TypeScript</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle size={20} className="text-green-500" />
                  <span>HTML5 & CSS3 / Tailwind CSS</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle size={20} className="text-green-500" />
                  <span>Unit Testing (xUnit, NUnit)</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle size={20} className="text-green-500" />
                  <span>Design Patterns (e.g., SOLID, DI)</span>
                </li>
              </ul>
            </div>
          </div>
        </AnimatedSection>

        {/* Projects Section */}
        <AnimatedSection id="projects" sectionRef={projectsRef} scrollDirection={scrollDirection}>
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">My Projects</h2> {/* Removed dark:text-white */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {mockProjects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        </AnimatedSection>

        {/* Experience & Education Section */}
        <AnimatedSection id="experience" sectionRef={experienceRef} scrollDirection={scrollDirection}>
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Experience & Education</h2> {/* Removed dark:text-white */}
          <div className="max-w-4xl mx-auto">
            {/* Work Experience */}
            <h3 className="text-3xl font-semibold text-gray-800 mb-8 flex items-center space-x-3"> {/* Removed dark:text-white */}
              <Briefcase size={32} className="text-indigo-600" /> {/* Removed dark:text-indigo-400 */}
              <span>Work Experience</span>
            </h3>
            <div className="space-y-10 relative before:absolute before:left-3 before:h-full before:w-1 before:bg-gray-200"> {/* Removed dark:before:bg-gray-700 */}
              {mockExperience.map((item, index) => (
                <ExperienceTimelineItem key={index} item={item} icon={Zap} />
              ))}
            </div>

            {/* Education */}
            <h3 className="text-3xl font-semibold text-gray-800 mb-8 mt-16 flex items-center space-x-3"> {/* Removed dark:text-white */}
              <BookOpen size={32} className="text-indigo-600" /> {/* Removed dark:text-indigo-400 */}
              <span>Education</span>
            </h3>
            <div className="space-y-6 relative before:absolute before:left-3 before:h-full before:w-1 before:bg-gray-200"> {/* Removed dark:before:bg-gray-700 */}
              {mockEducation.map((item, index) => (
                <EducationTimelineItem key={index} item={item} icon={Lightbulb} />
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Contact Section */}
        <AnimatedSection id="contact" sectionRef={contactRef} scrollDirection={scrollDirection}>
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Get In Touch</h2> {/* Removed dark:text-white */}
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg"> {/* Removed dark:bg-gray-800 */}
            <p className="text-lg text-center text-gray-800 mb-8"> {/* Removed dark:text-gray-300 */}
              Have a question or want to work together? Feel free to reach out!
            </p>
            {/* Contact Form (UI Only) */}
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-800 text-sm font-bold mb-2"> {/* Removed dark:text-gray-300 */}
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500" // Removed dark:text-gray-200 dark:bg-gray-700 dark:border-gray-600
                  placeholder="Your Name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-800 text-sm font-bold mb-2"> {/* Removed dark:text-gray-300 */}
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500" // Removed dark:text-gray-200 dark:bg-gray-700 dark:border-gray-600
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-800 text-sm font-bold mb-2"> {/* Removed dark:text-gray-300 */}
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500" // Removed dark:text-gray-200 dark:bg-gray-700 dark:border-gray-600
                  placeholder="Your message here..."
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                onClick={(e) => {
                  e.preventDefault(); // Prevent actual form submission for UI demo
                  showModal("Message sent! (This is a UI demonstration only)");
                }}
              >
                <Send size={20} />
                <span>Send Message</span>
              </button>
            </form>

            <div className="mt-12 text-center">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Find Me On:</h3> {/* Removed dark:text-white */}
              <div className="flex justify-center space-x-6">
                <a
                  href="https://github.com/vsk-21/my-portfolio" // Placeholder URL
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-800 hover:text-indigo-600 transition-colors duration-300" // Removed dark:text-gray-300 dark:hover:text-indigo-400
                  aria-label="GitHub Profile"
                >
                  <Github size={36} />
                </a>
                <a
                  href="https://www.linkedin.com/in/vishal-sinha-39b3771b0" // Placeholder URL
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-800 hover:text-indigo-600 transition-colors duration-300" // Removed dark:text-gray-300 dark:hover:text-indigo-400
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin size={36} />
                </a>
               
              </div>
              <p className="text-gray-800 mt-8"> {/* Removed dark:text-gray-300 */}
                Email: <a href="mailto:vishalsinhadec10@gmail.com" className="text-indigo-700 hover:underline">vishalsinhadec10@gmail.com</a> {/* Removed dark:text-indigo-400 */}
              </p>
            </div>
          </div>
        </AnimatedSection>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 rounded-t-lg shadow-inner"> {/* Removed dark:bg-gray-900 */}
        <div className="container mx-auto text-center text-sm">
          <p className="text-gray-600">&copy; 2025. All rights reserved.</p> {/* Removed dark:text-gray-300 */}
          <div className="flex justify-center space-x-4 mt-4">
            {navItems.map((item) => (
              <button
                key={`footer-${item.id}`}
                onClick={() => scrollToSection(item.id)}
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </footer>

      {/* Custom Message Modal */}
      {showMessageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full text-center"> {/* Removed dark:bg-gray-800 */}
            <p className="text-gray-900 text-lg mb-6">{modalMessage}</p> {/* Removed dark:text-gray-100 */}
            <button
              onClick={closeModal}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Tailwind CSS Script - IMPORTANT: This should be in your public/index.html head or equivalent */}
      {/* <script src="https://cdn.tailwindcss.com"></script> */}
      {/* You would typically set up Tailwind via a build process (e.g., Vite, Create React App) */}
      {/* For this standalone example, imagine Tailwind is already configured. */}

      {/* Font Import - IMPORTANT: This should be in your public/index.html head or equivalent */}
      {/* <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" /> */}
      {/* For this standalone example, imagine the Inter font is already configured. */}

      {/* Custom CSS for font import and global styles */}
      <style>
        {`
        /* Ensure smooth scrolling behavior */
        html {
          scroll-behavior: smooth;
        }

        /* Basic font import for demonstration if not handled by build */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        .font-inter {
          font-family: 'Inter', sans-serif;
        }
        `}
      </style>
    </div>
  );
};

export default App;
