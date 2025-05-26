import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchCurrentUser, logoutUser } from "../api/auth";
import { createPost } from "../api/post"; // all api from post.js will be import here
const Header = ({ isLoggedIn, userName, userAvatar, onLogout }) => {
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
                  to="/useredit" // You'll need to create this route/page
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
          // This part ideally wouldn't be shown on a blog page that requires login,
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
      </header>
    </div>
  );
};

// --- Replicated Footer from Homepage.jsx (or import if exported) ---
const Footer = () => {
  const handleSmoothScroll = (event, targetId) => {
    event.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      if (window.location.pathname !== '/') {
        window.location.href = `/#${targetId}`;
      } else {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    } else if (window.location.pathname !== '/') {
       window.location.href = `/#${targetId}`;
    }
  };

  return (
    <div className="w-full bg-gray-800 text-gray-300 mt-auto"> {/* mt-auto to push to bottom */}
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
                    href="/#how-it-works" // Assuming #how-it-works is on the homepage
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
const BlogPostCard = ({
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
    <article className="border bg-white mx-auto my-0 p-5 border-solid border-gray-200 max-sm:p-[15px] rounded-lg shadow-md mb-6">
      <div className="flex items-center gap-4 mb-4"> {/* Reduced gap slightly */}
        <img
          src={avatar}
          alt={`${username}'s avatar`}
          className="w-12 h-12 rounded-full object-cover border border-gray-300" /* Smaller avatar for post list */
          onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/48x48/cccccc/FFFFFF?text=User"; }}
        />
        <div className="flex flex-col">
          <span className="text-lg font-semibold text-gray-800">{username}</span>
          <span className="text-gray-500 text-xs">{date}</span>
        </div>
        {tag && (
            <div className="ml-auto self-start mt-1"> {/* Align tag to the right */}
                <span className="text-white text-xs sm:text-sm bg-[#2F6F42] px-2 py-0.5 rounded-full">
                    {tag}
                </span>
            </div>
        )}
      </div>
      <div className="mb-4">
        <p className="text-gray-700 mb-3 whitespace-pre-line text-base">{content}</p> {/* Slightly smaller text */}
        {image && (
          <img
            src={image}
            alt="Post content"
            className="w-full max-w-[700px] h-auto block mx-auto my-0 rounded-md shadow mb-3" /* Max width for image */
            onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/700x350/eeeeee/999999?text=Image"; }}
          />
        )}
      </div>
      <div className="flex justify-between items-center px-0 py-2 border-t border-gray-200 text-sm">
        <div className="text-gray-500">{likes} Likes</div>
        <div className="text-gray-500">
          {comments > 0 ? `${comments} Comments` : "No Comments"}
        </div>
      </div>
      <div className="flex gap-x-4 mt-3">
          <button className="text-sm text-[#14AE5C] hover:underline p-1">Like</button>
          <button className="text-sm text-[#14AE5C] hover:underline p-1">Comment</button>
          <button className="text-sm text-gray-500 hover:text-gray-700 p-1 ml-auto">...</button> {/* More options */}
      </div>
    </article>
  );
};


// --- BlogPage (replaces content of Post.jsx) ---
export const Post = () => { // Renamed from BlogPage to Post to match your main.jsx
  const navigate = useNavigate();

  // Simulate logged-in user state (in a real app, this comes from AuthContext/global state)
  const [currentUser, setCurrentUser] = useState({
    name: null,
    avatar: "/usericon60px.png", // Ensure this image exists in your public folder
  });
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(true); // Blog page assumes logged in
  
  useEffect(()=> {
      const checkAuth = async() => {
        try {
          const data = await fetchCurrentUser();
          if(data.loggedIn && data.user) {
            setIsUserLoggedIn(true);
            setCurrentUser({
              name: data.user.username,
              avatar: data.user.profile_picture || data.user.profile || "usericon60px.png"
            });
          } else {
            setIsUserLoggedIn(false);
            setCurrentUser(null);
          }
        } catch (error) {
          setIsUserLoggedIn(false);
          setCurrentUser(null);
        }
      };
      checkAuth();
    },[]);
  

  const handleActualLogout = async() => {
    setIsUserLoggedIn(false);
    setCurrentUser(null);
    // Here you would typically clear tokens, update global auth state, etc.
    alert("You have been logged out.");
    await logoutUser();
    navigate("/"); // Redirect to homepage after logout
  };


  const [posts, setPosts] = useState([
    {
      id: 1,
      avatar: "/usericon60px.png",
      username: "Thanaposh",
      date: "May 1, 2069", // As per image
      tag: "Conversation",
      content: "Just planted this tree in my front yard. it's looking at me like this what do i do?",
      image: "https://i.ytimg.com/vi/wpWvk5sQyKQ/maxresdefault.jpg", // Placeholder matching image if possible
      likes: 444,
      comments: 0,
      topic: "Conversation",
    },
    {
      id: 2,
      avatar: "/usericon60px.png",
      username: "TreeHugger",
      date: "May 18, 2025",
      tag: "Gardening",
      content: "Best season for planting fruit trees? Discuss!",
      image: null,
      likes: 152,
      comments: 12,
      topic: "Gardening",
    },
     {
      id: 3,
      avatar: "/usericon60px.png",
      username: "ForestRanger",
      date: "May 17, 2025",
      tag: "Tree Species",
      content: "Spotted a rare species of Birch today during my hike. Absolutely stunning!",
      image: "https://placehold.co/800x400/a5a58d/ffffff?text=Rare+Birch",
      likes: 98,
      comments: 5,
      topic: "Tree Species",
    }
  ]);

  const [newPostText, setNewPostText] = useState("");
  const [newPostImage, setNewPostImage] = useState("");
  const [newPostTag, setNewPostTag] = useState("");

  const [activeFilter, setActiveFilter] = useState("All topics");
  const topics = ["All topics", "Tree Species", "Gardening", "Conversation"];


  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newPostText.trim()) {
      alert("Post content cannot be empty!");
      return;
    }
    const newPost = {
      id: Date.now(),
      avatar: currentUser.avatar,
      username: currentUser.name,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      tag: newPostTag.trim() || "General",
      content: newPostText.trim(),
      image: newPostImage.trim() || null,
      likes: 0,
      comments: 0,
      topic: newPostTag.trim() || "General",
    };
    setPosts([newPost, ...posts]);
    setNewPostText("");
    setNewPostImage("");
    setNewPostTag("");
  };

  const filteredPosts = activeFilter === "All topics"
    ? posts
    : posts.filter(post => post.topic.toLowerCase() === activeFilter.toLowerCase());

  // If not logged in (e.g., after simulated logout on this page), redirect or show message
  // This is a basic check; a real app uses routing protection or context.
  if (!isUserLoggedIn) {
    navigate('/login'); // Or show a "Please login to view the blog" message
    return null; // Avoid rendering the rest while redirecting
  }

  return (
    <div className="w-full bg-gray-100 flex flex-col min-h-screen font-sans">
      <Header
        isLoggedIn={isUserLoggedIn}
        userName={currentUser?.name}
        userAvatar={currentUser?.avatar}
        onLogout={handleActualLogout}
      />
      <main className="flex-grow w-full max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8 py-8"> {/* Adjusted max-width */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Discussion</h1>

        <div className="mb-6 flex flex-wrap gap-2">
          {topics.map(topic => (
            <button
              key={topic}
              onClick={() => setActiveFilter(topic)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors
                ${activeFilter === topic
                  ? 'bg-[#14AE5C] text-white shadow-sm'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
            >
              {topic}
            </button>
          ))}
        </div>

        <div className="bg-white p-5 rounded-lg shadow-md mb-8">
          <div className="flex items-start gap-3">
            <img
              src={currentUser.avatar}
              alt="Your avatar"
              className="w-10 h-10 rounded-full object-cover"
              onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/40x40/cccccc/FFFFFF?text=Me"; }}
            />
            <form onSubmit={handleCreatePost} className="flex-grow">
              <textarea
                value={newPostText}
                onChange={(e) => setNewPostText(e.target.value)}
                placeholder="What's on your mind about trees today?"
                className="w-full p-3 border border-gray-300 rounded-md resize-none focus:ring-1 focus:ring-[#14AE5C] focus:border-transparent text-sm"
                rows="3"
              ></textarea>
              <div className="flex flex-wrap gap-x-3 gap-y-2 mt-2 items-center text-sm">
                 {/* Icons for add photo, link, tag */}
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-500 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"></path></svg>
                  <input
                    type="text"
                    value={newPostImage}
                    onChange={(e) => setNewPostImage(e.target.value)}
                    placeholder="Add Photo URL"
                    className="flex-grow p-1 border border-gray-300 rounded-md text-xs focus:ring-1 focus:ring-[#14AE5C] w-full sm:w-auto"
                  />
                </div>
                <div className="flex items-center">
                   <svg className="w-5 h-5 text-gray-500 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h10a3 3 0 013 3v5a.997.997 0 01-.293-.707zM11 5a1 1 0 10-2 0v3H7a1 1 0 100 2h2v3a1 1 0 102 0v-3h2a1 1 0 100-2h-2V5z" clipRule="evenodd"></path></svg>
                  <input
                    type="text"
                    value={newPostTag}
                    onChange={(e) => setNewPostTag(e.target.value)}
                    placeholder="Add Tag"
                    className="flex-grow p-1 border border-gray-300 rounded-md text-xs focus:ring-1 focus:ring-[#14AE5C] w-full sm:w-auto"
                  />
                </div>
              </div>
              <div className="mt-3 flex justify-end">
                <button
                  type="submit"
                  className="bg-[#14AE5C] hover:bg-[#129b52] text-white font-semibold py-1.5 px-4 rounded-md text-sm transition-colors"
                >
                  Post
                </button>
              </div>
            </form>
          </div>
        </div>

        <div>
          {filteredPosts.length > 0 ? (
            filteredPosts.map(post => (
              <BlogPostCard
                key={post.id}
                avatar={post.avatar}
                username={post.username}
                date={post.date}
                tag={post.tag}
                content={post.content}
                image={post.image}
                likes={post.likes}
                comments={post.comments}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 py-10">No posts found for "{activeFilter}".</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default Post;
