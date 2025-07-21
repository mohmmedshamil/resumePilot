import { useState } from 'react';

const ContactForm = ({ formFields }) => {
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Here you would typically send the form data to your backend
      console.log('Form submitted:', formData);
      setMessage({ text: 'Message sent successfully!', type: 'success' });
      setFormData({});
    } catch (error) {
      setMessage({ text: 'Error sending message. Please try again.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {formFields.map((field) => (
        <div key={field.name}>
          {field.type === 'textarea' ? (
            <textarea
              name={field.name}
              placeholder={field.placeholder}
              required={field.required}
              onChange={handleChange}
              value={formData[field.name] || ''}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              rows="5"
            />
          ) : (
            <input
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              required={field.required}
              onChange={handleChange}
              value={formData[field.name] || ''}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          )}
        </div>
      ))}
      
      <button 
        type="submit" 
        disabled={isSubmitting}
        className="btn w-full"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
      
      {message && (
        <p className={`text-${message.type === 'success' ? 'green' : 'red'}-500`}>
          {message.text}
        </p>
      )}
    </form>
  );
};

export default ContactForm;