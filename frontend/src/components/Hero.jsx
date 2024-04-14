const Hero = () => {
  return (
    <div className="py-5">
      <div className="flex justify-center">
        <div className="p-5 flex flex-col items-center bg-light w-3/4 md:w-1/2">
          <h1 className="text-center mb-4 text-4xl font-bold">
            MERN Authentication
          </h1>
          <p className="text-center ">
            This is a boilerplate for MERN authentication that stores a JWT in
            an HTTP-Only cookie. It also uses Redux Toolkit and the Tailwind CSS
            library
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
