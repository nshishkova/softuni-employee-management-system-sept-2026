import { useState, useEffect } from "react";

import Footer from "./components/Footer";
import Header from "./components/Header";
import Pagination from "./components/Pagination";
import UserList from "./components/UserList";
import UserSearch from "./components/UserSearch";
import "./styles.css";
import SaveUserModal from "./components/SaveUserModal";

function App() {
    const [users, setUsers] = useState([]);
    const [showSaveUserModal, setShowSaveUserModal] = useState(false);

    useEffect(() => {
        // Fetch users from API or any other source and update the state
        fetch("https://nqvhvftqizfpdofbwzgz.supabase.co/rest/v1/users", {
            headers: {
                "apikey": "sb_publishable_KCjKFPZr5cp80Hzc382tKg_3ceDWVu4"
            }
    })
            .then((response) => response.json())
            .then((data) => setUsers(data))
            .catch((error) => console.error("Error fetching users:", error));
    }, []);

    const addUserClickHandler = () => {
        setShowSaveUserModal(true);
    };

    const addUserCloseHandler = () => {
        setShowSaveUserModal(false);
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
          {showSaveUserModal && <SaveUserModal onClose={addUserCloseHandler} />}

          <Pagination />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default App;
