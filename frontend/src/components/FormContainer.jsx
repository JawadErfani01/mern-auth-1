const FormContainer = ({ children }) => {
  return (
    <div className="container mx-auto mt-5">
      <div className="flex justify-center">
        <div className="card p-5 w-full md:w-1/2">{children}</div>
      </div>
    </div>
  );
};

export default FormContainer;
