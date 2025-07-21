const ExperienceCard = ({ position, company, startDate, endDate, description, responsibilities, technologies }) => {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold">{position}</h3>
          <span className="text-gray-600">
            {new Date(startDate).getFullYear()} - {endDate ? new Date(endDate).getFullYear() : 'Present'}
          </span>
        </div>
        <h4 className="text-lg text-primary mb-3">{company}</h4>
        <p className="mb-4">{description}</p>
        
        {responsibilities && (
          <div className="mb-4">
            <h5 className="font-medium mb-2">Responsibilities:</h5>
            <ul className="list-disc pl-5 space-y-1">
              {responsibilities.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        )}
        
        {technologies && (
          <div>
            <h5 className="font-medium mb-2">Technologies:</h5>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech, i) => (
                <span key={i} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default ExperienceCard;