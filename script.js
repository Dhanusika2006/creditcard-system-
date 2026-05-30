const cardNumber = document.getElementById("cardNumber");
const nameInput = document.getElementById("name");
const expiryInput = document.getElementById("expiry");

cardNumber.addEventListener("input", () => {
    document.getElementById("displayNumber").innerText =
        cardNumber.value || "**** **** **** ****";
});

nameInput.addEventListener("input", () => {
    document.getElementById("displayName").innerText =
        nameInput.value || "CARD HOLDER";
});

expiryInput.addEventListener("input", () => {
    document.getElementById("displayExpiry").innerText =
        expiryInput.value || "MM/YY";
});

function payNow(){

    let name = nameInput.value;
    let card = cardNumber.value;
    let expiry = expiryInput.value;
    let cvv = document.getElementById("cvv").value;
    let amount = document.getElementById("amount").value;

    if(!name || !card || !expiry || !cvv || !amount){
        message.innerText = "Fill all fields!";
        return;
    }

    if(card.length !== 16){
        message.innerText = "Card Number must be 16 digits!";
        return;
    }

    if(cvv.length !== 3){
        message.innerText = "CVV must be 3 digits!";
        return;
    }

    message.innerText = "Payment Successful ";

    let transaction = {
        name,
        amount,
        date: new Date().toLocaleString()
    };

    let transactions =
        JSON.parse(localStorage.getItem("transactions")) || [];

    transactions.push(transaction);

    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );

    loadTransactions();

    document.querySelectorAll("input")
        .forEach(input => input.value = "");
}

function loadTransactions(){

    let history =
        document.getElementById("history");

    history.innerHTML = "";

    let transactions =
        JSON.parse(localStorage.getItem("transactions")) || [];

    transactions.forEach(t => {

        let li = document.createElement("li");

        li.innerHTML =
            `${t.name} paid ₹${t.amount}<br>${t.date}`;

        history.appendChild(li);
    });
}

loadTransactions();