import Link from "next/link";

const NotFound = () => {
  return (
    <div className="m-auto mt-12 flex max-w-screen-lg justify-center px-5">
      <div className="flex w-full flex-col items-center gap-5">
        <h2>Page Not Found</h2>
        <p>Could not find requested resource</p>
        <Link
          className="text-2xl font-semibold text-primary hover:underline"
          href="/"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
