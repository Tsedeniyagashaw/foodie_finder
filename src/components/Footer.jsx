import React from 'react';
const Footer = () => {
  return (
    <footer className="bg-red-50 text-gray-700 mt-12 border-t border-red-100 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-xl font-bold text-red-600 mb-2">Foodie Finder</h2>
          <p className="text-sm">Discover delicious meals from around the world. Made with ❤️ by passionate developers.</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3 text-red-500">Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-red-600">Home</a></li>
            <li><a href="/favorites" className="hover:text-red-600">Favorites</a></li>
            <li><a href="#" className="hover:text-red-600">About Us</a></li>
            <li><a href="#" className="hover:text-red-600">Contact</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3 text-red-500">Connect</h3>
          <ul className="space-y-2 text-sm">
            <li>Email: <a href="mailto:support@foodiefinder.com" className="hover:text-red-600">support@foodiefinder.com</a></li>
            <li>Phone: <a href="tel:+251234567899" className="hover:text-red-600">+251 123 456 7899</a></li>
            <li>
              <div className="flex space-x-4 mt-2">
                <a href="#" className="hover:text-red-600">Facebook</a>
                <a href="#" className="hover:text-red-600">Twitter</a>
                <a href="#" className="hover:text-red-600">Instagram</a>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-red-100 text-center py-3 text-sm text-gray-600">
        © {new Date().getFullYear()} Foodie Finder. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
