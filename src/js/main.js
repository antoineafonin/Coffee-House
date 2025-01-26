import "../scss/style.scss";

let tabsData = {}; 

fetch("menuTabs.json")
    .then((response) => response.json())
    .then((data) => {
        tabsData = data; 
        generateCards("coffee"); 
    })
    .catch((error) => console.error("Error loading JSON:", error));

function generateCards(tabId) {
    const container = document.getElementById(tabId);

    container.innerHTML = "";

    const items = tabsData[tabId];
    if (!items) {
        console.error(`No data found for tab: ${tabId}`);
        return;
    }

    items.forEach((item) => {
        const cardHTML = `
            <div class="tab__card">
                <img class="tab-img" src="${item.img}" alt="${item.title}" />
                <h4 class="tab__title">${item.title}</h4>
                <p class="tab__descr">${item.descr}</p>
                <p class="tab__price">${item.price}</p>
            </div>
        `;
        container.innerHTML += cardHTML;
    });
}

document.querySelectorAll(".button").forEach((button) => {
    button.addEventListener("click", () => {
        document
            .querySelectorAll(".tab__item")
            .forEach((tab) => tab.classList.remove("active"));

        const tabId = button.getAttribute("data-tab");
        document.getElementById(tabId).classList.add("active");

        generateCards(tabId);
    });
});
