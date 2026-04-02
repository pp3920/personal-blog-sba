let Submit = document.getElementById("submitBtn");
let parentList = document.getElementById("parentList");
let errorMsg = document.getElementById("errorMsg");

let editId = null;

//loading the posts
document.addEventListener("DOMContentLoaded", displayPosts);

// adding a new posts
Submit.addEventListener("click", function (e) {
    e.preventDefault();

    let title = document.getElementById("title").value.trim();
    let content = document.getElementById("content").value.trim();

    // Doing Validation
    if (title === "" || content === "") {
        errorMsg.textContent = "Please enter both title and content!";
        return;
    }

    errorMsg.textContent = "";

    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    //Updating the posts

    if (editId) {
    
        posts = posts.map(post =>
            post.id === editId ? { ...post, title, content } : post
        );
        editId = null;
    } else {
    //creating a new posts
        let newPost = {
            id: Date.now(),
            title: title,
            content: content
        };
        posts.push(newPost);
    }

    localStorage.setItem("posts", JSON.stringify(posts));

    displayPosts();

    
    document.getElementById("title").value = "";
    document.getElementById("content").value = "";
});

// Logic for displaying the post
function displayPosts() {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];

    parentList.innerHTML = "";

    if (posts.length === 0) {
        parentList.innerHTML = `<li class="list-group-item text-center">No posts available</li>`;
        return;
    }

    posts.forEach(post => {
        let li = document.createElement("li");
        li.className = "list-group-item";

        li.innerHTML = `
            <h4>${post.title}</h4>
            <p>${post.content}</p>
            <button class="btn btn-primary btn-sm" onclick="editPost(${post.id})">Edit</button>
            <button class="btn btn-danger btn-sm" onclick="deletePost(${post.id})">Delete</button>
        `;

        parentList.appendChild(li);
    });
}

// Deleting the posts
function deletePost(id) {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];

    posts = posts.filter(post => post.id !== id);

    localStorage.setItem("posts", JSON.stringify(posts));

    displayPosts();
}

// Editing the posts
function editPost(id) {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];

    let post = posts.find(p => p.id === id);

    document.getElementById("title").value = post.title;
    document.getElementById("content").value = post.content;

    editId = id;
}

