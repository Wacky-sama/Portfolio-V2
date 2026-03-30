import Header from './components/Header';
import About from './components/About';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import SocialLinks from './components/SocialLinks';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import { portfolioData } from './config/portfolio-data';

function App() {
  return (
    <div
      className="min-h-screen bg-white dark:bg-dark-bg text-black dark:text-dark-text transition-colors duration-500 ease-in-out"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <Header
          fullName={portfolioData.fullName}
          location={portfolioData.location}
          profilePicture={portfolioData.profilePicture}
          tagline={portfolioData.tagline}
        />

        <About
          tagline={portfolioData.tagline}
          about={portfolioData.about}
        />

        <TechStack techStack={portfolioData.techStack} />
        <Projects projects={portfolioData.projects} />
        <SocialLinks
          socialLinks={portfolioData.socialLinks}
          email={portfolioData.email}
        />
        <Footer />
      </div>

      <ChatWidget />
    </div>
  );
}


export default App;