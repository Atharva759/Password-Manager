
const Navbar = () => {
  return (
    <nav className="bg-gray-900 shadow-md p-4">
      <div className="max-w-7xl mx-auto flex justify-center items-center gap-3">
          <div className="h-[50px] w-[50px]">
          <img width="94" height="94" src="https://img.icons8.com/3d-fluency/94/security-checked.png" alt="security-checked"/>
        </div>
        <span className="text-2xl md:text-3xl font-extrabold tracking-wide text-green-500">
          Password <span className="text-green-400">Manager</span>
        </span>
      </div>
    </nav>
  );
};
export default Navbar;