export const Post = () => {
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