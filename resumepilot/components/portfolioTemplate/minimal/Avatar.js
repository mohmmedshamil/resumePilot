const Avatar = ({ src, alt, size = 'lg' }) => {
    const sizes = {
      sm: 'w-16 h-16',
      md: 'w-24 h-24',
      lg: 'w-32 h-32',
      xl: 'w-40 h-40'
    };
  
    return (
      <div className={`${sizes[size]} rounded-full overflow-hidden border-4 border-white shadow-lg`}>
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover"
        />
      </div>
    );
  };
  
  export default Avatar;