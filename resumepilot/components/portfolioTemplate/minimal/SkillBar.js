const SkillBar = ({ name, level }) => {
    return (
      <div className="mb-4">
        <div className="flex justify-between mb-1">
          <span className="font-medium">{name}</span>
          <span className="text-gray-600">{level}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full" 
            style={{ width: `${level}%` }}
          ></div>
        </div>
      </div>
    );
  };
  
  export default SkillBar;