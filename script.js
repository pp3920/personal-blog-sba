const postTitle = document.getElementById('ptitle');
console.log(postTitle);
const postContent = document.getElementById('pcontent');
const submit = document.getElementById('submit');
const container = document.querySelector(".postContainer");



const posts = [];
submit.addEventListener("click", function () {
    e.preventDefault();
    debugger;


    let pstvar = postTitle.value;
    let pstcontent = postContent.value;

    if (pstvar === "" || pstcontent === "") {
        console.log("Please fill the post")
    }

    let PostObj = {
        titleobj: pstvar,
        titleContent: pstcontent,
    }

    posts.push(PostObj);

    const DisplayList = document.createElement("li");
    DisplayList.innerText = 'Post: ${titleObj}, Post Content: ${titleContent}'

    container.appendChild(DisplayList);

    console.log("container: " + container);



});




