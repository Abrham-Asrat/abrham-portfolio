import React, { useEffect, useState, useCallback } from "react";
import { db, collection } from "../firebase";
import { getDocs } from "firebase/firestore";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
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
    "
  >
    <span className="relative z-10 flex items-center gap-2">
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
          ${
            isShowingMore
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
        <Box sx={{ p: { xs: 1, sm: 3 } }}>
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

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const techStacks = [
  { icon: "html.svg", language: "HTML" },
  { icon: "css.svg", language: "CSS" },
  { icon: "javascript.svg", language: "JavaScript" },
  { icon: "typescript.svg", language: "TypeScript" },
  { icon: "angular.svg", language: "Angular" },
  { icon: "reactjs.svg", language: "React" },
  { icon: "nodejs.svg", language: "Node.js" },
  { icon: "microsoft-sql.svg", language: "Microsoft SQL" },
  { icon: "mysql.svg", language: "MySQL" },
  { icon: "sql.svg", language: "SQL" },
  { icon: "bootstrap.svg", language: "Bootstrap" },
  { icon: "tailwind.svg", language: "Tailwind CSS" },
  { icon: "vercel.svg", language: "Vercel" },
  { icon: "csharp.svg", language: "C#" },
  { icon: "cpp.svg", language: "C++" },
  { icon: "java.svg", language: "Java" },
  { icon: "sass.svg", language: "Sass/SCSS" },
  { icon: "aspnet.svg", language: "ASP.NET" },
  { icon: "entity-framework.svg", language: "Entity Framework" },
  { icon: "rest-api.svg", language: "REST API" },
  { icon: "git.svg", language: "Git" },
  { icon: "github.svg", language: "GitHub" },
];

const sampleProjects = [
  {
    id: "1",
    Img: "/tour.png",
    Title: "Tour Guider",
    Description:
      "This website, Visit Ethiopia, serves as an online travel guide and booking platform dedicated to exploring the diverse culture, ancient history, and natural wonders of Ethiopia, the 'land of origin.'It functions as a Travel Tour Company and Concierge, offering visitors curated travel experiences and detailed packages to various destinations across the country. A featured example is the comprehensive 10-day GondarTana package,which bundles five sub-packages for a cost of $990, providing details for interested travelers. Ultimately, the site aims to be a trusted resource, allowing users to browse available trips, view a gallery of sights, and book their personalized tour directly through the platform.",
    Link: "https://visitethiopia12.netlify.app/",
    TechStack: ["React", "Node.js", "MongoDB", "Express"],
  },
  {
    id: "2",
    Img: "/doctor.png",
    Title: "Health care website",
    Description:
      "The ELIT ENT Center website, serves as the official online presence for a specialized medical facility dedicated to comprehensive Ear, Nose, and Throat (ENT) care. Led by Dr. Abiy, the center focuses on providing expert diagnosis and personalized treatment for a wide range of conditions affecting the head and neck. This includes common issues like chronic sinusitis, tonsillitis, hearing loss, and sleep apnea, as well as more complex surgical needs. The site is likely designed to inform potential patients about the center’s philosophy, the full spectrum of services offered, clinic location, and procedures for scheduling appointments. It emphasizes professional, high-quality healthcare delivered by an experienced otolaryngologist, aiming to be a trusted resource for patients seeking specialized care for their ENT health concerns.",
    Link: "https://elit-ent-center.vercel.app/",
    TechStack: ["ASP.NET Core", "SQL Server", "Angular", "Entity Framework"],
  },
  {
    id: "3",
    Img: "/bank.png",
    Title: "Bank Information Giver",
    Description:
      "This website, Bank Information Giver, promotes a new, simplified, and entirely digital banking experience. It highlights core features, including a free debit card, tools to watch your money grow, and a 100% digital platform designed for a simpler life. The bank's operations focus on ease and speed, offering instant transfers, instant loans, and the ability to instantly close your account without complications. The site encourages visitors to open a free account today and features testimonials from satisfied customers who have embraced this modern, minimalist approach to finance.",
    Link: "https://bank-information-giver.netlify.app/",
    TechStack: ["React", "Firebase", "Express"],
  },
  {
    id: "4",
    Img: "/food.png",
    Title: "Food Recipe",
    Description:
      "The website is a recipe application, likely a personal project or a learning exercise, titled Food recipe. It features a search function that encourages users to begin by looking up a recipe or ingredient to find cooking instructions and have fun. The platform includes core functionality for users to save their favorite recipes by using a 'Bookmarks' feature, which currently shows a message to find a nice recipe and bookmark it. Additionally, the site allows users to contribute their own culinary creations by providing a form to upload a new recipe, which includes fields for the title, ingredients, image URL, publisher, prep time, and servings.",
    Link: "https://myforkifyrecipes.netlify.app/",
    TechStack: ["React Native", "Node.js", "MongoDB", "Redux"],
  },
];

const sampleCertificates = [
  // {
  //   Img: "/Meta.png",
  //   Title: "Full-Stack Web Development",
  //   Issuer: "Coursera",
  //   Date: "2023",
  // },
];

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const isMobile = window.innerWidth < 768;
  const initialItems = isMobile ? 4 : 6;

  useEffect(() => {
    // Initialize AOS once
    AOS.init({
      once: false, // This will make animations occur only once
    });
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const projectCollection = collection(db, "projects");
      const certificateCollection = collection(db, "certificates");

      const [projectSnapshot, certificateSnapshot] = await Promise.all([
        getDocs(projectCollection),
        getDocs(certificateCollection),
      ]);

      const projectData = projectSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        TechStack: doc.data().TechStack || [],
      }));

      const certificateData = certificateSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Use sample data if no Firebase data is available
      const finalProjects =
        projectData.length > 0 ? projectData : sampleProjects;
      const finalCertificates =
        certificateData.length > 0 ? certificateData : sampleCertificates;

      setProjects(finalProjects);
      setCertificates(finalCertificates);

      // Store in localStorage
      localStorage.setItem("projects", JSON.stringify(finalProjects));
      localStorage.setItem("certificates", JSON.stringify(finalCertificates));
    } catch (error) {
      console.error("Error fetching data:", error);
      // Use sample data if Firebase fetch fails
      setProjects(sampleProjects);
      setCertificates(sampleCertificates);
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
      className="md:px-[10%] px-[5%] w-full sm:mt-0 mt-[3rem] bg-[#030014] overflow-hidden"
      id="Portofolio"
    >
      {/* Header section - unchanged */}
      <div
        className="text-center pb-10"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <h2 className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
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
              minHeight: "70px",
              "& .MuiTab-root": {
                fontSize: { xs: "0.9rem", md: "1rem" },
                fontWeight: "600",
                color: "#94a3b8",
                textTransform: "none",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                padding: "20px 0",
                zIndex: 1,
                margin: "8px",
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
          <div className="container mx-auto flex justify-center items-center overflow-hidden">
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
            <div className="grid grid-cols-1 md:grid-cols-3 md:gap-5 gap-4">
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
                  <Certificate ImgSertif={certificate.Img} />
                </div>
              ))}
            </div>
          </div>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={2}>
          <div className="container mx-auto flex justify-center items-center overflow-hidden pb-[5%]">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-8 gap-5">
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
