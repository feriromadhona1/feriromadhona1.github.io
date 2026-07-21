
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Navbar from "../Navbar/index";
import { Button } from "@/components/atoms/Button/Button/index";
import ImageHoverGallery from "../ImageHoverGallery/index";
import ExperienceItem from "../ExperienceItem/index";
import ExperienceNav from "@/components/atoms/ExperienceNav/index";
import { FaWhatsapp, FaLinkedin, FaGithub, FaInstagram, FaFacebook } from "react-icons/fa";
import {
  SiLaravel,
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJira,
  SiGit,
  SiBitbucket,
  SiGo,
  SiJenkins,
} from "react-icons/si";


export default function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = document.querySelectorAll("section");
    sections.forEach((section) => observer.observe(section));

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const [selectedCompany, setSelectedCompany] = useState("RCTI+");

  const testimonials = [
    {
      name: "Alfan Junianto",
      role: "Backend Developer at RCTI+",
      message:
        "Working with Feri has been a delightful experience. He adapts quickly, pays great attention to detail, and consistently shows strong initiative.",
      avatar: `${process.env.NEXT_PUBLIC_BASE_PATH}/assets/images/alfan.png`, 
    },
    {
      name: "Sukmo Wismantoro",
      role: "Kepala Satuan Pelaksana Sistem Informasi Dinas PPKUKM DKI Jakarta",
      message:
        "Feri selalu memberikan solusi tepat waktu dan efisien. Komunikasinya sangat jelas, membuat kerja tim berjalan lancar.",
      avatar: `${process.env.NEXT_PUBLIC_BASE_PATH}/assets/images/sukmo.png`,
    },
    {
      name: "Dimas Prasetyo",
      role: "Frontend Engineer at Danamon",
      message:
        "Selain teknikal yang kuat, Feri juga punya jiwa kolaboratif tinggi. Sangat direkomendasikan untuk project besar.",
      avatar: `${process.env.NEXT_PUBLIC_BASE_PATH}/images/dimas.jpg`,
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-sky-50 text-gray-800 px-4 py-8 space-y-20 relative dark:from-gray-900 dark:to-gray-800 dark:text-white">
      {/* Navbar */}
      <Navbar activeSection={activeSection} />

      {/* Hero Section */}
      <motion.section
        id="home"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="pt-32 text-center space-y-4"
        >
        <div className="w-[200px] h-[200px] mx-auto rounded-full overflow-hidden shadow-md">
            <Image
            src={`${process.env.NEXT_PUBLIC_BASE_PATH}/assets/images/feri-romadhona.jpg`}
            alt="Feri Romadhona"
            width={200}
            height={200}
            className="object-cover"
            />
        </div>
        <h1 className="text-4xl font-bold text-sky-600">Feri Romadhona, S.Si</h1>
        <p className="text-lg max-w-xl mx-auto">
            Frontend Developer with a passion for crafting beautiful and functional web applications.
        </p>
     </motion.section>


      {/* About Section */}
      <motion.section
        id="about"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full bg-gradient-to-br from-white via-sky-50 to-sky-100 py-16"
        >
      <div className="max-w-4xl mx-auto px-6 text-justify space-y-6">
        <h2 className="text-3xl font-bold text-sky-600 text-center">About Me</h2>
        <div className="text-base leading-relaxed text-gray-700 dark:text-gray-300 space-y-4">
          <p>
            I am a passionate and adaptable IT professional currently working at <strong>RCTI+</strong>,
            where I manage and develop the RCTI+ application across Web Desktop (WebD) and Web Mobile (WebM) platforms.
            The application serves multiple content pillars and handles up to 2 million viewers, requiring high scalability, performance, and stability.
          </p>
          <p>
            My technical expertise includes modern frontend and backend technologies such as <strong>React.js</strong>, <strong>Next.js</strong>,
            <strong>TypeScript</strong>, and <strong>Golang</strong>, enabling me to build efficient, modular, and maintainable systems.
            My background also includes experience with core web standards and backend development, supported by solid knowledge of
            JavaScript (ES6+), TypeScript, PHP, and Java, as well as MySQL, PostgreSQL, and Oracle for database management.
          </p>
          <p>
            In addition to hands-on development, I bring value through my background in <strong>Information Systems and IT Management</strong>,
            with proven skills in business analysis, system analysis, and solution design.
            I am also known for my ability to communicate effectively and collaborate well within a team, which helps ensure smooth project execution and shared success.
          </p>
        </div>

        <ImageHoverGallery />
      </div>

      </motion.section>

      <motion.section id="experience" className="relative py-8 px-4 sm:px-8">
        <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-sky-600">Experience</h2>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar navigation */}
            <div className="w-full lg:w-1/3 px-2 sm:px-4 lg:pl-40">
            <ExperienceNav onSelect={setSelectedCompany} />
            </div>

            {/* Experience detail */}
            <div className="lg:w-2/3">
            <ExperienceItem company={selectedCompany} />
            </div>
        </div>
        <div className="flex flex-wrap justify-center gap-4 items-center mt-4">
          <SiLaravel className="text-red-500 text-3xl" title="Laravel" />
          <SiReact className="text-sky-400 text-3xl" title="React" />
          <SiNextdotjs className="text-black text-3xl" title="Next.js" />
          <SiTypescript className="text-blue-500 text-3xl" title="TypeScript" />
          <SiJira className="text-[#0052CC] text-3xl" title="Jira" />
          <SiGit className="text-orange-600 text-3xl" title="Git" />
          <SiBitbucket className="text-[#2684FF] text-3xl" title="Bitbucket" />
          <SiGo className="text-cyan-600 text-3xl" title="Golang" />
          <SiJenkins className="text-red-600 text-3xl" title="Jenkins" />
        </div>

      </motion.section>





      {/* Portfolio Section */}
      <motion.section
        id="portfolio"
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto space-y-8 text-center"
      >
        <h2 className="text-2xl font-semibold text-sky-600 text-center">Portfolio</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {["RCTI+", "EPJLP-DKI", "Short Series"].map((title, idx) => (
            <div
              key={title}
              className="[perspective:1000px] cursor-pointer"
              onClick={(e) => {
                const card = (e.currentTarget.querySelector('.card-inner') as HTMLElement);
                card?.classList.toggle('rotate');
              }}
            >
              <div className="card-inner relative h-80 w-full transition-transform duration-700 [transform-style:preserve-3d]">
                {/* Front Side */}
                <div className="absolute inset-0 bg-white rounded-xl shadow-md pt-10 px-4 pb-4 backface-hidden">
                  <Image 
                    src={
                      idx === 0 ? `${process.env.NEXT_PUBLIC_BASE_PATH}/assets/images/rctiplus.png` :
                      idx === 1 ? `${process.env.NEXT_PUBLIC_BASE_PATH}/assets/images/epjlp.png` :
                      `${process.env.NEXT_PUBLIC_BASE_PATH}/assets/images/short-series.png`
                    }
                    alt={title}
                    className="w-full h-40 object-cover rounded-md mb-2"
                    width={200} 
                    height={100}
                  />
                  <h3 className="text-lg font-semibold">{title}</h3>
                  <p className="text-sm">
                    {
                      idx === 0 ? "Aplikasi katalog video berbasis Next.js + JWPlayer + Redux." :
                      idx === 1 ? "Dashboard analytics real-time dengan integrasi APM Elastic." :
                      "Aplikasi katalog video berbasis Next.js + JWPlayer + Redux."
                    }
                  </p>
                </div>

                {/* Back Side */}
                <div className="absolute inset-0 bg-sky-100 rounded-xl shadow-md p-4 backface-hidden [transform:rotateY(180deg)] flex items-center justify-center">
                <a
                    href={
                      idx === 0 ? "https://rctiplus.com" :
                      idx === 1 ? "https://epjlp.jakarta.go.id/" :
                      "https://rctiplus.com/videoplus/home"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" className="hover:scale-110 transition-transform duration-200">View More</Button>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <style jsx>{`
          .card-inner.rotate {
            transform: rotateY(180deg);
          }
          .backface-hidden {
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
          }
        `}</style>

      </motion.section>

      <motion.section
        id="testimonials"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto py-16 px-4 space-y-10"
      >
        <h2 className="text-2xl font-bold text-center text-sky-600">Professional References</h2>

        <div className="space-y-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`rounded-2xl bg-white p-6 flex flex-col md:flex-row items-center gap-4 shadow-md`}
            >
              <Image
                src={t.avatar}
                alt={t.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-white shadow"
                width={300} 
                height={300}
              />
              <div className="text-center md:text-left">
                <p className="text-gray-800 italic">&quot;{t.message}&quot;</p>
                <p className="font-semibold mt-2 text-sky-700">{t.name}</p>
                <p className="text-sm text-gray-500">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>


      {/* Contact Section */}
      <motion.section
        id="contact"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto text-center space-y-6"
      >
        <h2 className="text-2xl font-semibold text-sky-600">Contact me</h2>

        {/* Form Contact */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const name = (form.elements.namedItem("name") as HTMLInputElement).value;
            const from = (form.elements.namedItem("from") as HTMLInputElement).value;
            const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;

            const text = `Halo Feri, saya ${name} dari ${from}.%0A%0A${message}`;
            const url = `https://wa.me/6281317185602?text=${encodeURIComponent(text)}`;
            window.open(url, "_blank");
          }}
          className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-md space-y-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sky-500 outline-none"
              required
            />
            <input
              type="text"
              name="from"
              placeholder="From (Company/City)"
              className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sky-500 outline-none"
              required
            />
          </div>
          <textarea
            name="message"
            placeholder="Your Message"
            rows={4}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sky-500 outline-none"
            required
          ></textarea>
          <button
            type="submit"
            className="w-full bg-sky-600 text-white py-2 rounded-lg hover:bg-sky-700 transition duration-200"
          >
            Send via WhatsApp
          </button>
        </form>

        <div className="flex justify-center gap-6 text-2xl text-sky-600">
          <a
            href="https://wa.me/6281317185602"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="hover:scale-110 transition-transform duration-200"
          >
            <FaWhatsapp />
          </a>
          <a
            href="https://linkedin.com/in/feri-romadhona-3aa134131"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:scale-110 transition-transform duration-200"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/feriromadhona1"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:scale-110 transition-transform duration-200"
          >
            <FaGithub />
          </a>
          <a
            href="https://instagram.com/feriromadhona"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:scale-110 transition-transform duration-200"
          >
            <FaInstagram />
          </a>
          <a
            href="https://facebook.com/Feritaromadhona"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="hover:scale-110 transition-transform duration-200"
          >
            <FaFacebook />
          </a>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 pt-12 pb-4">
        &copy; 2020 Feri Romadhona. All rights reserved.
      </footer>

      {/* Scroll To Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-sky-500 text-white p-3 rounded-full shadow-lg hover:bg-sky-600 transition-all z-50"
          aria-label="Scroll to top"
        >
          ↑
        </button>
      )}
    </main>
  );
}
