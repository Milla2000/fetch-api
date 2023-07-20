const selectElement = document.getElementById("userSelect");

function fetchPosts() {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((posts) => {
      posts.forEach((post) => {
        const option = new Option(post.name);
        selectElement.add(option);
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}
console.log;

fetchPosts();
