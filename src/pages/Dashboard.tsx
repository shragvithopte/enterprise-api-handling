import { useState } from "react";
import { getUsers, addUser } from "../services/userService";
import LoadingSkeleton from "../components/LoadingSkeleton";
import EmptyState from "../components/EmptyState";
import { useNotification } from "../context/NotificationContext";

function Dashboard() {
  const notify = useNotification();

  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleGetUsers = async () => {
    setLoading(true);

    try {
      const data = (await getUsers()) as any[];

      setUsers((prev) => {
        const merged = [
          ...data,
          ...prev.filter(
            (u) => !data.some((d) => d.email === u.email)
          ),
        ];

        return merged;
      });

      notify.success("Users Loaded");
    } catch {
      notify.error("Failed to Load Users");
    }

    setLoading(false);
  };

  const handleAddUser = async () => {
    if (!name || !email) {
      notify.warning("Please enter name and email");
      return;
    }

    try {
      await addUser();

      const newUser = {
        id: users.length + 1,
        name,
        email,
      };

      setUsers((prev) => [...prev, newUser]);

      setName("");
      setEmail("");

      notify.success("User Added Successfully");
    } catch {
      notify.error("Failed to Add User");
    }
  };

  const trigger401 = () => {
    localStorage.removeItem("authToken");

    notify.warning("Session Expired");

    setTimeout(() => {
      window.location.href = "/session-expired";
    }, 1000);
  };

  const trigger403 = () => {
    notify.error("Access Denied");
  };

  const trigger500 = () => {
    notify.error("Server Error");
  };

  return (
    <div className="container">
      <div className="card">
  <h1>Enterprise API Dashboard</h1>
  <p>Welcome Admin User</p>
</div>

      <div className="card">

      <h3>Add User</h3>

      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginRight: "10px", padding: "8px" }}
      />

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginRight: "10px", padding: "8px" }}
      />

      <button onClick={handleAddUser}>
        Add User
      </button>

      </div>

     <div className="card">
  <h3>API Actions</h3>

  <button onClick={handleGetUsers}>
    Get Users
  </button>

  <button
    onClick={trigger401}
    style={{ marginLeft: "10px" }}
  >
    Trigger 401
  </button>

  <button
    onClick={trigger403}
    style={{ marginLeft: "10px" }}
  >
    Trigger 403
  </button>

  <button
    onClick={trigger500}
    style={{ marginLeft: "10px" }}
  >
    Trigger 500
  </button>
</div>

      {loading && <LoadingSkeleton />}

      {!loading && users.length === 0 && (
        <EmptyState />
      )}

      {!loading && users.length > 0 && (
  <div className="card">
    <h3>User List</h3>
        <table
          border={1}
          cellPadding={10}
          style={{
            marginTop: "20px",
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}
    </div>
  );
}

export default Dashboard;