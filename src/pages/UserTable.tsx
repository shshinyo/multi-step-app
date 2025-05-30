import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useNavigate } from "react-router-dom";
import { User } from "../types";

const UserTable = () => {
  const users = useSelector((state: RootState) => state.users);
  const workerPreferences = useSelector((state: RootState) => state.users);
  const navigate = useNavigate();

  const handleBackToStep1 = () => {
    navigate("/step1");
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md mt-8 text-gray-900 dark:text-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Submitted Users</h2>
        <button
          onClick={handleBackToStep1}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
        >
          + Add New User
        </button>
      </div>

      {users.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 py-8 text-lg">
          There are no users yet.
        </p>
      ) : (
        <div className="overflow-auto max-h-[70vh]">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-gray-100 dark:bg-gray-800 text-left">
              <tr>
                <th className="p-2 border border-gray-300 dark:border-gray-700">
                  Name
                </th>
                <th className="p-2 border border-gray-300 dark:border-gray-700">
                  Email
                </th>
                <th className="p-2 border border-gray-300 dark:border-gray-700">
                  Address
                </th>
                <th className="p-2 border border-gray-300 dark:border-gray-700">
                  Preferences
                </th>
                <th className="p-2 border border-gray-300 dark:border-gray-700">
                  Marital Status
                </th>
                <th className="p-2 border border-gray-300 dark:border-gray-700">
                  Spouse
                </th>
                <th className="p-2 border border-gray-300 dark:border-gray-700">
                  Dependents
                </th>
                <th className="p-2 border border-gray-300 dark:border-gray-700">
                  Photo
                </th>
                <th className="p-2 border border-gray-300 dark:border-gray-700">
                  Workers
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: User, idx: number) => (
                <tr
                  key={idx}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="p-2 border border-gray-300 dark:border-gray-700">
                    {user.name}
                  </td>
                  <td className="p-2 border border-gray-300 dark:border-gray-700">
                    {user.email}
                  </td>
                  <td className="p-2 border border-gray-300 dark:border-gray-700">
                    {user.address}
                  </td>
                  <td className="p-2 border border-gray-300 dark:border-gray-700">
                    {Array.isArray(user.preferences)
                      ? user.preferences.join(", ")
                      : user.preferences}
                  </td>
                  <td className="p-2 border border-gray-300 dark:border-gray-700">
                    {user.maritalStatus}
                  </td>
                  <td className="p-2 border border-gray-300 dark:border-gray-700">
                    {user.spouseName || "-"}
                  </td>
                  <td className="p-2 border border-gray-300 dark:border-gray-700">
                    {user.dependents?.map((d) => d.name).join(", ") || "-"}
                  </td>
                  <td className="p-2 border border-gray-300 dark:border-gray-700">
                    {user.profilePhoto ? (
                      <img
                        src={user.profilePhoto}
                        alt="profile"
                        className="w-16 h-16 object-cover rounded"
                      />
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="p-2 border border-gray-300 dark:border-gray-700">
                    {user.workersPreferences?.map((d) => d.name).join(", ") ||
                      "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserTable;
