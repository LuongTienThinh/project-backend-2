import { createContext, useState } from "react";

const UserContext = createContext();

function UserProvider({ children }) {
    const [user, setUser] = useState({});

    const value = {user: user, setUser: setUser}

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}

export {UserContext, UserProvider};