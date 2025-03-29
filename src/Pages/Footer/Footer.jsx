import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const columns = [
    {
      title: 'Shop Gifts',
      links: [
        { name: 'Bestsellers', url: '#' },
        { name: 'New Arrivals', url: '#' },
        { name: 'Gift Sets', url: '#' },
        { name: 'Sale', url: '#' }
      ]
    },
    {
      title: 'Categories',
      links: [
        { name: 'Birthday', url: '#' },
        { name: 'Anniversary', url: '#' },
        { name: 'Corporate', url: '#' },
        { name: 'Seasonal', url: '#' }
      ]
    },
    {
      title: 'Customer Care',
      links: [
        { name: 'Gift Tracking', url: '#' },
        { name: 'Returns', url: '#' },
        { name: 'Gift Messages', url: '#' },
        { name: 'Contact Us', url: '#' }
      ]
    },
    {
      title: 'About Us',
      links: [
        { name: 'Our Story', url: '#' },
        { name: 'Sustainability', url: '#' },
        { name: 'Packaging', url: '#' },
        { name: 'Custom Orders', url: '#' }
      ]
    }
  ];

  const socialLinks = [
    { 
      name: 'Instagram', 
      url: '#', 
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
    },
    { 
      name: 'Facebook', 
      url: '#', 
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
    },
    { 
      name: 'Pinterest', 
      url: '#', 
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M8 12a4 4 0 1 0 8 0 4 4 0 1 0-8 0M21 12c0 4.97-4.03 9-9 9-2.02 0-3.88-.67-5.38-1.8 2.05-4.95 2.47-7.17.89-12.78m3.14 13.25C3.03 16.1 1.82 9.35 6.56 4.38"></path></svg>
    },
    { 
      name: 'Twitter', 
      url: '#', 
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
    },
    { 
      name: 'YouTube', 
      url: '#', 
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
    }
  ];

  return (
    <footer className="bg-gradient-to-r from-slate-800 to-slate-900 text-white ">
    

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto pt-12 pb-8 px-4 sm:px-6 lg:px-8 hidden lg:block">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex flex-col space-y-6">
              <h2 className="text-2xl font-bold text-white">MM Gifts</h2>
              <p className="text-slate-300 text-sm max-w-xs">
                Thoughtful gifts for every occasion. Curated collections to make every moment special and memorable.
              </p>
              <div className="flex space-x-5 mt-2">
                {socialLinks.map((link) => (
                  <a 
                    key={link.name}
                    href={link.url}
                    className="text-slate-400 hover:text-white transition-colors duration-300"
                    aria-label={link.name}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          {/* Link Columns */}
          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.url} 
                      className="text-slate-300 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Bottom Bar */}
        <div className="flex justify-center mt-12 pt-8 border-t border-slate-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col md:flex-row md:items-center">
              <p className="text-slate-300 text-sm">
                © {currentYear} MM Gifts. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0 md:ml-6">
                <a href="#" className="text-slate-300 hover:text-white text-sm">
                  Privacy Policy
                </a>
                <a href="#" className="text-slate-300 hover:text-white text-sm">
                  Terms of Service
                </a>
                <a href="#" className="text-slate-300 hover:text-white text-sm">
                  Cookie Policy
                </a>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;