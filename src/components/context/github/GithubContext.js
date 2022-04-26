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

  const [state, dispath] = useReducer(GithubReducer, initialState);

  // // Get initial users (testing purposes)
  // const fetchUsers = async () => {
  //   setLoading();
  //   const response = await fetch(`${GITHUB_URL}/users`, {});
  //   // headers: {
  //   //   Authorization: `token ${GITHUB_TOKEN}`,
  //   // },
  //   const data = await response.json();
  //   console.log(data);
  //   // setUsers(data);
  //   // setLoading(false);
  //   dispath({
  //     type: "GET_USERS",
  //     payload: data,
  //   });
  // };

  // Get initial users (testing purposes)
  const searchUsers = async (text) => {
    setLoading();
    const params = new URLSearchParams({ q: text });
    const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {});
    // headers: {
    //   Authorization: `token ${GITHUB_TOKEN}`,
    // },
    const { items } = await response.json();
    console.log(items);
    // setUsers(data);s
    // setLoading(false);
    dispath({
      type: "GET_USERS",
      payload: items,
    });
  };

  // get single user
  const getUser = async (login) => {
    setLoading();
    // const params = new URLSearchParams({ q: text });
    const response = await fetch(`${GITHUB_URL}/users/${login}`, {});
    // headers: {
    //   Authorization: `token ${GITHUB_TOKEN}`,
    // },
    if (response.status == 404) {
      window.location = "/notfound";
    } else {
      const data = await response.json();
      console.log(data);

      dispath({
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
    if (response.status == 404) {
      window.location = "/notfound";
    } else {
      const data = await response.json();
      console.log(data);

      dispath({
        type: "SET_USER_REPOS",
        payload: data,
      });
    }
  };

  // Set loading true
  const setLoading = () => {
    dispath({
      type: "SET_LOADING",
    });
  };

  const clearUsers = () => {
    dispath({
      type: "CLEAR_USERS",
    });
  };

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        loading: state.loading,
        repos: state.repos,
        searchUsers,
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
