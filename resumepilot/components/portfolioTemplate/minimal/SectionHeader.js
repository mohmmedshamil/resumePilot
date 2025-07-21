const SectionHeader = ({ title, subtitle }) => {
    return (
      <div className="mb-4">
        <h2 className="text-3xl font-bold mb-2">{title}</h2>
        {subtitle && <p className="text-gray-600">{subtitle}</p>}
      </div>
    );
  };
  
  export default SectionHeader;