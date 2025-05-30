import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="text-center mt-20 px-4 text-gray-800 dark:text-gray-100">
    <h1 className="text-5xl font-extrabold mb-4">404</h1>
    <p className="text-xl mb-6">
      Oops! The page you're looking for doesn't exist.
    </p>
    <Link
      to="/step1"
      className="inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
    >
      Go back to Step 1
    </Link>
  </div>
);

export default NotFound;
