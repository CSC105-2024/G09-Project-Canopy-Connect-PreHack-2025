import React from "react";
import { Link } from "react-router-dom";

// Header Component
export const Header = () => {
  return (
    // Wrapper to constrain header content
    <div className="w-full max-w-[1440px] mx-auto px-[34px] py-5 max-sm:px-[15px]">
      <header className="flex items-center relative">
        <Link to="/" className="flex items-center">
          <img
            src={'/logo.png'}
            alt="Canopy Green Logo"
            className="w-[46px] h-[46px]"
          />
          <div className="text-[#14AE5C] text-[32px] font-extrabold ml-2.5">
            Canopy Green
          </div>
        </Link>
        <div className="flex items-center gap-5 ml-auto max-sm:hidden">
          <Link to="/login" className="text-[#2F6F42] text-2xl hover:underline">
            Login
          </Link>
          <Link
            to="/signup"
            className="text-white text-2xl bg-[#14AE5C] px-5 py-[3px] border-[3px] border-solid border-[#14AE5C] hover:bg-[#129b52] hover:border-[#129b52] transition-colors"
          >
            Signup
          </Link>
        </div>
      </header>
    </div>
  );
};

// Hero Component
export const Hero = () => {
  return (
    <section className="w-full bg-[url('/wallpaper.png')] bg-cover bg-center h-[458px] flex items-center justify-center">
      {}
      <div className="text-center text-white max-w-[1015px] px-5 py-0 max-sm:px-[15px] max-sm:py-0">
        <h1 className="text-[32px] font-bold mb-2.5 max-sm:text-2xl">
          Welcome to Canopy Green
        </h1>
        <p className="text-2xl mb-[30px] max-sm:text-lg">
          Join our community to discuss trees, share knowledge, and grow together
          in our appreciation for nature.
        </p>
        <Link
          to="/signup"
          className="inline-block text-white text-[25px] cursor-pointer bg-[#14AE5C] px-10 py-1 rounded-[10px] max-sm:text-xl max-sm:px-5 max-sm:py-1 hover:bg-[#129b52] transition-colors"
        >
          Join the Conversation!
        </Link>
      </div>
    </section>
  );
};

// FeatureCard Component
export const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="max-w-[430px] text-center">
      <img src={icon} alt={`${title} icon`} className="w-[60px] h-[60px] mb-5 mx-auto" />
      <h3 className="text-xl font-bold mb-2.5">{title}</h3>
      <p className="text-base text-black">{description}</p>
    </div>
  );
};

// Features Component (Updated with ID)
export const Features = () => {
  const features = [
    {
      icon: "/discussion.png",
      title: "Post & Discuss",
      description:
        "Share your thoughts, ask questions, and engage in meaningful conversations about trees and nature.",
    },
    {
      icon: "/tree.png",
      title: "Learn & Grow",
      description:
        "Expand your knowledge through community expertise and shared experiences with fellow nature lovers.",
    },
    {
      icon: "/usericon60px.png",
      title: "Create Your Profile",
      description:
        "Build your presence in the community and connect with like-minded individuals across the globe.",
    },
  ];

  return (
    <section id="how-it-works" className="text-center px-5 py-[50px]">
      <h2 className="text-[32px] mb-2.5">How It Works</h2>
      <p className="text-2xl mb-10">
        Connect with tree enthusiasts in three simple steps
      </p>
      <div className="flex justify-around gap-[30px] mx-auto my-0 max-md:flex-col max-md:items-center max-sm:px-[15px] max-sm:py-0">
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
    <article className="border bg-white mx-auto my-0 p-5 border-solid border-[#eee] max-sm:p-[15px]">
      <div className="flex items-center gap-5 mb-5">
        <img src={avatar} alt={`${username}'s avatar`} className="w-[68px] h-[68px] rounded-full object-cover" />
        <div className="flex items-center gap-[15px] max-sm:flex-wrap">
          <div className="text-xl font-semibold">{username}</div>
          <div className="text-[#767676] text-base">{date}</div>
          <div className="text-[#767676] text-base">Tag:</div>
          <div className="text-[#F0FFF7] text-sm bg-[#2F6F42] px-[7px] py-px rounded">
            {tag}
          </div>
        </div>
      </div>
      <div className="mb-5">
        <div className="text-lg mb-5">{content}</div>
        {image && (
          <img
            src={image}
            alt="Post content"
            className="w-full max-w-[860px] h-auto block mx-auto my-0 rounded-md"
          />
        )}
      </div>
      <div className="flex justify-between items-center px-0 py-5 border-y-[#767676] border-t border-solid border-b">
        <div className="text-[#767676] text-base">{likes} Likes</div>
        <div className="text-[#767676] text-base">
          {comments > 0 ? `${comments} Comments` : "No Comments"}
        </div>
      </div>
    </article>
  );
};

// DiscussionSection Component
export const DiscussionSection = () => {
  const samplePost = {
    avatar: "/usericon60px.png",
    username: "Thanaposh",
    date: "May 19, 2025",
    tag: "Conversation",
    content:
      "Just planted this tree in my front yard I'm so proud. It's a beautiful oak and I can't wait to watch it grow over the years!",
    image: "/post1.jpg",
    likes: 444,
    comments: 2,
  };

  return (
    <section className="px-5 py-[50px]">
      <h2 className="text-[32px] text-center mb-2.5">Join the discussion</h2>
      <p className="text-xl text-center mb-[30px]">
        See what our community is talking about
      </p>
      <div className="max-w-[1155px] mx-auto">
        <DiscussionPost {...samplePost} />
      </div>
    </section>
  );
};

// Footer Component (Updated with Smooth Scroll)
export const Footer = () => {
  const handleSmoothScroll = (event, targetId) => {
    event.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    // Wrapper to constrain footer content
    <div className="w-full bg-gray-100">
      <div className="w-full max-w-[1440px] mx-auto">
        <footer className="px-5 sm:px-[34px] py-10 border-t border-solid border-[#B3B3B3]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* About Canopy Green Column */}
            <div>
              <h3 className="text-xl font-semibold mb-[15px] text-gray-800">
                About Canopy Green
              </h3>
              <p className="text-[#767676] text-base max-w-[259px]">
                A community dedicated to tree enthusiasts, arborists, and nature
                lovers from around the world.
              </p>
            </div>

            {/* Quick Links Column */}
            <div>
              <h3 className="text-xl font-semibold mb-[15px] text-gray-800">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-[#767676] hover:text-[#14AE5C] hover:underline">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/signup" className="text-[#767676] hover:text-[#14AE5C] hover:underline">
                    Register
                  </Link>
                </li>
                <li>
                  {/* Updated "How it Works" link for smooth scrolling */}
                  <a
                    href="/#how-it-works" // Keep href for accessibility and fallback
                    onClick={(e) => handleSmoothScroll(e, "how-it-works")}
                    className="text-[#767676] hover:text-[#14AE5C] hover:underline cursor-pointer"
                  >
                    How it Works
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Us Column */}
            <div>
              <h3 className="text-xl font-semibold mb-[15px] text-gray-800">
                Contact Us
              </h3>
              <ul className="space-y-2 text-[#767676]">
                <li>Email: info@canopygreen.com</li>
                <li>Phone: (555) 123-4567</li>
                <li>Address: 123 Nature Way, Forest City</li>
              </ul>
            </div>
          </div>

          {/* Copyright notice */}
          <div className="text-center text-[#767676] text-sm border-t border-solid border-[#ddd] pt-8 mt-8">
            <p>© 2025 Canopy Green. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

// Button Component
export const Button = ({
  children,
  className: propClassName,
  variant = "primary",
  size = "md",
  ...props
}) => {
  const baseStyles = "cursor-pointer transition-colors font-medium rounded-md";
  const variantStyles = {
    primary: "bg-[#14AE5C] text-white border-[2px] border-solid border-[#14AE5C] hover:bg-[#129b52] hover:border-[#129b52]",
    secondary: "text-[#2F6F42] hover:underline",
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

// Homepage Component
const Homepage = () => {
  return (
    <div className="w-full bg-white">
      <Header />
      <main>
        <Hero />
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