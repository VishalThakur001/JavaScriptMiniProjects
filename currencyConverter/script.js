const baseUrl = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const options = document.querySelectorAll(".dropdown select");
const button = document.querySelector('#btn');
const message = document.querySelector('#msg');

const fromCur = document.querySelector('.from select');
const toCur = document.querySelector('.to select');

for (let option of options) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerHTML = currCode;
        newOption.value = currCode;

        if (option.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if (option.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        option.append(newOption);
    }

    option.addEventListener("change", (e) => {
        let country = countryList[option.value];
        changeFlag(country, e.target);
    });
}

function changeFlag(country, target) {
    target.parentElement.querySelector('img').src = `https://flagsapi.com/${country}/flat/64.png`;
}

const updateExchangeRate = async () => {

    let amount = document.querySelector(".amount input");
    let amountVal = amount.value;

    if (amountVal === "" || amountVal < 1) {
        amountVal = 1;
        amount.value = "1";
    }

    let url = `${baseUrl}/${fromCur.value.toLowerCase()}.json`;

    let response = await fetch(url);
    let data = await response.json();

    let rate = data[fromCur.value.toLowerCase()][toCur.value.toLowerCase()];
    
    let finalAmount = (amountVal * rate).toFixed(2);
    console.log(finalAmount)
    message.innerText = `${amountVal} ${fromCur.value} = ${finalAmount} ${toCur.value}`;
}

button.addEventListener("click", (e) => {
    e.preventDefault();
    updateExchangeRate();
})

window.addEventListener("load", ()=>{
    updateExchangeRate();
})
