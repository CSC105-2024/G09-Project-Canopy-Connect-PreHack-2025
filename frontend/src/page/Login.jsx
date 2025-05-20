import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Added useNavigate
import { loginUser } from "../api/auth";


// Simplified utility function for joining class names
export function cn(...inputs) {
  return inputs.filter(Boolean).join(" ");
}

// Header Component (from your previous version)
export const Header = () => {
  return (
    <div className="w-full max-w-[1440px] mx-auto px-[34px] py-5 max-sm:px-[15px]">
      <header className="flex items-center relative">
        <Link to="/" className="flex items-center">
          <img
            src={'/logo.png'} // Ensure this logo path is correct
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

// Checkbox Component
export const Checkbox = ({
  label,
  checked: controlledChecked,
  onChange,
  id, // Added id for associating with label
}) => {
  const [internalChecked, setInternalChecked] = useState(false);
  const isControlled = controlledChecked !== undefined;
  const isChecked = isControlled ? controlledChecked : internalChecked;

  const handleChange = () => {
    if (!isControlled) {
      setInternalChecked(!internalChecked);
    }
    onChange?.(!isChecked); // Notify parent of the new state
  };

  return (
    <div className="flex items-center gap-2.5">
      <input
        type="checkbox"
        id={id}
        checked={isChecked}
        onChange={handleChange}
        className="hidden" // Hide the default checkbox
      />
      <label htmlFor={id} className="flex items-center gap-2.5 cursor-pointer">
        <div
          className={`w-6 h-6 border-2 rounded flex items-center justify-center
                      ${isChecked ? 'bg-[#14AE5C] border-[#14AE5C]' : 'border-gray-400'}`}
        >
          {isChecked && (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.55005 18.0001L3.8501 12.3001L5.27505 10.8751L9.55005 15.1501L18.725 5.9751L20.15 7.4001L9.55005 18.0001Z" fill="white"/>
            </svg>
          )}
        </div>
        <span className="text-[#2F6F42] text-base select-none">{label}</span>
      </label>
    </div>
  );
};

// Button Component
export const Button = ({
  children,
  className,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  ...props
}) => {
  const baseClasses = "flex justify-center items-center cursor-pointer font-medium rounded-md transition-colors";

  let variantClasses = "";
  if (variant === "primary") {
    variantClasses = "bg-[#14AE5C] text-white border-2 border-solid border-[#14AE5C] hover:bg-[#129b52] hover:border-[#129b52]";
    if (disabled) {
      variantClasses = "bg-gray-400 text-gray-700 border-gray-400 cursor-not-allowed";
    }
  } else if (variant === "secondary") {
    variantClasses = "bg-transparent text-[#2F6F42] hover:underline";
     if (disabled) {
      variantClasses = "bg-transparent text-gray-500 cursor-not-allowed";
    }
  } else if (variant === "outline") {
    variantClasses = "border border-[#2F6F42] text-[#2F6F42] hover:bg-[#2f6f42]/10";
     if (disabled) {
      variantClasses = "border border-gray-400 text-gray-500 cursor-not-allowed";
    }
  }

  let sizeClasses = "";
  if (size === "sm") {
    sizeClasses = "text-base px-3 py-1.5 h-10";
  } else if (size === "md") {
    sizeClasses = "text-xl px-4 py-2 h-[46px]";
  } else if (size === "lg") {
    sizeClasses = "text-2xl px-5 py-2.5 h-[52px]";
  }

  const fullWidthClass = fullWidth ? "w-full" : "";

  const combinedClassName = cn(
    baseClasses,
    variantClasses,
    sizeClasses,
    fullWidthClass,
    className
  );

  return (
    <button
      className={combinedClassName}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

// LoginForm Component
export const LoginForm = ({
  onLogin = () => {},
  onNavigateToSignUp = () => {},
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);  
  
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert("Please enter both username and password.");
      return;
    }
    const result = await loginUser(username, password, rememberMe);
    if(!result.success){
      console.error("Login unsuccessful, please try again.");
      return;
    }
    onLogin({user:result.data,rememberMe})
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="w-[492px] rounded bg-white p-10 max-md:w-[90%] max-md:max-w-[492px] max-md:mx-5 max-md:my-0 max-sm:p-5 shadow-lg">
      <h2 className="text-[#2F6F42] text-[32px] text-center font-semibold mb-2.5 max-sm:text-[28px]">
        Welcome Back!
      </h2>
      <p className="text-[#2F6F42] text-base text-center mb-[30px]">
        Login to continue in Canopy Green
      </p>

      <div className="mb-[20px]">
        <label htmlFor="login-username" className="text-[#2F6F42] text-base mb-[10px] block font-medium">
          Username<span className="text-[#F00]">*</span>
        </label>
        <input
          id="login-username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full h-[46px] border text-base px-[15px] py-0 rounded-md border-solid border-gray-300 focus:border-[#14AE5C] focus:ring-1 focus:ring-[#14AE5C] outline-none max-sm:h-10"
          required
        />
      </div>

      <div className="mb-[20px]">
        <label htmlFor="login-password" className="text-[#2F6F42] text-base mb-[10px] block font-medium">
          Password<span className="text-[#F00]">*</span>
        </label>
        <input
          id="login-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full h-[46px] border text-base px-[15px] py-0 rounded-md border-solid border-gray-300 focus:border-[#14AE5C] focus:ring-1 focus:ring-[#14AE5C] outline-none max-sm:h-10"
          required
        />
      </div>

      <div className="mb-[30px]">
        <Checkbox
          id="remember-me"
          label="Remember me"
          checked={rememberMe}
          onChange={setRememberMe}
        />
      </div>

      <Button 
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        className="mb-5"
      >
        Login
      </Button>

      <div className="text-center text-gray-600 text-base">
        <span>Don't have an account? </span>
        <button
          type="button"
          onClick={onNavigateToSignUp}
          className="text-[#14AE5C] cursor-pointer font-medium hover:underline"
        >
          Sign up
        </button>
      </div>
    </form>
  );
};

// SignupForm Component need to be fixed
export const SignupForm = ({
  onSignUp = () => {},
  onNavigateToLogin = () => {},
}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); 

    if (!username || !email || !password || !confirmPassword) {
      setError("All fields marked with * are required.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!termsAgreed) {
      setError("You must agree to the terms and conditions.");
      return;
    }
    onSignUp({username, email, password, termsAgreed });
  };

  return (
    <form onSubmit={handleSubmit} className="w-[492px] rounded bg-white p-10 max-md:w-[90%] max-md:max-w-[492px] max-md:mx-5 max-md:my-0 max-sm:p-5 shadow-lg">
      <h2 className="text-[#2F6F42] text-[32px] text-center font-semibold mb-2.5 max-sm:text-[28px]">
        Create Account
      </h2>
      <p className="text-[#2F6F42] text-base text-center mb-[30px]">
        Join Canopy Green today!
      </p>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <div className="mb-[20px]">
        <label htmlFor="signup-username" className="text-[#2F6F42] text-base mb-[10px] block font-medium">
          Username<span className="text-[#F00]">*</span>
        </label>
        <input
          id="signup-username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full h-[46px] border text-base px-[15px] py-0 rounded-md border-solid border-gray-300 focus:border-[#14AE5C] focus:ring-1 focus:ring-[#14AE5C] outline-none max-sm:h-10"
          required
        />
      </div>

      <div className="mb-[20px]">
        <label htmlFor="signup-email" className="text-[#2F6F42] text-base mb-[10px] block font-medium">
          Email<span className="text-[#F00]">*</span>
        </label>
        <input
          id="signup-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full h-[46px] border text-base px-[15px] py-0 rounded-md border-solid border-gray-300 focus:border-[#14AE5C] focus:ring-1 focus:ring-[#14AE5C] outline-none max-sm:h-10"
          required
        />
      </div>

      <div className="mb-[20px]">
        <label htmlFor="signup-password" className="text-[#2F6F42] text-base mb-[10px] block font-medium">
          Password<span className="text-[#F00]">*</span>
        </label>
        <input
          id="signup-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full h-[46px] border text-base px-[15px] py-0 rounded-md border-solid border-gray-300 focus:border-[#14AE5C] focus:ring-1 focus:ring-[#14AE5C] outline-none max-sm:h-10"
          required
        />
      </div>

      <div className="mb-[20px]">
        <label htmlFor="signup-confirm-password" className="text-[#2F6F42] text-base mb-[10px] block font-medium">
          Confirm Password<span className="text-[#F00]">*</span>
        </label>
        <input
          id="signup-confirm-password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full h-[46px] border text-base px-[15px] py-0 rounded-md border-solid border-gray-300 focus:border-[#14AE5C] focus:ring-1 focus:ring-[#14AE5C] outline-none max-sm:h-10"
          required
        />
      </div>

      <div className="mb-[30px]">
        <Checkbox
          id="terms-agreed"
          label="I agree to the Terms and Conditions"
          checked={termsAgreed}
          onChange={setTermsAgreed}
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        className="mb-5"
        disabled={!termsAgreed || !username || !email || !password || !confirmPassword || password !== confirmPassword}
      >
        Sign Up
      </Button>

      <div className="text-center text-gray-600 text-base">
        <span>Already have an account? </span>
        <button
          type="button"
          onClick={onNavigateToLogin}
          className="text-[#14AE5C] cursor-pointer font-medium hover:underline"
        >
          Login
        </button>
      </div>
    </form>
  );
};

// Footer Component (Copied from Homepage code)
export const Footer = () => {
  const handleSmoothScroll = (event, targetId) => {
    event.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      // Check if the target is on a different page (e.g. homepage)
      if (window.location.pathname !== '/') {
        // If on a different page (e.g. /login or /signup), navigate to homepage first
        // then scroll. This requires the targetId to be present on the homepage.
        window.location.href = `/#${targetId}`;
      } else {
        // If already on the homepage, just scroll smoothly
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    } else if (window.location.pathname !== '/') {
      // Fallback if element not found and not on homepage: navigate to homepage and try to find anchor
       window.location.href = `/#${targetId}`;
    }
  };

  return (
    <div className="w-full bg-gray-100 mt-auto"> {/* Added mt-auto to push footer down */}
      <div className="w-full max-w-[1440px] mx-auto">
        <footer className="px-5 sm:px-[34px] py-10 border-t border-solid border-gray-300"> {/* Adjusted border color */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* About Canopy Green Column */}
            <div>
              <h3 className="text-xl font-semibold mb-[15px] text-gray-800">
                About Canopy Green
              </h3>
              <p className="text-gray-600 text-base max-w-[259px]"> {/* Adjusted text color */}
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
                  <Link to="/" className="text-gray-600 hover:text-[#14AE5C] hover:underline">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/signup" className="text-gray-600 hover:text-[#14AE5C] hover:underline">
                    Register {/* Text changed to Register to match common usage, but links to /signup */}
                  </Link>
                </li>
                <li>
                  <a
                    href="/#how-it-works" 
                    onClick={(e) => handleSmoothScroll(e, "how-it-works")}
                    className="text-gray-600 hover:text-[#14AE5C] hover:underline cursor-pointer"
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
              <ul className="space-y-2 text-gray-600"> {/* Adjusted text color */}
                <li>Email: info@canopygreen.com</li>
                <li>Phone: (555) 123-4567</li>
                <li>Address: 123 Nature Way, Forest City</li>
              </ul>
            </div>
          </div>

          {/* Copyright notice */}
          <div className="text-center text-gray-500 text-sm border-t border-solid border-gray-200 pt-8 mt-8"> {/* Adjusted colors */}
            <p>© {new Date().getFullYear()} Canopy Green. All rights reserved.</p> {/* Dynamic year */}
          </div>
        </footer>
      </div>
    </div>
  );
};


// Index Page Component (Main Page for Login/Signup views)
const Index = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(
    location.pathname.endsWith("/signup") ? "register" : "login"
  );

  useEffect(() => {
    if (location.pathname.endsWith("/signup")) {
      setActiveTab("register");
    } else { 
      setActiveTab("login");
    }
  }, [location.pathname]);


  const handleLoginSubmit = (signUpData) => {
    setActiveTab("login"); 
    navigate('/login'); 
  };


  //need to be fix
  const handleSignUpSubmit = (signUpData) => {
    navigate("/");
  };

  const handleNavigateToSignUpView = () => {
    setActiveTab("register");
    if (location.pathname !== "/signup") {
      navigate('/signup');
    }
  };

  const handleNavigateToLoginView = () => {
    setActiveTab("login");
    if (location.pathname !== "/login") {
      navigate('/login');
    }
  };

  return (
    // Flex column layout to push footer down if content is short
    <div className="max-w-none w-full min-h-screen bg-gray-50 mx-auto flex flex-col"> 
      <Header />
      {/* Main content takes available space */}
      <main className="flex-grow bg-[url('/wallpaper2.png')] bg-cover bg-no-repeat bg-center flex items-center justify-center py-[60px] px-4">
        {activeTab === "login" ? (
          <LoginForm
            onLogin={handleLoginSubmit}
            onNavigateToSignUp={handleNavigateToSignUpView}
          />
        ) : (
          <SignupForm
            onSignUp={handleSignUpSubmit}
            onNavigateToLogin={handleNavigateToLoginView}
          />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
