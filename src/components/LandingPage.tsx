// LandingPage.tsx
import React from "react";
import UserStore from "../store/store";

const LandingPage: React.FC = () => {
  const { sessionToken } = UserStore();

  return (
    <div className="flex relative flex-col items-center justify-center h-[500px] w-full bg-gray-900 text-white">
      <div className="grid grid-cols-3 grid-rows-3 gap-4 p-4 w-full h-full">
        {Array.from({ length: 9 }).map((_, index) => (
          <div
            key={index}
            className="bg-gray-700 bg-opacity-30 rounded-md animate-shine w-full  h-full"
            style={{
              animationDelay: `${index * 0.1}s`,
            }}
          ></div>
        ))}
      </div>
      <div className="absolute w-full top-58 left-0">
        {/* <h1 className="text-3xl  font-bold">Welcome to VidSynth</h1> */}
        <h1 className="text-5xl text-center  font-bold  relative">
          Welcome to{" "}
          <span className="text-transparent bg-gradient-to-r bg-clip-text from-green-400 to-blue-500 animate-wave">
            YouTube Summariser
          </span>
        </h1>
        {!sessionToken && (
          <>
            <p className="mt-4 text-xl text-center ">
              <div className="flex items-center justify-center gap-4">
                <a
                  href="#/login"
                  className="px-8 py-1 bg-blue-600 text-white  rounded"
                >
                  Log In
                </a>
                <a
                  href="#/signup"
                  className="px-8 py-1 bg-blue-600 text-white  rounded"
                >
                  SignUp
                </a>
              </div>
            </p>
          </>
        )}
        <p className="mt-4 text-xl text-center ">
          Get Started with summarising your videos.
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
