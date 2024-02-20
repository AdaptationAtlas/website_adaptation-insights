const Spinner = ({ className }: any) => {
  return (
    <div className={`${className} flex justify-center items-center`}>
      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-grey-300"></div>
    </div>
  );
};

export default Spinner;
