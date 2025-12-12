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
const searchInput = document.getElementById("search");

let allPosts = [];
let filteredPosts = [];

async function loadAllPosts() {
    loader.classList.remove("hidden");
    try {
        const response = await fetch(`${BASE_URL}/posts`);
        if (!response.ok) throw new Error("Failed to fetch posts");
        allPosts = await response.json();
        filteredPosts = [...allPosts];

        const savedId = localStorage.getItem("postId");
        if (savedId) {
            const index = allPosts.findIndex(post => post.id === Number(savedId));
            postId = index >= 0 ? index : 0;
        } else {
            postId = 0;
        }

        showPost(postId);
    } catch (error) {
        console.log(error);
    } finally {
        loader.classList.add("hidden");
    }
}

function showPost(index) {
    if (filteredPosts.length === 0) {
        card.classList.add("hidden");
        return;
    }

    const post = filteredPosts[index];
    titleEl.textContent = post.title;
    bodyEl.textContent = post.body;
    card.classList.remove("hidden");

    validateButtons();
    saveId();
}

function validateButtons() {
    prevBtn.disabled = postId <= 0;
    nextBtn.disabled = postId >= filteredPosts.length - 1;
}

function saveId() {
    const post = filteredPosts[postId];
    if (post) localStorage.setItem("postId", post.id);
}

function applySearch(query) {
    const text = query.toLowerCase();
    filteredPosts = allPosts.filter(post =>
        post.title.toLowerCase().includes(text) || post.body.toLowerCase().includes(text)
    );

    postId = 0;
    showPost(postId);
}

prevBtn.onclick = () => {
    if (postId > 0) {
        postId--;
        showPost(postId);
    }
};

nextBtn.onclick = () => {
    if (postId < filteredPosts.length - 1) {
        postId++;
        showPost(postId);
    }
};

searchInput.addEventListener("input", (e) => {
    applySearch(e.target.value);
});

document.addEventListener("DOMContentLoaded", () => {
    loadAllPosts();
});
