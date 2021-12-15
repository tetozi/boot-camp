const login = async (username, password) => {
    try {
        const res = await axios({
            method: "POST",
            url: "http://127.0.0.1:3000/api/v1/users/login",
            data: {
              username,
              password,
            },
          });
          console.log(res);
    } catch (err) {
        console.log(err.response.data);
    }
 
};

document.getElementById("login-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  login(username, password);
  console.log(username, password);
});
