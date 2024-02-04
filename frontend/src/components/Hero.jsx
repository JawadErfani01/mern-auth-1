const Hero = () => {
  return (
    <div className="py-5">
      <div className="flex justify-center">
        <div className="p-5 flex flex-col items-center bg-light w-3/4 md:w-1/2">
          <h1 className="text-center mb-4 text-4xl font-bold">
            MERN Authentication
          </h1>
          <p className="text-center mb-4">
            This is a boilerplate for MERN authentication that stores a JWT in
            an HTTP-Only cookie. It also uses Redux Toolkit and the Tailwind CSS
            library
          </p>
          <div className="flex">
            <a
              href="/login"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-3"
            >
              Sign In
            </a>
            <a
              href="/register"
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Register
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
