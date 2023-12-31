import { ExpectedData } from "./ExpectedData.js";
document.addEventListener("DOMContentLoaded", function () {
    var currencyData = [];
    fetch("https://call1.tgju.org/ajax.json")
        .then(function (res) { return res.json(); })
        .then(function (data) {
        if (data.hasOwnProperty("current")) {
            var currentData_1 = data.current;
            ExpectedData.forEach(function (data) {
                if (currentData_1.hasOwnProperty(data.name)) {
                    currencyData.push({
                        title: data.title,
                        price: currentData_1[data.name].p,
                        status: currentData_1[data.name].dt,
                    });
                }
            });
            if (currencyData.length === 7) {
                PrintValues(currencyData);
            }
        }
        else {
            console.error("Error in getting currency data");
        }
    });
});
function PrintValues(Currencies) {
    var currencyContainer = document.createElement("div");
    currencyContainer.classList.add("currency__container");
    document.body.appendChild(currencyContainer);
    var lastUpdateContainer = document.createElement("div");
    lastUpdateContainer.classList.add("currency__last-update");
    currencyContainer.appendChild(lastUpdateContainer);
    var currencySubContainer = document.createElement('div');
    currencySubContainer.classList.add("currency__sub-container");
    currencyContainer.appendChild(currencySubContainer);
    function updateLastUpdateTime() {
        lastUpdateContainer.innerHTML = "\u0622\u062E\u0631\u06CC\u0646 \u0628\u0631\u0648\u0632\u0631\u0633\u0627\u0646\u06CC: ".concat(new Date()
            .toLocaleTimeString("en-US", { hour12: false })
            .substring(0, 5));
    }
    updateLastUpdateTime();
    setInterval(updateLastUpdateTime, 1000 * 60);
    var currencyPrices = document.createElement("div");
    currencyPrices.classList.add("currency__prices");
    currencySubContainer.appendChild(currencyPrices);
    currencyPrices.innerHTML = "";
    Currencies.forEach(function (item) {
        var div1 = document.createElement("div");
        div1.classList.add("currency__item");
        {
            var div2 = document.createElement("div");
            div2.classList.add("currency__item-title");
            div2.classList.add(item.status.length === 0 ? 'const' : item.status);
            div2.innerText = item.title;
            div1.appendChild(div2);
            var div3 = document.createElement("div");
            div3.classList.add("currency__item-price");
            div3.innerText = item.price;
            {
                var span = document.createElement("span");
                span.style.color = "#999";
                span.style.fontSize = "10px";
                span.innerText = " ریال";
                div3.appendChild(span);
            }
            div1.appendChild(div3);
        }
        currencyPrices.appendChild(div1);
    });
    currencyContainer.style.display = "block";
    document.body.style.marginBottom = currencyContainer.offsetHeight + "px";
}
