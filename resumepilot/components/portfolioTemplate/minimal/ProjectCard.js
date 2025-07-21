import { motion } from 'framer-motion';

const ProjectCard = ({ title, description, technologies, link, github, image }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100"
    >
      {image && (
        <div className="h-48 overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        
        {technologies && (
          <div className="flex flex-wrap gap-2 mb-4">
            {technologies.map((tech, i) => (
              <span key={i} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                {tech}
              </span>
            ))}
          </div>
        )}
        
        <div className="flex space-x-3">
          {link && (
            <a 
              href={link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn"
            >
              View Project
            </a>
          )}
          {github && (
            <a 
              href={github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn bg-gray-700 hover:bg-gray-800"
            >
              GitHub
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;