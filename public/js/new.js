const newFormHandler = async function (event) {
  event.preventDefault();

  const title = document.querySelector("#post-title").value;
  const body = document.querySelector('textarea[name="post-body"]').value;
  console.log(title);
  console.log(body);

  const token = localStorage.getItem("token");
  const response = await fetch(`/api/blog`, {
    method: "POST",
    body: JSON.stringify({
      blog_name: title,
      body: body,
    }),
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) {
    document.location.replace("/");
  }
};

document
  .querySelector("#new-post-form")
  .addEventListener("submit", newFormHandler);
