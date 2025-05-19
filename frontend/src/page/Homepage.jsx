import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

// NOTES:
// 1. This version includes a "Simulate Login" button on the Homepage for testing.
// 2. In a real application, authentication state would be managed globally (Context API, Redux, etc.)
//    and updated by your actual login page.
// 3. Ensure image paths (e.g., '/logo.png', '/usericon60px.png', '/wallpaper.png', etc.)
//    are correct and images are in your `public` folder.

// Header Component (Receives auth state as props)
export const Header = ({ isLoggedIn, userName, userAvatar, onLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleLogoutClick = () => {
    setDropdownOpen(false);
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto px-[34px] py-5 max-sm:px-[15px]">
      <header className="flex items-center relative">
        <Link to="/" className="flex items-center mr-auto">
          <img
            src={'/logo.png'}
            alt="Canopy Green Logo"
            className="w-[46px] h-[46px]"
            onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/46x46/14AE5C/FFFFFF?text=Logo"; }}
          />
          <div className="text-[#14AE5C] text-[32px] font-extrabold ml-2.5">
            Canopy Green
          </div>
        </Link>

        {isLoggedIn ? (
          <div className="flex items-center gap-3 relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 cursor-pointer focus:outline-none p-1 rounded-md hover:bg-gray-100"
            >
              <img
                src={userAvatar || '/usericon60px.png'}
                alt={`${userName || 'User'}'s avatar`}
                className="w-[40px] h-[40px] rounded-full object-cover border-2 border-gray-300"
                onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/40x40/cccccc/FFFFFF?text=User"; }}
              />
              <span className="text-[#2F6F42] text-lg font-medium max-sm:hidden">
                {userName || 'User Name'}
              </span>
              <svg
                className={`w-5 h-5 text-[#2F6F42] transition-transform duration-200 ${
                  dropdownOpen ? "transform rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                <Link
                  to="/useredit"
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#14AE5C]"
                  onClick={() => setDropdownOpen(false)}
                >
                  Edit Profile
                </Link>
                <button
                  onClick={handleLogoutClick}
                  className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#14AE5C]"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-5 max-sm:hidden">
            <Link to="/login" className="text-[#2F6F42] text-2xl hover:underline">
              Login
            </Link>
            <Link
              to="/signup"
              className="text-white text-2xl bg-[#14AE5C] px-5 py-[3px] border-[3px] border-solid border-[#14AE5C] hover:bg-[#129b52] hover:border-[#129b52] transition-colors rounded-md"
            >
              Signup
            </Link>
          </div>
        )}
        {!isLoggedIn && (
            <div className="ml-auto sm:hidden">
                 {/* Optional: Add a hamburger icon here for mobile menu when logged out */}
                 {/* <button className="text-[#2F6F42] p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500">Menu</button> */}
            </div>
        )}
      </header>
    </div>
  );
};

// Hero Component (Accepts isLoggedIn prop)
export const Hero = ({ isLoggedIn }) => {
  const ctaLink = isLoggedIn ? "/blog" : "/signup";
  const ctaText = isLoggedIn ? "Go to Blog" : "Join the Conversation!";

  return (
    <section
      className="w-full bg-cover bg-center h-[458px] flex items-center justify-center"
      style={{ backgroundImage: "url('/wallpaper.png')" }} // Ensure this image is in public folder
    >
      {/* Fallback background color if image fails to load, though direct style bg is harder to make fallback for */}
      <div className="absolute inset-0 bg-green-700 opacity-50 -z-10" style={{ backgroundImage: "url('/wallpaper.png') " ? 'none' : '' }}></div>
      <div className="text-center text-white max-w-[1015px] px-5 py-0 max-sm:px-[15px] max-sm:py-0 z-10">
        <h1 className="text-[32px] font-bold mb-2.5 max-sm:text-2xl">
          Welcome to Canopy Green
        </h1>
        <p className="text-2xl mb-[30px] max-sm:text-lg">
          Join our community to discuss trees, share knowledge, and grow together
          in our appreciation for nature.
        </p>
        <Link
          to={ctaLink}
          className="inline-block text-white text-[25px] cursor-pointer bg-[#14AE5C] px-10 py-1 rounded-[10px] max-sm:text-xl max-sm:px-5 max-sm:py-1 hover:bg-[#129b52] transition-colors"
        >
          {ctaText}
        </Link>
      </div>
    </section>
  );
};

// FeatureCard Component
export const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="max-w-[430px] text-center p-4">
      <img
        src={icon}
        alt={`${title} icon`}
        className="w-[60px] h-[60px] mb-5 mx-auto"
        onError={(e) => { e.target.onerror = null; e.target.src=`https://placehold.co/60x60/2F6F42/FFFFFF?text=Icon`; }}
      />
      <h3 className="text-xl font-bold mb-2.5 text-gray-800">{title}</h3>
      <p className="text-base text-gray-600">{description}</p>
    </div>
  );
};

// Features Component
export const Features = () => {
  const features = [
    {
      icon: "/discussion.png", // Ensure this image is in public folder
      title: "Post & Discuss",
      description:
        "Share your thoughts, ask questions, and engage in meaningful conversations about trees and nature.",
    },
    {
      icon: "/tree.png", // Ensure this image is in public folder
      title: "Learn & Grow",
      description:
        "Expand your knowledge through community expertise and shared experiences with fellow nature lovers.",
    },
    {
      icon: "/usericon60px.png", // Ensure this image is in public folder
      title: "Create Your Profile",
      description:
        "Build your presence in the community and connect with like-minded individuals across the globe.",
    },
  ];

  return (
    <section id="how-it-works" className="text-center px-5 py-[50px] bg-gray-50">
      <h2 className="text-[32px] mb-2.5 text-gray-800">How It Works</h2>
      <p className="text-2xl mb-10 text-gray-600">
        Connect with tree enthusiasts in three simple steps
      </p>
      <div className="flex flex-wrap justify-around gap-[30px] max-w-[1200px] mx-auto my-0 max-md:flex-col max-md:items-center max-sm:px-[15px] max-sm:py-0">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </section>
  );
};

// DiscussionPost Component
export const DiscussionPost = ({
  avatar,
  username,
  date,
  tag,
  content,
  image,
  likes,
  comments,
}) => {
  return (
    <article className="border bg-white mx-auto my-0 p-5 border-solid border-gray-200 max-sm:p-[15px] rounded-lg shadow-md">
      <div className="flex items-center gap-5 mb-5">
        <img
          src={avatar}
          alt={`${username}'s avatar`}
          className="w-[68px] h-[68px] rounded-full object-cover border border-gray-300"
          onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/68x68/cccccc/FFFFFF?text=User"; }}
        />
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-[15px] max-sm:flex-wrap">
          <div className="text-xl font-semibold text-gray-800">{username}</div>
          <div className="text-gray-500 text-sm sm:text-base">{date}</div>
          <div className="flex items-center mt-1 sm:mt-0">
            <div className="text-gray-500 text-sm sm:text-base mr-1">Tag:</div>
            <div className="text-white text-xs sm:text-sm bg-[#2F6F42] px-2 py-0.5 rounded-full">
              {tag}
            </div>
          </div>
        </div>
      </div>
      <div className="mb-5">
        <div className="text-lg text-gray-700 mb-5 whitespace-pre-line">{content}</div>
        {image && (
          <img
            src={image}
            alt="Post content"
            className="w-full max-w-[860px] h-auto block mx-auto my-0 rounded-md shadow"
            onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/860x400/eeeeee/999999?text=Post+Image+Not+Found"; }}
          />
        )}
      </div>
      <div className="flex justify-between items-center px-0 py-3 border-y border-gray-200">
        <div className="text-gray-500 text-base">{likes} Likes</div>
        <div className="text-gray-500 text-base">
          {comments > 0 ? `${comments} Comments` : "No Comments"}
        </div>
      </div>
    </article>
  );
};

// DiscussionSection Component
export const DiscussionSection = () => {
  const samplePost = {
    avatar: "/usericon60px.png", // Ensure this image is in public folder
    username: "Thanaposh",
    date: "May 19, 2025", // Updated to reflect current date from context
    tag: "Conversation",
    content:
      "Just planted this beautiful oak tree in my front yard! 🌱 I'm so excited to watch it grow over the years. What are your favorite trees to plant?",
    image: "/post1.jpg", // Ensure this image is in public folder
    likes: 444,
    comments: 2,
  };

  return (
    <section className="px-5 py-[50px] bg-white">
      <h2 className="text-[32px] text-center mb-2.5 text-gray-800">Join the discussion</h2>
      <p className="text-xl text-center mb-[30px] text-gray-600">
        See what our community is talking about
      </p>
      <div className="max-w-[1155px] mx-auto">
        <DiscussionPost {...samplePost} />
      </div>
    </section>
  );
};

// Footer Component
export const Footer = () => {
  const handleSmoothScroll = (event, targetId) => {
    event.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
        // Fallback if element not on current page (e.g. navigating from other page)
        window.location.href = `/#${targetId}`;
    }
  };

  return (
    <div className="w-full bg-gray-800 text-gray-300">
      <div className="w-full max-w-[1440px] mx-auto">
        <footer className="px-5 sm:px-[34px] py-10 border-t border-solid border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-8">
            <div>
              <h3 className="text-xl font-semibold mb-[15px] text-white">
                About Canopy Green
              </h3>
              <p className="text-base max-w-[259px]">
                A community dedicated to tree enthusiasts, arborists, and nature
                lovers from around the world.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-[15px] text-white">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="hover:text-[#14AE5C] hover:underline">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/signup" className="hover:text-[#14AE5C] hover:underline">
                    Register
                  </Link>
                </li>
                <li>
                  <a
                    href="/#how-it-works"
                    onClick={(e) => handleSmoothScroll(e, "how-it-works")}
                    className="hover:text-[#14AE5C] hover:underline cursor-pointer"
                  >
                    How it Works
                  </a>
                </li>
                 <li>
                  <Link to="/blog" className="hover:text-[#14AE5C] hover:underline">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-[15px] text-white">
                Contact Us
              </h3>
              <ul className="space-y-2">
                <li>Email: info@canopygreen.com</li>
                <li>Phone: (555) 123-4567</li>
                <li>Address: 123 Nature Way, Forest City, EARTH</li>
              </ul>
            </div>
          </div>
          <div className="text-center text-sm border-t border-solid border-gray-700 pt-8 mt-8">
            <p>© {new Date().getFullYear()} Canopy Green. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

// Button Component (Not directly used by Homepage but available)
export const Button = ({
  children,
  className: propClassName,
  variant = "primary",
  size = "md",
  ...props
}) => {
  const baseStyles = "cursor-pointer transition-colors font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variantStyles = {
    primary: "bg-[#14AE5C] text-white border-[2px] border-solid border-[#14AE5C] hover:bg-[#129b52] hover:border-[#129b52] focus:ring-[#14AE5C]",
    secondary: "text-[#2F6F42] hover:underline focus:ring-[#2F6F42]",
  };
  const sizeStyles = {
    sm: "text-lg px-4 py-1",
    md: "text-xl px-5 py-[6px]",
    lg: "text-[22px] px-10 py-2 rounded-[10px]",
  };
  const combinedClassName = [
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    propClassName,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      className={combinedClassName}
      {...props}
    >
      {children}
    </button>
  );
};

// Homepage Component (Manages simulated auth state and passes to children)
const Homepage = () => {
  const navigate = useNavigate();

  // Simulated authentication state (local to Homepage for this demo)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: "Thanaposh",
    avatar: "/usericon60px.png", // Default mock avatar
  });

  // Function to simulate a login
  const handleSimulateLogin = () => {
    setIsLoggedIn(true);
    // In a real app, user data would be fetched or set from auth provider
    setCurrentUser({
      name: "Thanaposh", // Example username
      avatar: "/usericon60px.png", // Example avatar path
    });
    // Optionally navigate to a different page or just re-render
    // navigate('/'); // Or navigate('/dashboard') etc.
  };

  // Function to handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null); // Clear user data
    navigate("/"); // Navigate to home after logout
  };

  return (
    <div className="w-full bg-white flex flex-col min-h-screen font-sans"> {/* Added font-sans for default Tailwind font */}
      <Header
        isLoggedIn={isLoggedIn}
        userName={currentUser?.name} // Use optional chaining in case currentUser is null
        userAvatar={currentUser?.avatar}
        onLogout={handleLogout}
      />
      <main className="flex-grow">
        {/* Simulate Login Button - Only shown if not logged in */}
        {!isLoggedIn && (
          <div className="text-center my-6 p-4 bg-yellow-100 border border-yellow-300 rounded-md max-w-md mx-auto">
            <p className="text-sm text-yellow-700 mb-2">
              This is a testing feature. Click the button below to simulate being logged in.
              In a real application, you would go to the Login page.
            </p>
            <button
              onClick={handleSimulateLogin}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Simulate Login
            </button>
          </div>
        )}

        <Hero isLoggedIn={isLoggedIn} />
        <div className="w-full max-w-[1440px] mx-auto my-0">
          <Features />
          <DiscussionSection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Homepage;
