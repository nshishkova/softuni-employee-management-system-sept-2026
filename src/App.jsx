import { useState, useEffect } from "react";
import { fetchUsers } from "./api/usersApi.js";

import Footer from "./components/Footer";
import Header from "./components/Header";
import Pagination from "./components/Pagination";
import UserList from "./components/UserList";
import UserSearch from "./components/UserSearch";
import "./styles.css";
import SaveUserModal from "./components/SaveUserModal";
import Spinner from "./components/Spinner.jsx";

const baseUrl = "https://nqvhvftqizfpdofbwzgz.supabase.co/rest/v1/users";
const apiKey = "sb_publishable_KCjKFPZr5cp80Hzc382tKg_3ceDWVu4";

function App() {


    const [users, setUsers] = useState([]);
    const [showSaveUserModal, setShowSaveUserModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Fetch users from API or any other source and update the state
        fetchUsers()
            .then((data) => setUsers(data))
            .catch((error) => 
                console.error("Error fetching users:", error)
        )
        .finally(() => setIsLoading(false));
    }, []);

    const addUserClickHandler = () => {
        setSelectedUserId(null);
        setEditMode(false);
        setShowSaveUserModal(true);
    };

    const addUserCloseHandler = () => {
        setShowSaveUserModal(false);
        setSelectedUserId(null);
        setEditMode(false);
    };

    const editUserHandler = (userId) => {
        setSelectedUserId(userId);
        setEditMode(true);
        setShowSaveUserModal(true);
    };

    const userUpdateHandler = async () => {
  try {
    const updatedUsers = await fetchUsers();
    setUsers(updatedUsers);
  } catch (error) {
    alert("Error updating user list: " + error);
  }
};

 const submitUserHandler = async (user) => {
  try {
    let response;

    if (editMode) {
      // EDIT existing user
      response = await fetch(
        `${baseUrl}?id=eq.${selectedUserId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            apikey: apiKey,
          },
          body: JSON.stringify(user),
        }
      );
    } else {
      // CREATE new user
      response = await fetch(baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: apiKey,
        },
        body: JSON.stringify(user),
      });
    }

    if (!response.ok) {
      throw new Error("Failed to save user");
    }

    const updatedUsers = await fetchUsers();
    setUsers(updatedUsers);

    setShowSaveUserModal(false);
    setSelectedUserId(null);
    setEditMode(false);

  } catch (error) {
    alert("Error submitting user: " + error);
  }
};

  return (
    <>
      <Header />

      <main className="main">
        <section className="card users-container">
          <UserSearch />
          {isLoading ? (
  <Spinner />
) : (
  <UserList
    users={users}
    onEdit={editUserHandler}
    onUserUpdate={userUpdateHandler}
  />
)}

          <button className="btn-add btn" onClick={addUserClickHandler}>
            Add new user
          </button>
          {showSaveUserModal && <SaveUserModal userId={selectedUserId} editMode={editMode} users={users} onClose={addUserCloseHandler} onSubmit={submitUserHandler}  />}

          <Pagination />
        </section>
      </main>
      <Footer />
    </>
  );
}


export default App;
