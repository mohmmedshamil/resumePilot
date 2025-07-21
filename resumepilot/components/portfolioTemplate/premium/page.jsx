import { motion } from 'framer-motion';
import Image from 'next/image';

export default function PremiumLandingPage({ portfolioData, customization = {} }) {
  const {
    backgroundColor = '#000000',
    textColor = '#f5f5f5',
    accentColor = '#3B82F6'
  } = customization;
console.log("portfolioData", portfolioData)
  const { personal, projects, stats, testimonials, contact } = portfolioData;

  return (
    <main className="font-sans min-h-screen" style={{ backgroundColor, color: textColor }}>
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 py-20">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl font-extrabold mb-4"
          style={{ color: accentColor }}
        >
          {personal.name}
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-xl mb-6"
        >
          {personal.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="max-w-2xl"
        >
          {personal.bio}
        </motion.p>
      </section>

      {/* Stats */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 text-center">
          {Object.entries(stats).map(([key, value], i) => (
            <motion.div
              key={key}
              className="rounded-xl p-6 border border-gray-700"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
            >
              <p className="text-4xl font-bold" style={{ color: accentColor }}>{value}</p>
              <p className="capitalize text-gray-400">{key.replace(/([A-Z])/g, ' $1')}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: accentColor }}>Featured Work</h2>
          <div className="grid md:grid-cols-2 gap-10">
            {projects.slice(0, 2).map((project, i) => (
              <motion.div
                key={i}
                className="bg-white/5 backdrop-blur-lg rounded-lg p-6 shadow-lg"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
              >
                <img src={project.image} alt={project.title} className="rounded mb-4 w-full h-48 object-cover" />
                <h3 className="text-xl font-semibold" style={{ color: accentColor }}>{project.title}</h3>
                <p className="text-gray-300 mt-2">{project.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials && testimonials.length > 0 && (
        <section className="py-20 bg-black/20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-10" style={{ color: accentColor }}>Testimonials</h2>
            <div className="space-y-6">
              {testimonials.map((t, i) => (
                <motion.blockquote
                  key={i}
                  className="bg-white/5 p-6 rounded-xl shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 }}
                >
                  <p className="italic">"{t.text}"</p>
                  <footer className="mt-4 text-sm text-gray-400">— {t.author}, {t.position}</footer>
                </motion.blockquote>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="py-20 text-center">
        <h2 className="text-3xl font-semibold mb-4">Let’s Build Something Amazing</h2>
        <p className="mb-6 text-gray-400">Interested in working together? Feel free to reach out.</p>
        <a
          href={`mailto:${contact.email}`}
          className="inline-block bg-white text-black px-6 py-3 font-medium rounded hover:bg-gray-200"
        >
          Contact Me
        </a>
      </section>

      <footer className="text-center py-6 text-sm text-gray-500 border-t border-gray-800">
        © {new Date().getFullYear()} {personal.name}. All rights reserved.
      </footer>
    </main>
  );
}

// Usage: <PremiumLandingPage data={egdata} customization={{ backgroundColor: '#121212', textColor: '#ffffff', accentColor: '#ff6b6b' }} />
