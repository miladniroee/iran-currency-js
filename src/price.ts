interface Currency {
  title: string,
  price: string,
  status: string
}


document.addEventListener("DOMContentLoaded", function () {
  let currencyContainer: HTMLDivElement = document.createElement("div");
  currencyContainer.classList.add("currency__container");
  document.body.appendChild(currencyContainer);

  let lastUpdateContainer: HTMLDivElement = document.createElement("div");
  lastUpdateContainer.classList.add("currency__last-update");
  currencyContainer.appendChild(lastUpdateContainer);

  function updateLastUpdateTime(): void {
    lastUpdateContainer.innerHTML = `آخرین بروزرسانی: ${new Date()
      .toLocaleTimeString("en-US", { hour12: false })
      .substring(0, 5)}`;
  }

  updateLastUpdateTime();
  setInterval(updateLastUpdateTime, 1000 * 60);

  let currencyPrices: HTMLDivElement  = document.createElement("div");
  currencyPrices.classList.add("currency__prices");
  currencyContainer.appendChild(currencyPrices);

  let currencyData: Array<Currency> = [];

  fetch("https://call1.tgju.org/ajax.json")
    .then((res) => res.json())
    .then((data) => {
      if (data.hasOwnProperty("current")) {
        let currentData = data.current;

        if (currentData.hasOwnProperty("sekeb")) {
          currencyData.push({
            title: "سکه بهار آزادی",
            price: currentData.sekeb.p,
            status: currentData.sekeb.dt,
          });
        }

        if (currentData.hasOwnProperty("sekee")) {
          currencyData.push({
            title: "سکه امامی",
            price: currentData.sekee.p,
            status: currentData.sekee.dt,
          });
        }

        if (currentData.hasOwnProperty("nim")) {
          currencyData.push({
            title: "نیم سکه",
            price: currentData.nim.p,
            status: currentData.nim.dt,
          });
        }

        if (currentData.hasOwnProperty("rob")) {
          currencyData.push({
            title: "ربع سکه",
            price: currentData.rob.p,
            status: currentData.rob.dt,
          });
        }

        if (currentData.hasOwnProperty("price_dollar_rl")) {
          currencyData.push({
            title: "دلار آمریکا",
            price: currentData.price_dollar_rl.p,
            status: currentData.price_dollar_rl.dt,
          });
        }

        if (currentData.hasOwnProperty("price_eur")) {
          currencyData.push({
            title: "یورو اروپا",
            price: currentData.price_eur.p,
            status: currentData.price_eur.dt,
          });
        }

        if (currentData.hasOwnProperty("price_try")) {
          currencyData.push({
            title: "لیر ترکیه",
            price: currentData.price_try.p,
            status: currentData.price_try.dt,
          });
        }

        if (currencyData.length === 7) {
          currencyPrices.innerHTML = "";

          currencyData.forEach((item) => {
            let div1: HTMLDivElement = document.createElement("div");
            div1.classList.add("currency__item");

            {
              let div2: HTMLDivElement = document.createElement("div");
              div2.classList.add("currency__item-title");
              div2.classList.add(item.status);
              div2.innerText = item.title;
              div1.appendChild(div2);

              let div3: HTMLDivElement = document.createElement("div");
              div3.classList.add("currency__item-price");
              div3.innerText = item.price;

              {
                let span: HTMLSpanElement = document.createElement("span");
                span.style.color = "#999";
                span.innerText = "ریال";
                div3.appendChild(span);
              }

              div1.appendChild(div3);
            }

            currencyPrices.appendChild(div1);
          });
          currencyContainer.style.display = "block";
          document.body.style.marginBottom =
            currencyContainer.offsetHeight + "px";
        }
      } else {
        console.error("Error in getting currency data");
      }
    });
});
