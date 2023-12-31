import { ExpectedData } from "./ExpectedData.js";

interface Currency {
  title: string;
  price: string;
  status: string;
}


document.addEventListener("DOMContentLoaded", function () {

  let currencyData: Array<Currency> = [];

  fetch("https://call1.tgju.org/ajax.json")
    .then((res) => res.json())
    .then((data) => {
      if (data.hasOwnProperty("current")) {
        let currentData = data.current;

        ExpectedData.forEach((data) => {
          if (currentData.hasOwnProperty(data.name)) {
            currencyData.push({
              title: data.title,
              price: currentData[data.name].p,
              status: currentData[data.name].dt,
            });
          }
        });

        if (currencyData.length === 7) {
          PrintValues(currencyData);
        }
      } else {
        console.error("Error in getting currency data");
      }
    });
});



function PrintValues(Currencies: Currency[]): void {
  
  let currencyContainer: HTMLDivElement = document.createElement("div");
  currencyContainer.classList.add("currency__container");
  document.body.appendChild(currencyContainer);

  let lastUpdateContainer: HTMLDivElement = document.createElement("div");
  lastUpdateContainer.classList.add("currency__last-update");
  currencyContainer.appendChild(lastUpdateContainer);


  let currencySubContainer: HTMLDivElement = document.createElement('div');
  currencySubContainer.classList.add("currency__sub-container")
  currencyContainer.appendChild(currencySubContainer)

  function updateLastUpdateTime(): void {
    lastUpdateContainer.innerHTML = `آخرین بروزرسانی: ${new Date()
      .toLocaleTimeString("en-US", { hour12: false })
      .substring(0, 5)}`;
  }

  updateLastUpdateTime();
  setInterval(updateLastUpdateTime, 1000 * 60);

  let currencyPrices: HTMLDivElement = document.createElement("div");
  currencyPrices.classList.add("currency__prices");
  currencySubContainer.appendChild(currencyPrices);

  currencyPrices.innerHTML = "";

  Currencies.forEach((item) => {
    let div1: HTMLDivElement = document.createElement("div");
    div1.classList.add("currency__item");

    {
      let div2: HTMLDivElement = document.createElement("div");
      div2.classList.add("currency__item-title");
      div2.classList.add(item.status.length === 0 ? 'const' : item.status);
      div2.innerText = item.title;
      div1.appendChild(div2);

      let div3: HTMLDivElement = document.createElement("div");
      div3.classList.add("currency__item-price");
      div3.innerText = item.price;

      {
        let span: HTMLSpanElement = document.createElement("span");
        span.style.color = "#999";
        span.style.fontSize = "10px"
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
