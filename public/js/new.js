const newFormHandler = async function (event) {
  event.preventDefault();

  const title = document.querySelector('input[name="blog_name"]').value;
  const body = document.querySelector('textarea[name="blog_text"]').value;

  const token = localStorage.getItem("token");
  await fetch(`/api/post`, {
    method: "POST",
    body: JSON.stringify({
      title,
      body,
    }),
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });

  document.location.replace("/dashboard");
};

document
  .querySelector("#new-post-form")
  .addEventListener("submit", newFormHandler);
