(function () {
  const example = document.getElementById("example");
  const cw1 = document.getElementById("cw1");
  const cw2 = document.getElementById("cw2");
  const cw3 = document.getElementById("cw3");
  const answer = document.getElementById("answer");
  const list = document.getElementById("list");
  const add = document.getElementById("add");
  const popup = document.getElementById("popup");
  const json = document.getElementById("json");
  const putBtn = document.getElementById("put");
  const patchBtn = document.getElementById("patch");
  const deleteBtn = document.getElementById("delete");

  const apiURL = "https://6ae8bf021a7b15aaa50f6d8d.mockapi.io/api/v1/users";

  example.addEventListener("click", function () {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((array) => {
        console.log(array);
        answer.innerHTML = JSON.stringify(array);
      });
  });

  cw1.addEventListener("click", function () {
    answer.innerHTML = "Loading...";
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((array) => {
        console.log(array);
        let html = "<ul>";
        array.forEach((element) => {
          html += `<li>${element.id}. ${element.title} <br> ${element.body}</li>`;
        });
        html += "</ul>";
        setTimeout(() => {
          answer.innerHTML += html;
        }, 2000);
      });
  });

  list.addEventListener("change", () => {
    let id = list.value;
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => response.json())
      .then((element) => {
        let html = `<ul><li>${element.id}. ${element.title} <br> ${element.body}</li></ul>`;
        answer.innerHTML = html;
      });
  });

  add.addEventListener("click", () => {
    answer.innerHTML = "Processing...";
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        title: "test",
        body: "test testowy 123",
        userId: 1,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        setTimeout(() => {
          answer.innerHTML = `Dodano nowy post o ID = ${res.id}`;
        }, 2000);
      });
  });

  cw2.addEventListener("click", function () {
    popup.classList.add("visible");
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((array) => {
        setTimeout(() => {
          let html = `
              <table style="width: 100%; border-collapse: collapse; text-align: center;">
                  <tr>
                      <th>ID</th>
                      <th>Tytuł</th>
                      <th>Treść</th>
                  </tr>
          `;
          array.forEach((post) => {
            html += `
                  <tr id="${post.id}">
                      <td>${post.id}</td>
                      <td style="color: red;">${post.title}</td>
                      <td style="color: green;">${post.body}</td>
                  </tr>
              `;
          });
          html += "</table>";
          answer.innerHTML = html;

          answer.querySelectorAll("tr[id]").forEach((row) => {
            row.addEventListener("click", () => {
              const post = array.find((p) => p.id === Number(row.id));
              console.log(post);
            });
          });
          popup.classList.remove("visible");
        }, 2000);
      });
  });

  cw3.addEventListener("click", function () {
    fetch(apiURL)
      .then((response) => response.json())
      .then((array) => {
        let html = `<table style="width: 100%; border-collapse: collapse; text-align: center;">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Create date</th>
          </tr>`;
        array.forEach((element) => {
          html += `
            <tr>
              <td>${element.id}</td>
              <td>${element.name}</td>
              <td>${element.email}</td>
              <td>${element.createdAt}</td>
            </tr>
          `;
        });
        html += "</table>";
        answer.innerHTML = html;
      });
  });

  json.addEventListener("click", () => {
    fetch(
      `https://raw.githubusercontent.com/robertposzelezny/2_3-server/main/db.json`,
    )
      .then((response) => response.json())
      .then((data) => {
        let html = `<table style="width: 100%; border-collapse: collapse; text-align: center;">
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Body</th>
              <th>Author</th>
            </tr>`;
        data.posts.forEach((element) => {
          html += `
                <tr>
                    <td>${element.id}</td>
                    <td>${element.title}</td>
                    <td>${element.body}</td>
                    <td>${element.author}</td>
                </tr>
            `;
        });
        html += "</table>";
        answer.innerHTML = html;
      });
  });
  putBtn.addEventListener("click", () => {
    answer.innerHTML = "Processing...";
    fetch("https://jsonplaceholder.typicode.com/posts/1", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        id: 1,
        title: "tytul po aktualizacji",
        body: "jakas nowa tresc",
        userId: 1,
      }),
    })
      .then((response) => response.json())
      .then((post) => {
        answer.innerHTML = `Zaktualizowano post ID=1: ${post.title}.`;
      });
  });

  patchBtn.addEventListener("click", () => {
    answer.innerHTML = "Processing...";
    fetch("https://jsonplaceholder.typicode.com/posts/1", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ title: "tytul po patch" }),
    })
      .then((response) => response.json())
      .then((post) => {
        answer.innerHTML = `Post po patch: ${post.id} ${post.title} <br>${post.body} ${post.author}`;
      });
  });

  deleteBtn.addEventListener("click", () => {
    answer.innerHTML = "Processing...";
    fetch("https://jsonplaceholder.typicode.com/posts/1", {
      method: "DELETE",
    }).then((response) => {
      answer.innerHTML = `Post o id = 1 usuniety (status: ${response.status})`;
    });
  });
})();
