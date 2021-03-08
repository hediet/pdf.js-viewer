document.body.innerHTML = `
    <h1>Hello World</h1>
    <iframe style="border: 0px" width="100%" height="800px" src="/viewer.html" />
`;

window.addEventListener("message", m => {
    if (m.data.event === "play-from-slide") {
        alert(`Play from slide ${m.data.slide}`);
    }
})
