const TestimonialCard = ({ text, author, position, avatar }) => {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <p className="italic mb-4">"{text}"</p>
        <div className="flex items-center">
          {avatar && (
            <img 
              src={avatar} 
              alt={author} 
              className="w-12 h-12 rounded-full mr-4 object-cover"
            />
          )}
          <div>
            <h4 className="font-semibold">{author}</h4>
            <p className="text-gray-600 text-sm">{position}</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default TestimonialCard;