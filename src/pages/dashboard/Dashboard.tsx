import { useSendLogoutMutation } from "@/redux/features/auth/authApiSlice";
import { useGetUsersQuery } from "@/redux/features/users/usersApiSlice";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";

// Define User interface
interface User {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const {
    data: users,
    isError,
    error,
    isLoading,
    isSuccess,
  } = useGetUsersQuery(null);

  const [sendLogout] = useSendLogoutMutation();

  const formatDate = (dateString: string) => {
    const match = dateString.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (!match) return "Invalid date format";

    const year = match[1];
    const month = match[2];
    const day = match[3];

    return `${year}/${month}/${day}`;
  };

  const handleLogout = async () => {
    try {
      await sendLogout({}).unwrap(); // Pass an empty object as an argument
      Cookies.remove("accessToken");
      navigate("/auth/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button type="button" onClick={handleLogout}>
        Logout
      </button>
      {isLoading && !isError && <p>Loading...</p>}
      {isError && (
        <p>
          {"data" in error
            ? (error as { data: { message: string } }).data.message
            : ""}
        </p>
      )}
      {!isLoading && isSuccess && users && users.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Created At</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            {users.map(
              (
                user: User // Specify the User type here
              ) => (
                <tr key={user._id}>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td>{user.email}</td>
                  <td>{formatDate(user.createdAt)}</td>
                  <td>{formatDate(user.updatedAt)}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Dashboard;
