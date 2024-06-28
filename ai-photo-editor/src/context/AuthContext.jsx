import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useReducer,
} from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
const initialState = { isAuthenticated: false, user: null };

export const AuthContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, isAuthenticated: true, user: action.payload };
    case "LOGOUT":
      return { ...state, isAuthenticated: false, user: null };
    default:
      return state;
  }
};
export default function AuthContextProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        dispatch({ type: "LOGIN", payload: user });
        console.log("user in logged in");
        // ...
      } else {
        dispatch({ type: "LOGOUT" });
        console.log("user in not logged in");
        // User is signed out
        // ...
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  return useContext(AuthContext);
};
