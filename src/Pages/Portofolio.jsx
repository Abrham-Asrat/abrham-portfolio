import { useEffect, useState, useCallback } from "react";
import { db, collection } from "../firebase";
import { getDocs } from "firebase/firestore";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardProject from "../components/CardProject";
import TechStackIcon from "../components/TechStackIcon";
import AOS from "aos";
import "aos/dist/aos.css";
import Certificate from "../components/Certificate";
import { Code, Award, Boxes } from "lucide-react";

// Separate ShowMore/ShowLess button component
const ToggleButton = ({ onClick, isShowingMore }) => (
  <button
    onClick={onClick}
    className="
      px-3 py-1.5
      text-slate-300 
      hover:text-white 
      text-sm 
      font-medium 
      transition-all 
      duration-300 
      ease-in-out
      flex 
      items-center 
      gap-2
      bg-[#030014]/5 
      hover:bg-[#030014]/10
      rounded-md
      border 
      border-white/10
      hover:border-white/20
      backdrop-blur-sm
      group
      relative
      overflow-hidden
      hover:scale-110
      active:scale-95
      animate-fade-in
      hover:animate-pulse-glow
    "
  >
    <span className="relative z-10 flex items-center gap-2 group-hover:animate-glow">
      {isShowingMore ? "See Less" : "See More"}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`
          transition-transform 
          duration-300 
          ${isShowingMore
            ? "group-hover:-translate-y-0.5"
            : "group-hover:translate-y-0.5"
          }
        `}
      >
        <polyline
          points={isShowingMore ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}
        ></polyline>
      </svg>
    </span>
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500/50 transition-all duration-300 group-hover:w-full"></span>
  </button>
);

ToggleButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isShowingMore: PropTypes.bool.isRequired,
};

function CustomTabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
            <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const initialTechStacks = [
  { icon: "javascript.svg", language: "JavaScript" },
  { icon: "typescript.svg", language: "TypeScript" },
  { icon: "csharp.svg", language: "C#" },
  { icon: "sql.svg", language: "SQL" },
  { icon: "angular.svg", language: "Angular" },
  { icon: "reactjs.svg", language: "React" },
  { icon: "tailwind.svg", language: "Tailwind CSS" },
  { icon: "bootstrap.svg", language: "Bootstrap" },
  { icon: "MUI.svg", language: "Material UI" },
  { icon: "framer-motion.svg", language: "Framer Motion" },
  { icon: "aspnet.svg", language: "ASP.NET Core" },
  { icon: "nodejs.svg", language: "Node.js" },
  { icon: "nodejs.svg", language: "Express" },
  { icon: "rest-api.svg", language: "RESTful APIs" },
  { icon: "socket-io.svg", language: "Socket.io" },
  { icon: "microsoft-sql.svg", language: "Microsoft SQL" },
  { icon: "postgresql.svg", language: "PostgreSQL" },
  { icon: "mysql.svg", language: "MySQL" },
  { icon: "mongodb.svg", language: "MongoDB" },
  { icon: "firebase.svg", language: "Firebase" },
  { icon: "supabase.svg", language: "Supabase" },
  { icon: "docker.svg", language: "Docker" },
  { icon: "git.svg", language: "Git" },
  { icon: "github.svg", language: "GitHub" },
  { icon: "netlify.svg", language: "Netlify" },
  { icon: "vercel.svg", language: "Vercel" },
  { icon: "cicd.svg", language: "CI/CD" },
  { icon: "jest.svg", language: "Jest" },
  { icon: "vitest.svg", language: "Vitest" },
];

const sampleProjects = [
  {
    id: "1",
    Img: "/medconnect.png",
    Title: "Med-Connect — Digital Healthcare",
    Description:
      "Med-Connect is a full-stack healthcare platform designed to connect patients with verified medical professionals through a secure, scalable system. The platform digitizes appointment scheduling, patient records, and doctor-patient communication, reducing manual administrative work in clinical workflows by an estimated 50%. It features real-time telemedicine, secure patient record management, and peer-reviewed medical insights. Engineered for performance and scalability, Med-Connect supports 10,000+ requests efficiently, making it suitable for real-world healthcare use.",
    Link: "https://med-connect-opal-eight.vercel.app/",
    Date: "Jan 2026 – Jun 2026",
    TechStack: ["Angular", "ASP.NET Core", "SQL Server", "Socket.io", "TypeScript"],
},
  {
    id: "2",
    Img: "/ahadu.png",
    Title: "Ahadu Center — Multi-Service Platform",
    Description:
      "A multi-service cultural and commercial platform serving 50+ monthly users across movie catalog, library, and e-commerce modules. It includes JWT authentication, Redux Toolkit state management, and automated Jest, Vitest, and Supertest coverage reaching 90% across core modules.",
    Link: "https://ahadu-center.vercel.app/",
    Date: "Aug 2025 – Nov 2025",
    TechStack: ["React", "Redux Toolkit", "Node.js", "Express", "MongoDB"],
  },
  {
    id: "3",
    Img: "/doctor.png",
    Title: "ELIT ENT Center — Healthcare Provider",
    Description:
      "Built a healthcare provider website and appointment booking system handling 2,000+ requests. Collaborated directly with a physician to translate clinical requirements into product features and used Angular Material to improve usability and reduce key form-submission errors by 15%.",
    Link: "https://elit-ent-center.vercel.app/",
    Date: "Jul 2026 – Sep 2026",
    TechStack: ["ASP.NET Core", "SQL Server", "Angular", "Entity Framework"],
  },
   {
    id: "4",
    Img: "/digital.png",
    Title: "Digital Hotel",
    Description:
      "**[Digital-Hotel-Menu](https://github.com/Abrham-Asrat/Digital-Hotel-Menu)** is a web-based application built with **Next.js**, **TypeScript**, **Tailwind CSS**, and **Prisma**. It replaces physical, printed hotel/restaurant menus with a digital solution, enabling customers to access an interactive QR food menu with features like dietary information and dynamic menu updates, alongside an admin management dashboard",
    Link: "https://digital-hotel-menu-six.vercel.app/",
    Date: "Jun 2026 – Sep 2026",
    TechStack: ["Next js", "Type script", "Node js", "Docker","Express"]
  },
  {
    id: "5",
    Img: "/tour.png",
    Title: "Visit Ethiopia — Tourism Website",
    Description:
      "A travel guide and booking platform that showcases Ethiopia's culture, history, natural attractions, and curated tour packages. Visitors can explore destinations, browse travel galleries, and book personalized experiences, including the 10-day Gondar-Tana package.",
    Link: "https://visitethiopia12.netlify.app/",
    TechStack: ["React", "Node.js", "MongoDB", "Express"],
  },
];

const sampleCertificates = [
  {
    Img: "/degree.jpg",
    Title: "B.Sc. in Software Engineering",
    Issuer: "Arba Minch University · CGPA 3.62 / 4.00",
    Date: "Graduated Jun 2026",
    Link: "https://smis.amu.edu.et/pages/check_graduate/NSR-033-14",
  },
  {
    Img: "/microsoft.png",
    Title: "Foundational C# with Microsoft",
    Issuer: "freeCodeCamp",
    Date: "Apr 2026",
    Link: "https://www.freecodecamp.org/certification/fcc-75e640ae-7704-4b38-a228-d50d54e5afd7/foundational-c-sharp-with-microsoft",
  },
  {
    Img: "/IBM.png",
    Title: "AI Literacy",
    Issuer: "IBM SkillsBuild",
    Date: "Jun 2026",
    Link: "https://www.credly.com/badges/9a38ef5d-8f07-40c0-a2a0-8219d30c052e",
  },
];

export default function FullWidthTabs() {
  const [value, setValue] = useState(0);
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [techStacks, setTechStacks] = useState(initialTechStacks);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const isMobile = window.innerWidth < 768;
  const initialItems = isMobile ? 4 : 6;

  useEffect(() => {
    // Initialize AOS once
    AOS.init({
      once: true,
      duration: 600,
      easing: "ease-out-cubic",
    });
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const projectSnapshot = await getDocs(collection(db, "projects")).catch(() => ({ docs: [] }));
      const certificateSnapshot = await getDocs(collection(db, "certificates")).catch(() => ({ docs: [] }));
      const techStackSnapshot = await getDocs(collection(db, "techstacks")).catch(() => ({ docs: [] }));

      const projectData = projectSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        TechStack: doc.data().TechStack || [],
      }));

      const certificateData = certificateSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const techData = techStackSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const resolvedProjects = projectData.length > 0 ? projectData : sampleProjects;
      setProjects(resolvedProjects);
      setCertificates(certificateData.length > 0 ? certificateData : sampleCertificates);
      setTechStacks(techData.length > 0 ? techData.map(t => ({ icon: t.icon, language: t.name })) : initialTechStacks);

      localStorage.setItem("projects", JSON.stringify(resolvedProjects));
      if (certificateData.length > 0) localStorage.setItem("certificates", JSON.stringify(certificateData));
    } catch (error) {
      console.error("Error in fetchData:", error);
      setProjects(sampleProjects);
      setCertificates(sampleCertificates);
      setTechStacks(initialTechStacks);
      localStorage.setItem("projects", JSON.stringify(sampleProjects));
      localStorage.setItem("certificates", JSON.stringify(sampleCertificates));
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleShowMore = useCallback((type) => {
    if (type === "projects") {
      setShowAllProjects((prev) => !prev);
    } else {
      setShowAllCertificates((prev) => !prev);
    }
  }, []);

  // Ensure we always show at least some items
  const displayedProjects = showAllProjects
    ? projects
    : projects.slice(0, Math.min(initialItems, projects.length));
  const displayedCertificates = showAllCertificates
    ? certificates
    : certificates.slice(0, Math.min(initialItems, certificates.length));

  return (
    <div
      className="px-4 sm:px-6 md:px-8 lg:px-10 xl:px-[10%] w-full sm:mt-0 mt-12 bg-[#030014] overflow-hidden"
      id="Portofolio"
    >
      {/* Header section - unchanged */}
      <div
        className="text-center pb-10"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <h2 className="inline-block text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
          <span
            style={{
              color: "#6366f1",
              backgroundImage:
                "linear-gradient(45deg, #6366f1 10%, #a855f7 93%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Full-Stack Portfolio
          </span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2">
          Explore my journey through full-stack projects, certifications, and
          technical expertise. Each section represents a milestone in my
          continuous learning path as a Full-Stack Developer.
        </p>
      </div>

      <Box sx={{ width: "100%" }}>
        {/* AppBar and Tabs section - unchanged */}
        <AppBar
          position="static"
          elevation={0}
          sx={{
            bgcolor: "transparent",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "20px",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "linear-gradient(180deg, rgba(139, 92, 246, 0.03) 0%, rgba(59, 130, 246, 0.03) 100%)",
              backdropFilter: "blur(10px)",
              zIndex: 0,
            },
          }}
          className="md:px-4"
        >
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            variant="fullWidth"
            sx={{
              minHeight: "60px",
              "& .MuiTab-root": {
                fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                fontWeight: "600",
                color: "#94a3b8",
                textTransform: "none",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                padding: "16px 0",
                zIndex: 1,
                margin: "6px",
                borderRadius: "12px",
                "&:hover": {
                  color: "#ffffff",
                  backgroundColor: "rgba(139, 92, 246, 0.1)",
                  transform: "translateY(-2px)",
                  "& .lucide": {
                    transform: "scale(1.1) rotate(5deg)",
                  },
                },
                "&.Mui-selected": {
                  color: "#fff",
                  background:
                    "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))",
                  boxShadow: "0 4px 15px -3px rgba(139, 92, 246, 0.2)",
                  "& .lucide": {
                    color: "#a78bfa",
                  },
                },
              },
              "& .MuiTabs-indicator": {
                height: 0,
              },
              "& .MuiTabs-flexContainer": {
                gap: "8px",
              },
            }}
          >
            <Tab
              icon={
                <Code className="mb-2 w-5 h-5 transition-all duration-300" />
              }
              label="Projects"
              value={0}
            />
            <Tab
              icon={
                <Award className="mb-2 w-5 h-5 transition-all duration-300" />
              }
              label="Certificates"
              value={1}
            />
            <Tab
              icon={
                <Boxes className="mb-2 w-5 h-5 transition-all duration-300" />
              }
              label="Tech Stack"
              value={2}
            />
          </Tabs>
        </AppBar>

        <CustomTabPanel value={value} index={0}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden px-2 sm:px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
              {displayedProjects.map((project, index) => (
                <div
                  key={project.id || index}
                  data-aos={
                    index % 3 === 0
                      ? "fade-up-right"
                      : index % 3 === 1
                        ? "fade-up"
                        : "fade-up-left"
                  }
                  data-aos-duration="800"
                >
                  <CardProject
                    Img={project.Img}
                    Title={project.Title}
                    Description={project.Description}
                    Link={project.Link}
                    Date={project.Date}
                    id={project.id}
                  />
                </div>
              ))}
            </div>
          </div>
          {projects.length > initialItems && (
            <div className="mt-6 w-full flex justify-start">
              <ToggleButton
                onClick={() => toggleShowMore("projects")}
                isShowingMore={showAllProjects}
              />
            </div>
          )}
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
          <div className="container mx-auto flex justify-center items-center overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
              {displayedCertificates.map((certificate, index) => (
                <div
                  key={index}
                  data-aos={
                    index % 3 === 0
                      ? "fade-up-right"
                      : index % 3 === 1
                        ? "fade-up"
                        : "fade-up-left"
                  }
                  data-aos-duration="800"
                >
                  <Certificate
                    ImgSertif={certificate.Img}
                    Title={certificate.Title}
                    Issuer={certificate.Issuer}
                    Date={certificate.Date}
                    Link={certificate.Link}
                  />
                </div>
              ))}
            </div>
          </div>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={2}>
          <div className="container mx-auto flex justify-center items-center overflow-hidden px-2 sm:px-4 pb-4 sm:pb-8 md:pb-[5%]">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
              {techStacks.map((stack, index) => (
                <div
                  key={index}
                  data-aos={
                    index % 3 === 0
                      ? "fade-up-right"
                      : index % 3 === 1
                        ? "fade-up"
                        : "fade-up-left"
                  }
                  data-aos-duration="800"
                >
                  <TechStackIcon
                    TechStackIcon={stack.icon}
                    Language={stack.language}
                  />
                </div>
              ))}
            </div>
          </div>
        </CustomTabPanel>
      </Box>
    </div>
  );
}
