import React, {
    createContext, useState, useContext
} from 'react';

export const userContext = createContext();
export const useUser = () => useContext(userContext);

function UserProvider(props) {
    const { children } = props;

    const [user, setUser] = useState();

    const signIn = (userData) => setUser(userData);

    const signOut = () => setUser(undefined);

    return (
        <userContext.Provider value={{ user, signIn, signOut }}>
            {children}
        </userContext.Provider>
    );
}

export default UserProvider;