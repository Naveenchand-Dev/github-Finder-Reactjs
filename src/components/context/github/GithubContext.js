import { createContext, useReducer } from "react";
import GithubReducer from "./GithubReducer";

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  // const [users, setUsers] = useState([]);
  // const [loading, setLoading] = useState(true);

  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  // get single user
  const getUser = async (login) => {
    setLoading();
    // const params = new URLSearchParams({ q: text });
    const response = await fetch(`${GITHUB_URL}/users/${login}`, {});
    // headers: {
    //   Authorization: `token ${GITHUB_TOKEN}`,
    // },
    if (response.status === 404) {
      window.location = "/notfound";
    } else {
      const data = await response.json();
      console.log(data);

      dispatch({
        type: "GET_USER",
        payload: data,
      });
    }
  };

  const getUserRepos = async (login) => {
    setLoading();
    // const params = new URLSearchParams({ q: text });
    const response = await fetch(`${GITHUB_URL}/users/${login}/repos`, {});
    // headers: {
    //   Authorization: `token ${GITHUB_TOKEN}`,
    // },
    if (response.status === 404) {
      window.location = "/notfound";
    } else {
      const data = await response.json();
      console.log(data);

      dispatch({
        type: "SET_USER_REPOS",
        payload: data,
      });
    }
  };

  // Set loading true
  const setLoading = () => {
    dispatch({
      type: "SET_LOADING",
    });
  };

  const clearUsers = () => {
    dispatch({
      type: "CLEAR_USERS",
    });
  };

  return (
    <GithubContext.Provider
      value={{
        ...state,
        dispatch,
        clearUsers,
        getUser,
        getUserRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
