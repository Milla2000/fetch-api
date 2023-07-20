const selectElement = document.getElementById("userSelect");

let option;
function fetchUsersIntoSelect() {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((users) => {
      users.forEach((user) => {
        option = document.createElement("option");
        option.value = user.id;
        option.text = user.name;
        selectElement.appendChild(option);

        option.addEventListener("click", () => {
          fetchProfile(user.id);
          console.log(user.id);
        });
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

function fetchProfile(uid) {
  fetch(`https://jsonplaceholder.typicode.com/users/${uid}`)
    .then((response) => response.json())
    .then((user) => {
      console.log(user);
      var profileHtml = ``;
      profileHtml += `
                
                <h1>${user.name}</h1>
                <img class="user-img" src="/Gold_new.jpg.twimg.1920.jpg" alt="${user.username}">
                <p>Email: ${user.email}</p>
                <p>Username: ${user.username}</p>
                <p>Phone: ${user.phone}</p>
                <p>Website: ${user.website}</p>
                
            `;
      document.getElementById("profile").innerHTML = profileHtml;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

function fetchPosts(uid) {
  fetch(`https://jsonplaceholder.typicode.com/users/${uid}/posts`)
    .then((response) => response.json())
    .then((posts) => {
      console.log(posts);
      var postsHtml = ``;
      posts.forEach((post) => {
        postsHtml += `
                    <div class="post">
                        <h3>${post.title}</h3>
                        <img class="user-img" src="/Gold_new.jpg.twimg.1920.jpg" alt="Post Image">
                        <p>${post.body}</p>
                        <button onclick="fetchComments(${post.id})">Show Comments</button>
                        
                    </div>
                `;
      });
      document.getElementById("posts").innerHTML = postsHtml;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

let containerComment = document.querySelector(".post-comments");

function fetchComments(postid) {
  fetch(`https://jsonplaceholder.typicode.com/posts/${postid}/comments`)
    .then((response) => response.json())
    .then((comments) => {
      containerComment.innerHTML = "";
      comments.forEach((comment) => {
        console.log(comment);
        containerComment.innerHTML += `
                    <div class="comment">
                        <h4>${comment.name}</h4>
                        <p>${comment.body}</p>
                    </div>
                `;
        console.log("done");
      });
    });
}

selectElement.addEventListener("change", (event) => {
  console.log(event.target.value);
  fetchProfile(event.target.value);
  fetchPosts(event.target.value);
});

fetchUsersIntoSelect();

window.addEventListener("load", () => {
  fetchProfile(1);
  fetchPosts(1);
});
