import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

// NOTES:
// 1. This Useredit.jsx page assumes a user is logged in.
// 2. In a real application, `currentUserData` would come from an AuthContext or global state.
//    Profile updates (avatar, details, password) would involve API calls to a backend.
// 3. Header, Footer, and Button components are replicated here for self-containment.
//    Ideally, these should be imported from a shared components directory.
// 4. Image paths need to be correct (e.g., /logo.png, /usericon60px.png).
// 5. File upload for avatar is simulated.

// --- Header (structure from previous correction) ---
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
    <div className="w-full bg-white shadow-sm">
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
                  <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
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
              <Link to="/login" className="text-[#2F6F42] text-2xl hover:underline">Login</Link>
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
    </div>
  );
};

// --- Footer (structure from previous) ---
const Footer = () => {
  const handleSmoothScroll = (event, targetId) => {
    event.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      if (window.location.pathname !== '/') window.location.href = `/#${targetId}`;
      else targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (window.location.pathname !== '/') {
       window.location.href = `/#${targetId}`;
    }
  };
  return (
    <div className="w-full bg-gray-900 text-gray-300">
      <div className="w-full max-w-[1440px] mx-auto">
        <footer className="px-5 sm:px-[34px] py-10 border-t border-solid border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-8">
            <div><h3 className="text-xl font-semibold mb-[15px] text-white">About Canopy Green</h3><p className="text-base max-w-[259px]">A community dedicated to tree enthusiasts, arborists, and nature lovers from around the world.</p></div>
            <div><h3 className="text-xl font-semibold mb-[15px] text-white">Quick Links</h3><ul className="space-y-2"><li><Link to="/" className="hover:text-[#14AE5C] hover:underline">Home</Link></li><li><Link to="/signup" className="hover:text-[#14AE5C] hover:underline">Register</Link></li><li><a href="/#how-it-works" onClick={(e) => handleSmoothScroll(e, "how-it-works")} className="hover:text-[#14AE5C] hover:underline cursor-pointer">How it Works</a></li><li><Link to="/blog" className="hover:text-[#14AE5C] hover:underline">Blog</Link></li></ul></div>
            <div><h3 className="text-xl font-semibold mb-[15px] text-white">Contact Us</h3><ul className="space-y-2"><li>Email: info@canopygreen.com</li><li>Phone: (555) 123-4567</li><li>Address: 123 Nature Way, Forest City, EARTH</li></ul></div>
          </div>
          <div className="text-center text-sm border-t border-solid border-gray-700 pt-8 mt-8"><p>© {new Date().getFullYear()} Canopy Green. All rights reserved.</p></div>
        </footer>
      </div>
    </div>
  );
};

// --- Button (structure from previous) ---
const Button = ({ children, className, variant = "primary", size = "md", type = "button", disabled = false, ...props }) => {
  const baseClasses = "flex justify-center items-center cursor-pointer font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 px-4 py-2";
  let variantClasses = "";
  if (variant === "primary") variantClasses = `bg-[#14AE5C] text-white border border-[#14AE5C] hover:bg-[#129b52] hover:border-[#129b52] focus:ring-[#14AE5C] ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`;
  else if (variant === "outline") variantClasses = `border border-gray-400 text-gray-700 hover:bg-gray-100 focus:ring-gray-300 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`;
  else if (variant === "danger") variantClasses = `bg-red-500 text-white hover:bg-red-600 focus:ring-red-400 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`;
  let sizeClasses = "";
  if (size === "sm") sizeClasses = "text-sm";
  else if (size === "md") sizeClasses = "text-base";
  else if (size === "lg") sizeClasses = "text-lg px-6 py-2.5";
  const combinedClassName = [baseClasses, variantClasses, sizeClasses, className].filter(Boolean).join(" ");
  return <button type={type} className={combinedClassName} disabled={disabled} {...props}>{children}</button>;
};

// --- Useredit Page Component ---
export const Useredit = () => {
  const navigate = useNavigate();

  // This would ideally come from AuthContext/global state
  //This will import the api from auth
  useEffect(()=> {
    const checkAuth = async() => {
      try {
        const data = await fetchCurrentUser();
        console.log(data);
        if(data.loggedIn) {
          setIsLoggedIn(true);
          setCurrentUser({
            name: data.user.username,
            email: data.user.email,
            avatar: data.user.profile,
          });
          
        }else {
          setIsLoggedIn(false);
          setCurrentUser(null);
        }
      } catch (error) {
        console.log("Auth check failed",error);
        setIsLoggedIn(false);
      }
    };
    checkAuth();
  },[])

  const [currentUserData, setCurrentUserData] = useState({
    fullName: "",
    username: "",
    email: "",
    avatarUrl: "usericon60px.png",
  });
  
  const [usernameInput, setUsernameInput] = useState(currentUserData.username);
  const [emailInput, setEmailInput] = useState(currentUserData.email);
  
  // avatarPreview will hold the Data URL for immediate preview, or the existing URL
  const [avatarPreview, setAvatarPreview] = useState(currentUserData.avatarUrl);
  // avatarFile holds the actual File object if a new one is selected
  const [avatarFile, setAvatarFile] = useState(null); 

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);

  // Effect to update form fields if currentUserData changes (e.g., from global state)
  useEffect(() => {
    setUsernameInput(currentUserData.username);
    setEmailInput(currentUserData.email);
    setAvatarPreview(currentUserData.avatarUrl);
  }, [currentUserData]);


  const handleActualLogout = () => {
    setIsUserLoggedIn(false);
    alert("You have been logged out.");
    navigate("/");
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB size limit
        alert("File is too large. Max size is 2MB.");
        e.target.value = null; // Reset file input
        return;
      }
      if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
        alert("Invalid file type. Must be JPEG, PNG, or GIF.");
        e.target.value = null; // Reset file input
        return;
      }
      
      setAvatarFile(file); // Store the file object
      const reader = new FileReader();
      reader.onloadend = () => {
        const newAvatarDataUrl = reader.result;
        setAvatarPreview(newAvatarDataUrl); // Update preview immediately

        // Simulate immediate update
        console.log("New profile picture selected:", file.name);
        // In a real app, you'd initiate an API call here to upload file.
        // On success, the backend would return the new URL, or you'd confirm.
        // For simulation, we directly update our mock currentUserData.
        setCurrentUserData(prev => ({...prev, avatarUrl: newAvatarDataUrl}));
        alert("Profile picture updated!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveAvatar = () => {
    setAvatarFile(null);
    const defaultAvatar = "/usericon60px.png"; // Or your designated placeholder
    setAvatarPreview(defaultAvatar); 
    // Simulate immediate update
    setCurrentUserData(prev => ({...prev, avatarUrl: defaultAvatar}));
    alert("Profile picture removed/reset to default.");
    // Reset the file input if it's still holding a value
    const fileInput = document.getElementById('avatarUpload');
    if (fileInput) fileInput.value = null;
  };
  
  const handleUpdateIdentifyingDetails = (e) => {
    e.preventDefault();
    // Basic validation
    if (!usernameInput.trim() || !emailInput.trim()) {
        alert("Username and Email cannot be empty.");
        return;
    }
    console.log("Updating username to:", usernameInput);
    console.log("Updating email to:", emailInput);
    // API call to update username and email would go here
    setCurrentUserData(prev => ({...prev, username: usernameInput, email: emailInput}));
    alert("Identifying details updated!"); // Simulate success
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    setPasswordError("");
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setPasswordError("All password fields are required to change password.");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError("New password must be at least 6 characters long.");
      return;
    }
    // API call to update password (verify currentPassword on backend)
    console.log("Updating password. Current:", currentPassword, "New:", newPassword);
    alert("Password update simulated!"); // Simulate success
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
  };

  if (!isUserLoggedIn) {
    navigate('/login');
    return null;
  }

  return (
    <div className="w-full bg-[#EBF5EE] flex flex-col min-h-screen font-sans">
      <Header
        isLoggedIn={isUserLoggedIn}
        userName={currentUserData.username} // Display username from potentially updated data
        userAvatar={avatarPreview} // Display current avatar preview
        onLogout={handleActualLogout}
      />

      <main className="flex-grow w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-semibold text-gray-700 mb-8 text-left">Edit profile page</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-md mb-8 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-700 mb-1 border-b pb-3">Profile Setting</h2>
          <div className="flex flex-col sm:flex-row items-center sm:items-start pt-4 gap-6">
            <img
              src={avatarPreview}
              alt="Avatar Preview"
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
              onError={(e) => {e.target.onerror = null; e.target.src="https://placehold.co/96x96/cccccc/FFFFFF?text=Ava";}}
            />
            <div className="flex-grow text-center sm:text-left">
              <p className="text-sm text-gray-500 mb-3">Must be JPEG or PNG</p>
              <div className="flex gap-2 justify-center sm:justify-start">
                <label htmlFor="avatarUpload" className="bg-[#14AE5C] text-white text-sm font-medium py-2 px-3 rounded-md cursor-pointer hover:bg-[#129b52] transition-colors">
                  Upload Profile Picture
                </label>
                <input type="file" id="avatarUpload" accept="image/jpeg, image/png, image/gif" onChange={handleAvatarChange} className="hidden" />
                <Button variant="danger" size="sm" onClick={handleRemoveAvatar} className="p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </Button>
              </div>
              {/* The separate "Update Picture" button is now removed */}
            </div>
          </div>
        </div>

        <form onSubmit={handleUpdateIdentifyingDetails} className="bg-white p-6 rounded-lg shadow-md mb-8 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-700 mb-1 border-b pb-3">Change identifying details for your account</h2>
          <div className="space-y-4 pt-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-600 mb-1">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#14AE5C] focus:border-[#14AE5C] text-sm"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#14AE5C] focus:border-[#14AE5C] text-sm"
              />
            </div>
            <div className="flex justify-end pt-2">
              <Button type="submit" variant="primary" size="sm">Update Details</Button>
            </div>
          </div>
        </form>

        <form onSubmit={handleUpdatePassword} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-700 mb-1 border-b pb-3">Change Password</h2>
          <div className="space-y-4 pt-4">
            {passwordError && <p className="text-red-500 text-xs text-center">{passwordError}</p>}
            <div>
              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-600 mb-1">Current Password</label>
              <input type="password" name="currentPassword" id="currentPassword" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#14AE5C] focus:border-[#14AE5C] text-sm" />
            </div>
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-600 mb-1">New Password</label>
              <input type="password" name="newPassword" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#14AE5C] focus:border-[#14AE5C] text-sm" />
            </div>
            <div>
              <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-600 mb-1">Confirm Password</label>
              <input type="password" name="confirmNewPassword" id="confirmNewPassword" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#14AE5C] focus:border-[#14AE5C] text-sm" />
            </div>
            <div className="flex justify-end pt-2">
              <Button type="submit" variant="primary" size="sm">Update Password</Button>
            </div>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
};
export default Useredit;