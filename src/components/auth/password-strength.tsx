import { cn } from "~/utils/cn";

interface PasswordStrengthProps {
  passStrength: number;
}

export const PasswordStrength = ({ passStrength }: PasswordStrengthProps) => {
  return (
    <div className="col-span-2 flex flex-col gap-2">
      <div className="col-span-2 ml-3 flex">
        {Array.from({ length: passStrength + 1 }).map((i, index) => (
          <div
            key={index}
            className={cn("-ml-2 h-2 w-16 rounded-md", {
              "bg-red-500": passStrength === 0,
              "bg-orange-500": passStrength === 1,
              "bg-yellow-500": passStrength === 2,
              "bg-green-500": passStrength === 3,
            })}
          ></div>
        ))}
      </div>
    </div>
  );
};
