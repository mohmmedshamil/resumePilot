import { motion } from 'framer-motion';
import Image from 'next/image';

export default function CreativePortfolio({ portfolioData, customization = {} }) {
  const { personal, skills, experience, projects, contact } = portfolioData;
  const {
    backgroundColor = '#000000',
    textColor = '#f5f5f5',
    accentColor = '#3B82F6'
  } = customization;

  return (
    <main className="font-sans min-h-screen" style={{ backgroundColor, color: textColor }}>
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 py-20" style={{ background: `linear-gradient(135deg, ${accentColor}33, ${accentColor}11)` }}>
        <motion.h1 
          initial={{ opacity: 0, y: -30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }} 
          className="text-5xl font-bold mb-4"
        >
          {personal.name}
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-xl opacity-80"
        >
          {personal.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="max-w-xl mt-4"
        >
          {personal.bio}
        </motion.p>
      </section>

      {/* Skills Section */}
      <section className="py-20" style={{ backgroundColor: `${accentColor}10` }}>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-8 text-center">Skills</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {Object.entries(skills).map(([category, skillList]) => (
              <div key={category}>
                <h3 className="text-lg font-medium mb-2 capitalize">{category}</h3>
                <ul className="space-y-2">
                  {skillList.map((skill, i) => (
                    <li key={i} className="flex justify-between border-b pb-1 border-gray-300/30">
                      <span>{skill.name}</span>
                      <span className="text-sm opacity-60">{skill.level}%</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-12">Projects</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, i) => (
              <motion.div
                key={i}
                className="rounded shadow-md p-6 hover:shadow-xl transition"
                style={{ backgroundColor: `${backgroundColor}cc`, color: textColor, borderColor: accentColor }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="rounded mb-4 w-full h-48 object-cover"
                />
                <h3 className="text-xl font-semibold mb-1">{project.title}</h3>
                <p className="opacity-80 mb-2">{project.description}</p>
                <a href={project.link} target="_blank" className="text-sm underline" style={{ color: accentColor }}>View Project</a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20" style={{ backgroundColor: `${accentColor}10` }}>
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-10">Experience</h2>
          <ul className="space-y-6">
            {experience.map((exp, i) => (
              <li key={i} className="rounded p-6 shadow" style={{ backgroundColor: `${backgroundColor}cc`, color: textColor }}>
                <h3 className="text-xl font-semibold">{exp.position} - {exp.company}</h3>
                <p className="text-sm opacity-60">{exp.startDate} to {exp.endDate}</p>
                <p className="mt-2 opacity-80">{exp.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-4">Get in Touch</h2>
          <p className="opacity-80 mb-6">Feel free to reach out for collaborations or just a chat.</p>
          <div className="space-y-2">
            <p>Email: <a href={`mailto:${contact.email}`} className="underline" style={{ color: accentColor }}>{contact.email}</a></p>
            <p>Phone: {contact.phone}</p>
            <p>Address: {contact.address}</p>
          </div>
        </div>
      </section>

      <footer className="text-center py-6 text-sm border-t" style={{ borderColor: `${accentColor}40`, color: textColor }}>
        © {new Date().getFullYear()} {personal.name}. All rights reserved.
      </footer>
    </main>
  );
}

// Usage: <CreativePortfolio data={egdata} customization={{ backgroundColor: '#000', textColor: '#fff', accentColor: '#f00' }} />