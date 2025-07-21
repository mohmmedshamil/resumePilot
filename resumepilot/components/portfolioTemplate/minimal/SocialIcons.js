import { FaGithub, FaLinkedin, FaTwitter, FaDribbble } from 'react-icons/fa';

const SocialIcons = ({ socialLinks }) => {
  const getIcon = (platform) => {
    switch(platform.toLowerCase()) {
      case 'github': return <FaGithub />;
      case 'linkedin': return <FaLinkedin />;
      case 'twitter': return <FaTwitter />;
      case 'dribbble': return <FaDribbble />;
      default: return null;
    }
  };

  return (
    <div className="flex space-x-4">
      {socialLinks.map((link, index) => (
        <a 
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl text-gray-600 hover:text-primary transition-colors"
        >
          {getIcon(link.platform)}
        </a>
      ))}
    </div>
  );
};

export default SocialIcons;