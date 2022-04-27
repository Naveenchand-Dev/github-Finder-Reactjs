import axios from "axios";

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

const github = axios.create({
  baseURL: GITHUB_URL,
  //   headers: {
  //     Authorization: `token ${GITHUB_TOKEN}`,
  //   },
});

// Get initial users (testing purposes)
export const searchUsers = async (text) => {
  const params = new URLSearchParams({ q: text });

  // Using axios to make a request to the github api
  const response = await github.get("/search/users", { params });
  return response.data.items;

  // Using fetch instead of axios
  //   const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {});
  //   // headers: {
  //   //   Authorization: `token ${GITHUB_TOKEN}`,
  //   // },
  //   const { items } = await response.json();
  //   console.log(items);
  //   // setUsers(data);s
  //   // setLoading(false);
  //   return items;
};

// Get user data and REPOS
export const getUserAndRepos = async (login) => {
  const [user, repos] = await Promise.all([
    github.get(`/users/${login}`),
    github.get(`/users/${login}/repos`),
  ]);
  return { user: user.data, repos: repos.data };
};

// // get single user
// export const getUser = async (login) => {
//   // const params = new URLSearchParams({ q: text });
//   const response = await fetch(`${GITHUB_URL}/users/${login}`, {});
//   // headers: {
//   //   Authorization: `token ${GITHUB_TOKEN}`,
//   // },
//   if (response.status === 404) {
//     window.location = "/notfound";
//   } else {
//     const data = await response.json();
//     console.log(data);
//     return data;
//   }
// };

// export const getUserRepos = async (login) => {
//   // const params = new URLSearchParams({ q: text });
//   const response = await fetch(`${GITHUB_URL}/users/${login}/repos`, {});
//   // headers: {
//   //   Authorization: `token ${GITHUB_TOKEN}`,
//   // },
//   if (response.status === 404) {
//     window.location = "/notfound";
//   } else {
//     const data = await response.json();
//     console.log(data);
//     return data;
//   }
// };
