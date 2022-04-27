const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
// const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

// Get initial users (testing purposes)
export const searchUsers = async (text) => {
  const params = new URLSearchParams({ q: text });
  const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {});
  // headers: {
  //   Authorization: `token ${GITHUB_TOKEN}`,
  // },
  const { items } = await response.json();
  console.log(items);
  // setUsers(data);s
  // setLoading(false);
  return items;
};

// get single user
export const getUser = async (login) => {
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
    return data;
  }
};

export const getUserRepos = async (login) => {
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
    return data;
  }
};
