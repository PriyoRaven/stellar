import React from "react";
import { FaPalette } from "react-icons/fa";
import { FiZap, FiMessageCircle, FiSearch, FiUpload, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { SiGooglegemini } from "react-icons/si";

const About = () => {
  const features = [
    {
      icon: SiGooglegemini,
      title: "Powered by Gemini",
      description: "Advanced AI conversations using Google's latest Gemini models"
    },
    {
      icon: FaPalette,
      title: "Dynamic Themes",
      description: "Customize your experience with a full color wheel and dark/light modes"
    },
    {
      icon: FiMessageCircle,
      title: "AI Personas",
      description: "Choose from multiple AI personalities for different conversation styles"
    },
    {
      icon: FiSearch,
      title: "Web Search",
      description: "Get real-time information with integrated web search grounding"
    },
    {
      icon: FiUpload,
      title: "File Support",
      description: "Upload images and PDFs for AI analysis and discussion"
    },
    {
      icon: FiZap,
      title: "Smart Suggestions",
      description: "Intelligent follow-up suggestions to keep conversations flowing"
    }
  ];

  return (
    <div className="flex-1 min-h-screen bg-background text-text overflow-y-auto">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-purple-500/10" />
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-primary-200 px-4 py-2 rounded-full text-sm mb-6">
            <SiGooglegemini className="text-amber-500" />
            <span>Powered by Google Generative AI</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 bg-clip-text text-transparent">
              Stellar
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-primary-300 max-w-2xl mx-auto mb-8">
            Your intelligent AI companion for meaningful conversations, creative exploration,
            and problem-solving — all wrapped in a beautiful, customizable interface.
          </p>

          <div className="flex flex-wrap gap-3 justify-center">
            <span className="px-4 py-2 bg-primary-100 rounded-full text-sm border border-primary-200">
              ✨ Multiple AI Personas
            </span>
            <span className="px-4 py-2 bg-primary-100 rounded-full text-sm border border-primary-200">
              🎨 Custom Themes
            </span>
            <span className="px-4 py-2 bg-primary-100 rounded-full text-sm border border-primary-200">
              🔍 Web Search
            </span>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">
          What makes Stellar special
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-5 sm:p-6 bg-primary-100 rounded-2xl border border-primary-200 hover:border-amber-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/5"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="text-white" size={24} />
              </div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-primary-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* About Creator */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="bg-gradient-to-br from-primary-100 to-primary-200/50 rounded-3xl p-6 sm:p-10 border border-primary-200">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <img
              src="https://github.com/PriyoRaven.png"
              alt="Priyadarsi"
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover flex-shrink-0 ring-4 ring-amber-500/30"
            />
            <div className="text-center sm:text-left">
              <h3 className="text-xl sm:text-2xl font-bold mb-2">Created by Priyadarsi</h3>
              <p className="text-primary-300 mb-4">
                Also known as <span className="text-amber-500 font-medium">Raven</span> — a passionate developer
                exploring the fascinating world of AI.
              </p>
              <p className="text-sm text-primary-300 mb-4">
                Stellar started as a learning project to master API integration and Tailwind CSS,
                and evolved each time I got a new idea. Maybe I will add more features to it later with time.
              </p>
              <div className="flex gap-3 justify-center sm:justify-start">
                <a
                  href="mailto:priyadarsi02@gmail.com"
                  className="p-2.5 bg-primary-200 hover:bg-amber-500 hover:text-white rounded-xl transition-all"
                  title="Email"
                >
                  <FiMail size={20} />
                </a>
                <a
                  href="https://github.com/PriyoRaven"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-primary-200 hover:bg-gray-800 hover:text-white rounded-xl transition-all"
                  title="GitHub"
                >
                  <FiGithub size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/in/priyadarsi-halder/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-primary-200 hover:bg-blue-600 hover:text-white rounded-xl transition-all"
                  title="LinkedIn"
                >
                  <FiLinkedin size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 pb-10">
        <h2 className="text-xl font-bold text-center mb-6">Built With</h2>
        <div className="flex flex-wrap gap-3 justify-center">
          {["React", "Vite", "Tailwind CSS", "Google Gemini API", "React Router", "React Icons", "Acer Aspire 7", "Internet", "Copilot", "Love"].map((tech) => (
            <span
              key={tech}
              className="px-4 py-2 bg-primary-100 rounded-full text-sm border border-primary-200 hover:border-amber-500/50 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
