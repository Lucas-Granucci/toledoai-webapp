'use client';

import { useRouter } from 'next/navigation';
import { 
  MessageSquare, 
  Upload,
  Languages,
  Users,
  GraduationCap,
  Building2,
  Github,
  Linkedin,
  Mail
} from 'lucide-react';

// Reusable Components
const Button = ({ children, onClick, variant = 'primary', size = 'md', className = '', ...props }) => {
  const baseClasses = 'font-semibold rounded-lg shadow-md transition-all duration-300 cursor-pointer flex items-center justify-center';
  const variants = {
    primary: 'bg-cyan-600 text-white hover:bg-cyan-700',
    secondary: 'bg-white text-cyan-600 border border-cyan-600 hover:bg-cyan-50',
    ghost: 'text-slate-600 hover:text-cyan-600'
  };
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-5 py-2 text-base',
    lg: 'px-8 py-4 text-lg'
  };
  
  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

const NavLink = ({ href, children }) => {
  const handleClick = (e) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const headerHeight = 80; // Approximate header height
      const targetPosition = target.offsetTop - headerHeight;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
  };

  return (
    <a 
      href={href} 
      onClick={handleClick}
      className="nav-link text-slate-600 hover:text-cyan-600 font-medium transition-colors cursor-pointer"
    >
      {children}
    </a>
  );
};

const FeatureCard = ({ icon: Icon, title, description, className = '' }) => (
  <div className={`bg-white p-8 rounded-lg border border-slate-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ${className}`}>
    <div className="bg-cyan-100 text-cyan-600 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-6">
      <Icon className="h-8 w-8" />
    </div>
    <h3 className="text-xl font-bold text-slate-800 mb-2">{title}</h3>
    <p className="text-slate-600">{description}</p>
  </div>
);

const AudienceCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white p-8 rounded-lg border border-slate-200">
    <h3 className="text-xl font-bold text-cyan-600 mb-3 flex items-center gap-2">
      <Icon className="w-6 h-6" />
      {title}
    </h3>
    <p className="text-slate-600">{description}</p>
  </div>
);

const StatDisplay = ({ number, description, source }) => (
  <div className="text-center md:text-left">
    <p className="text-6xl md:text-8xl font-extrabold text-slate-300">{number}</p>
    <p className="text-xl font-semibold text-slate-700 mt-2">{description}</p>
    {source && <p className="text-slate-500 text-sm mt-2">{source}</p>}
  </div>
);

const DeveloperCard = ({ initials, name, role, description, github, linkedin, email }) => (
  <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
    <div className="flex flex-col md:flex-row items-center gap-4">
      <div className="flex-shrink-0">
        <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full flex items-center justify-center">
          <span className="text-white text-lg font-bold">{initials}</span>
        </div>
      </div>
      
      <div className="text-center md:text-left flex-1">
        <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
          <h3 className="text-lg font-bold text-slate-900">{name}</h3>
          <div className="flex gap-2">
            {github && (
              <a href={github} target="_blank" className="text-slate-400 hover:text-slate-600 transition-colors">
                <Github className="w-4 h-4" />
              </a>
            )}
            {linkedin && (
              <a href={linkedin} target="_blank" className="text-slate-400 hover:text-slate-600 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            {email && (
              <a href={`mailto:${email}`} className="text-slate-400 hover:text-slate-600 transition-colors">
                <Mail className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
        <p className="text-cyan-600 font-medium mb-2">{role}</p>
        <p className="text-slate-600 text-sm">{description}</p>
      </div>
    </div>
  </div>
);

const SolutionCard = ({ title, description }) => (
  <div>
    <h3 className="text-2xl font-bold text-slate-800 mb-3">{title}</h3>
    <p className="text-slate-600 leading-relaxed">
      {description}
    </p>
  </div>
);

// Main Component
export default function Home() {
  const router = useRouter();

  const developers = [
    {
      initials: 'LG',
      name: 'Lucas Granucci',
      role: 'CS Student and NLP Technologist',
      description: 'Focuses on developing multilingual natural language processing technologies and agentic LLM applications',
      github: 'https://github.com/Lucas-Granucci',
      linkedin: 'https://www.linkedin.com/in/lucas-granucci/',
      email: 'lucasgranucci08@gmail.com'
    },
    {
      initials: 'TD',
      name: 'Thomas Du',
      role: 'Software Engineer',
      description: 'Works on API integration, website development, and user interface improvements. ',
      github: 'https://github.com/Skullbasher21',
      linkedin: 'https://linkedin.com/in/thomas-du-linked123/',
      email: 't2016du@gmail.com'
    }
  ];

  const goToChatbot = () => {
    router.push('/chatbot');
  };

  const features = [
    {
      icon: Upload,
      title: 'Seamless Document Upload',
      description: 'Easily upload your scientific papers and let our system handle the rest.'
    },
    {
      icon: Languages,
      title: 'High-Accuracy Translation',
      description: 'Get reliable translations that understand scientific context and terminology, powered by our specialized AI models.'
    },
    {
      icon: MessageSquare,
      title: 'Interactive Q&A',
      description: 'Go beyond static text. Ask our chatbot clarifying questions about the translated content to deepen your understanding.'
    }
  ];

  const audiences = [
    {
      icon: GraduationCap,
      title: 'Researchers & Academics',
      description: 'Access and cite papers from outside your linguistic sphere, fostering greater international collaboration and innovation.'
    },
    {
      icon: Users,
      title: 'Students & Educators',
      description: 'Break down barriers to learning with materials from around the world, making education more equitable and comprehensive.'
    },
    {
      icon: Building2,
      title: 'Industry Professionals',
      description: 'Stay on the cutting edge of R&D by understanding global scientific advancements in fields like biotech, engineering, and more.'
    }
  ];

  return (
    <div>
      {/* Header */}
      <header className="bg-slate-50/80 backdrop-blur-lg sticky top-0 z-50 border-b border-slate-200">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#" className="text-2xl font-bold text-slate-900">
            Toledo<span className="text-cyan-600">AI</span>
          </a>
          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="#problem">The Problem</NavLink>
            <NavLink href="#solution">Our Solution</NavLink>
            <NavLink href="#audience">Audience</NavLink>
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#about">About</NavLink>
          </div>
          <Button onClick={goToChatbot} className="hidden md:inline-flex">
            Launch App
          </Button>
          {/* Mobile Menu Button */}
          <button className="md:hidden text-slate-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section id="launcher" className="py-24 md:py-32 bg-white">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight mb-4">
              Scientific Translation for a <br className="hidden md:inline" /> 
              <span className="text-cyan-600">Global Audience</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-10">
              Breaking down language barriers in research. Upload documents, get accurate translations, and
              interact with scientific material in your native language.
            </p>

            {/* Chatbot Launcher */}
            <div className="max-w-2xl mx-auto bg-white p-4 rounded-xl shadow-2xl shadow-slate-200 border border-slate-200 flex items-center">
              <input 
                type="text" 
                placeholder="Translate a document or ask a question..."
                className="w-full bg-transparent text-slate-700 placeholder-slate-400 focus:outline-none text-lg px-4"
                disabled 
              />
              <Button onClick={goToChatbot} size="lg" className="flex-shrink-0">
                Launch Translator
              </Button>
            </div>
            <p className="text-sm text-slate-500 mt-4">Get started instantly, 100% free</p>
          </div>
        </section>

        {/* Problem Section */}
        <section id="problem" className="py-20 md:py-28 bg-slate-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                The Lingua Franca of Science Creates a Divide
              </h2>
              <p className="text-lg text-slate-600 mt-4 max-w-3xl mx-auto">
                English dominates academia, but this excludes a vast majority of the global population from 
                accessing and contributing to scientific progress.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="bg-white p-8 rounded-lg border border-slate-200">
                <h3 className="text-2xl font-bold text-cyan-600 mb-4">The Accessibility Gap</h3>
                <p className="text-slate-600 text-lg leading-relaxed">
                  Generic translators fail with <strong className="text-slate-800">complex, domain-specific
                  terminology</strong> found in biomedical, physics, and material science papers. This is
                  especially true for <strong className="text-slate-800">low-resource languages</strong> where
                  data is scarce, creating a systemic barrier to the democratization of knowledge.
                </p>
              </div>
              <StatDisplay 
                number="95.2%"
                description="Of the world's population are non-native English speakers, facing a barrier to scientific literature."
                source="(Source: Ethnologue, 2025)"
              />
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section id="solution" className="py-20 md:py-28 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                Our Solution: Precision Through a Hybrid Approach
              </h2>
              <p className="text-lg text-slate-600 mt-4 max-w-3xl mx-auto">
                We combine fine-tuned models with powerful APIs to deliver translations that are not just literal, 
                but contextually and scientifically accurate.
              </p>
            </div>

            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 bg-slate-50 p-8 md:p-12 rounded-xl border border-slate-200">
              <SolutionCard 
                title="Specialized Fine-Tuning"
                description={
                  <>We train our models on synthetic data for <strong className="text-slate-700">low-resource
                  languages</strong>, teaching them the specific vocabulary of scientific fields. This
                  ensures nuanced terms are translated correctly.</>
                }
              />
              <div className="border-t-2 md:border-t-0 md:border-l-2 border-slate-200 pt-8 md:pt-0 md:pl-8">
                <SolutionCard 
                  title="Interactive Engagement"
                  description={
                    <>Our chatbot interface doesn't just translate; it allows you to <strong
                    className="text-slate-700">ask questions, clarify concepts, and engage</strong> with the
                    material, turning passive reading into active learning.</>
                  }
                />
              </div>
            </div>
          </div>
        </section>

        {/* Target Audience Section */}
        <section id="audience" className="py-20 md:py-28 bg-slate-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Built For a Global Community</h2>
              <p className="text-lg text-slate-600 mt-4 max-w-3xl mx-auto">
                ToledoAI empowers anyone, anywhere, to engage with scientific research, from students to seasoned professionals.
              </p>
            </div>
            <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-10 text-left">
              {audiences.map((audience, index) => (
                <AudienceCard key={index} {...audience} />
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 md:py-28 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Powerful Features, Simple Interface</h2>
              <p className="text-lg text-slate-600 mt-4 max-w-2xl mx-auto">
                Designed for researchers, students, and professionals who need reliable scientific translations without the hassle.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 text-center">
              {features.map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </div>
          </div>
        </section>

        {/* About the Developer Section */}
        <section id="about" className="py-16 bg-slate-50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">About the Developers</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {developers.map((developer, index) => (
                  <DeveloperCard key={index} {...developer} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 text-slate-400">
        <div className="container mx-auto px-6 py-8 text-center">
          <a href="#" className="text-xl font-bold text-white">
            Toledo<span className="text-cyan-500">AI</span>
          </a>
          <p className="mt-4 text-sm">Democratizing scientific knowledge across the globe.</p>
          <p className="mt-2 text-xs">&copy; 2025 ToledoAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}