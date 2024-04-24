import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [quiz, setQuiz] = useState([]);
  const [user, setUser] = useState(null);

  const storeTokenInLocalStorage = (serverToken) => {
    setToken(serverToken);
    localStorage.setItem("token", serverToken);
  };

  const logoutUser = () => {
    setToken("");
    localStorage.removeItem("token");
    setUser(null); // Clear user data on logout
  };

  /* user authentication */
  const userAuthentication = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        console.log("Failed to fetch user data. Response:", response);
        setUser(null); // Clear user data if authentication fails
      }
    } catch (error) {
      console.log("Error fetching user data:", error);
      setUser(null); // Clear user data on error
    }
  };

  useEffect(() => {
    userAuthentication();
  }, [token]);

  /* get all quizz */
  const getQuizz = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/all-quizz`, {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        setQuiz(data.quizData);
      }
    } catch (error) {
      console.log(`Error fetching quiz data: ${error}`);
    }
  };

  useEffect(() => {
    getQuizz();
  }, []);
  // useEffect(() => {
  // }, [quiz]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        storeTokenInLocalStorage,
        logoutUser,
        user,
        quiz,
        getQuizz,
        setQuiz,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return authContext;
};
