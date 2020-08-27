// signup function. Paste over to login/logout once done.
const manageSignup = async function (event) {
  event.preventDefault();
  const pwEl = document.querySelector("#password-input-signup");
  const userEl = document.querySelector("#username-input-signup");
  //fetch user/register endpoint
  fetch("user_routes/register", {
    method: "post",
    body: JSON.stringify({
      username: userEl.value,
      password: pwEl.value,
    }),
    headers: {
      "content-type": "application/JSON",
    }
      .then(function () {
        document.location.replace("/dashboard");
      })
      .catch((err) => console.error(err)),
  });
};

document.querySelector("#signup-form").addEventListener("submit", manageSignup);
