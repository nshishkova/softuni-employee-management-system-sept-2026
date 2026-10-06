import { useState, useEffect } from "react";

import Footer from "./components/Footer";
import Header from "./components/Header";
import Pagination from "./components/Pagination";
import UserList from "./components/UserList";
import UserSearch from "./components/UserSearch";
import "./styles.css";
import SaveUserModal from "./components/SaveUserModal";

const baseUrl = "https://nqvhvftqizfpdofbwzgz.supabase.co/rest/v1/users";
const apiKey = "sb_publishable_KCjKFPZr5cp80Hzc382tKg_3ceDWVu4";

function App() {


    const [users, setUsers] = useState([]);
    const [showSaveUserModal, setShowSaveUserModal] = useState(false);

    useEffect(() => {
        // Fetch users from API or any other source and update the state
        fetchUsers()
            .then((data) => setUsers(data))
            .catch((error) => console.error("Error fetching users:", error));
    }, []);

    const addUserClickHandler = () => {
        setShowSaveUserModal(true);
    };

    const addUserCloseHandler = () => {
        setShowSaveUserModal(false);
    };

    const submitUserHandler = async (user) => {
        try {
        // Handle form submission logic here
        await fetch(baseUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "apikey": apiKey
            },
            body: JSON.stringify(user)
        })
        const updatedUsers = await fetchUsers();
        setUsers(updatedUsers);
    } catch (error) {
        alert("Error submitting user:" + error);
    } finally {
        setShowSaveUserModal(false);
    }
    };

  return (
    <>
      <Header />

      <main className="main">
        <section className="card users-container">
          <UserSearch />

          <UserList users = {users} />

          <button className="btn-add btn" onClick={addUserClickHandler}>
            Add new user
          </button>
          {showSaveUserModal && <SaveUserModal onClose={addUserCloseHandler} onSubmit={submitUserHandler}  />}

          <Pagination />
        </section>
      </main>
      <Footer />
    </>
  );
}

async function fetchUsers() {
    const response = await fetch(baseUrl, {
        headers: {
            "apikey": apiKey    
        }
    });
    const data = await response.json();
    return data;
}

export default App;
