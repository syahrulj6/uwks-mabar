import { activateUser } from "~/lib/actions/auth-actions";

import Link from "next/link";

interface ActivationProps {
  params: {
    jwt: string;
  };
}

const ActivationPage = async ({ params }: ActivationProps) => {
  const result = await activateUser(params.jwt);

  return (
    <div className="-mt-16 flex h-screen flex-col items-center justify-center gap-3">
      {result === "userNotExist" ? (
        <p className="text-2xl text-red-500">The User does not exist</p>
      ) : result === "alreadyActivated" ? (
        <p className="text-2xl text-red-500">The User is already activated</p>
      ) : result === "success" ? (
        <p className="2xl text-green-500">Success! the User is now activated</p>
      ) : (
        <p className="text-2xl text-red-500">Oops! Something went wrong</p>
      )}

      <Link href="/" className="text-white">
        Back to home
      </Link>
    </div>
  );
};

export default ActivationPage;
