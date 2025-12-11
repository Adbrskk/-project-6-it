const BASE_URL = "https://jsonplaceholder.typicode.com";

let postId = 1;

async function getPost(id) {
    try {
        const response = await fetch(`${BASE_URL}/posts/${id}`);
        if (!response.ok) {
            throw new Error("Faild to fetch post");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

const titleEl = document.getElementById("title");
const bodyEl = document.getElementById("body");
const card = document.getElementById("card");
const loader = document.getElementById("loader");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

async function loadCard(id) {
    card.classList.add("hidden");
    loader.classList.remove("hidden");

    const data = await getPost(id);

    setTimeout(() => {   
        loader.classList.add("hidden");
        card.classList.remove("hidden");
        titleEl.textContent = data.title;
        bodyEl.textContent = data.body;
    }, 400);
}

loadCard(postId);


prevBtn.onclick = () => {
    if (postId > 1) {
        postId--;
        loadCard(postId);
    }
};

nextBtn.onclick = () => {
    if (postId < 100) { 
        postId++;
        loadCard(postId);
    }
};

// 1. validation for switchers < >
function validateButtons() {
    prevBtn.disabled = postId === 1;
    nextBtn.disabled = postId === 100;
}

validateButtons();

// 2. localStorage
// 3. loading
// 4**. dynamic search {title, body}