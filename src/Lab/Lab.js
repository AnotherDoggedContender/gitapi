// const history = window.history;
// function navigate(state) {
//     const h1 = document.querySelector("h1");
//     h1.textContent = state.path.toUpperCase();
// }

// ["home", "about", "contact"].forEach((path) => {
//     const button = document.querySelector("#" + path);
//     button.addEventListener("click", () => {
//         const state = { path };
//         console.log(state);
//         console.log(path);
//         history.pushState(state, "", path);
//         navigate(state);
//     });
// });

// window.addEventListener("popstate", (event) => {
//     navigate(event.state);
// });
