import { useState, useEffect, useRef } from "react";
import {
  FiMenu,
  FiUser,
  // FiInfo,
  // FiMail,
  FiX,
  // FiLogIn,
  FiHome,
} from "react-icons/fi";
import { MdSummarize } from "react-icons/md";
import useUserStore from "../store/store";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const { username } = useUserStore();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);
  return (
    <header className="flex justify-between h-[50px] items-center p-4 border-b border-gray-200">
      <div className=" w-full flex items-center justify-between">
        <button
          className="text-xl text-gray-600 focus:outline-none z-50"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <FiX size={30} color="white" />
          ) : (
            <FiMenu color="#172453" size={30} />
          )}
        </button>
        <div className=" font-semibold text-blue-950 text-2xl">
          YouTube Summariser
        </div>
      </div>
      {isMenuOpen && (
        <nav
          className="fixed top-0 left-0 w-[40%]  h-full bg-[#23282e] z-20 transition duration-500 ease-in-out  flex justify-end"
          // onClick={toggleMenu}
          ref={menuRef}
        >
          <ul className="flex flex-col gap-2 mt-20 space-y-4 w-full">
            <li className="flex items-center text-white  px-4 py-2">
              {username && (
                <>
                  <FiUser size={20} className="mr-4" />
                  <span>Hi, {username}</span>{" "}
                </>
              )}
            </li>
            <a href="#/">
              <li
                className="flex items-center text-white  hover:bg-gray-700 px-4 py-2 rounded cursor-pointer transition duration-500 ease-in-out"
                onClick={toggleMenu}
              >
                <FiHome className="mr-4" size={20} />
                Home
              </li>
            </a>
            {/* {!username && (
              <>
                {" "}
                <a href="#/login">
                  <li
                    className="flex items-center text-white  hover:bg-gray-700 px-4 py-2 rounded cursor-pointer transition duration-500 ease-in-out"
                    onClick={toggleMenu}
                  >
                    <FiLogIn className="mr-4" size={20} />
                    Log In
                  </li>
                </a>
                <a href="#/signup">
                  <li
                    className="flex items-center text-white  hover:bg-gray-700 px-4 py-2 rounded cursor-pointer transition duration-500 ease-in-out"
                    onClick={toggleMenu}
                  >
                    <FiLogIn className="mr-4" size={20} />
                    Sign Up
                  </li>
                </a>
              </>
            )} */}
            <a href="#/summary">
              <li
                className="flex items-center text-white  hover:bg-gray-700 px-4 py-2 rounded cursor-pointer transition duration-500 ease-in-out"
                onClick={toggleMenu}
              >
                <MdSummarize className="mr-4" size={20} />
                Summarize
              </li>
            </a>
            {/* <li
              className="flex items-center text-white  hover:bg-gray-700 px-4 py-2 rounded cursor-pointer transition duration-500 ease-in-out"
              onClick={toggleMenu}
            >
              <FiInfo className="mr-4" size={20} />
              <a href="#/about">About US</a>
            </li>
            <li
              className="flex items-center text-white  hover:bg-gray-700 px-4 py-2 rounded cursor-pointer transition duration-500 ease-in-out"
              onClick={toggleMenu}
            >
              <FiMail className="mr-4" size={20} />
              <a href="#/contact">Contact Us</a>
            </li> */}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
