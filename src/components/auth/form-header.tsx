interface HeaderProps {
  label: string;
}

export const FormHeader = ({ label }: HeaderProps) => {
  return (
    <div className="flex w-full flex-col items-center justify-center ">
      <h1 className="text-white text-3xl font-semibold">{label}</h1>
    </div>
  );
};
