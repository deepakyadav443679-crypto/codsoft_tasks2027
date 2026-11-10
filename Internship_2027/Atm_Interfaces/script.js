/* ==========================================
   SECUREBANK ATM DEMO
   Demo PIN = 9755
========================================== */


const CORRECT_PIN = "9755";

let enteredPin = "";

let balance = 25000;

let transactions = [];


// ===============================
// PIN
// ===============================

function enterPin(number) {

    if (enteredPin.length >= 4) {
        return;
    }

    enteredPin += number;

    updatePinDots();
}


function updatePinDots() {

    for (let i = 1; i <= 4; i++) {

        const dot = document.getElementById("dot" + i);

        if (i <= enteredPin.length) {
            dot.classList.add("active");
        } else {
            dot.classList.remove("active");
        }
    }
}


function clearPin() {

    enteredPin = "";

    updatePinDots();

    document.getElementById("pinMessage").textContent = "";
}


function verifyPin() {

    const message = document.getElementById("pinMessage");

    if (enteredPin.length !== 4) {

        message.textContent = "Please enter 4-digit PIN.";

        return;
    }


    if (enteredPin === CORRECT_PIN) {

        message.style.color = "#4ade80";

        message.textContent = "PIN verified successfully.";

        setTimeout(() => {

            document.getElementById("pinScreen")
                .classList.remove("active");

            document.getElementById("dashboard")
                .classList.add("active");

        }, 500);

    } else {

        message.textContent = "Incorrect PIN. Try again.";

        enteredPin = "";

        updatePinDots();
    }
}


// ===============================
// SCREEN CONTROL
// ===============================

function showScreen(screenId) {

    document.querySelectorAll(".screen")
        .forEach(screen => {

            screen.classList.remove("active");

        });

    document.getElementById(screenId)
        .classList.add("active");
}


function showWithdraw() {

    showScreen("withdrawScreen");

    document.getElementById("withdrawAmount").value = "";

    document.getElementById("withdrawMessage").textContent = "";
}


function showDeposit() {

    showScreen("depositScreen");

    document.getElementById("depositAmount").value = "";

    document.getElementById("depositMessage").textContent = "";
}


function showHistory() {

    showScreen("historyScreen");

    renderHistory();
}


function backDashboard() {

    showScreen("dashboard");

    updateBalance();
}


// ===============================
// BALANCE
// ===============================

function updateBalance() {

    document.getElementById("balance").textContent =
        balance.toLocaleString("en-IN");
}


// ===============================
// WITHDRAW
// ===============================

function setWithdraw(amount) {

    document.getElementById("withdrawAmount").value = amount;
}


function confirmWithdraw() {

    const input =
        document.getElementById("withdrawAmount");

    const message =
        document.getElementById("withdrawMessage");

    const amount = Number(input.value);


    if (!amount || amount <= 0) {

        message.textContent =
            "Please enter a valid amount.";

        return;
    }


    if (amount < 100) {

        message.textContent =
            "Minimum withdrawal amount is ₹100.";

        return;
    }


    if (amount > balance) {

        message.textContent =
            "Insufficient balance.";

        return;
    }


    balance -= amount;


    addTransaction(
        "Withdraw Money",
        amount,
        "withdraw"
    );


    updateBalance();


    showSuccess(
        "Withdrawal Successful",
        `₹${amount.toLocaleString("en-IN")} has been withdrawn successfully.`
    );
}


// ===============================
// DEPOSIT
// ===============================

function setDeposit(amount) {

    document.getElementById("depositAmount").value =
        amount;
}


function confirmDeposit() {

    const input =
        document.getElementById("depositAmount");

    const message =
        document.getElementById("depositMessage");

    const amount = Number(input.value);


    if (!amount || amount <= 0) {

        message.textContent =
            "Please enter a valid amount.";

        return;
    }


    if (amount < 100) {

        message.textContent =
            "Minimum deposit amount is ₹100.";

        return;
    }


    balance += amount;


    addTransaction(
        "Deposit Money",
        amount,
        "deposit"
    );


    updateBalance();


    showSuccess(
        "Deposit Successful",
        `₹${amount.toLocaleString("en-IN")} has been added to your account.`
    );
}


// ===============================
// TRANSACTION HISTORY
// ===============================

function addTransaction(type, amount, action) {

    transactions.unshift({

        type: type,

        amount: amount,

        action: action,

        time: new Date().toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit"
        })

    });
}


function renderHistory() {

    const list =
        document.getElementById("historyList");

    list.innerHTML = "";


    if (transactions.length === 0) {

        list.innerHTML = `
            <div class="transaction">
                <div>
                    <strong>No transactions yet</strong>
                    <span>Your recent transactions will appear here.</span>
                </div>
            </div>
        `;

        return;
    }


    transactions.forEach(transaction => {

        const sign =
            transaction.action === "deposit"
                ? "+"
                : "-";


        const color =
            transaction.action === "deposit"
                ? "#4ade80"
                : "#f87171";


        list.innerHTML += `

            <div class="transaction">

                <div>

                    <strong>
                        ${transaction.type}
                    </strong>

                    <span>
                        Today • ${transaction.time}
                    </span>

                </div>

                <b style="color:${color}">
                    ${sign}₹${transaction.amount.toLocaleString("en-IN")}
                </b>

            </div>

        `;
    });
}


// ===============================
// CHECK BALANCE
// ===============================

function checkBalance() {

    showSuccess(
        "Current Balance",
        `Your available balance is ₹${balance.toLocaleString("en-IN")}.`
    );
}


// ===============================
// SUCCESS MODAL
// ===============================

function showSuccess(title, text) {

    document.getElementById("successTitle")
        .textContent = title;

    document.getElementById("successText")
        .textContent = text;

    document.getElementById("successModal")
        .classList.add("show");
}


function closeSuccess() {

    document.getElementById("successModal")
        .classList.remove("show");

    backDashboard();
}


// ===============================
// LOGOUT
// ===============================

function logout() {

    enteredPin = "";

    updatePinDots();

    showScreen("pinScreen");

    document.getElementById("pinMessage")
        .textContent = "";
}


// ===============================
// LANGUAGE
// ===============================

document
    .getElementById("language")
    .addEventListener("change", function () {

        if (this.value === "hi") {

            document.getElementById("welcomeText")
                .textContent = "SecureBank में आपका स्वागत है";

            document.getElementById("pinText")
                .textContent = "जारी रखने के लिए अपना 4-अंकीय PIN डालें";

        } else {

            document.getElementById("welcomeText")
                .textContent = "Welcome to SecureBank";

            document.getElementById("pinText")
                .textContent = "Enter your 4-digit ATM PIN to continue";
        }

    });


// Dashboard language selector

document
    .getElementById("dashboardLanguage")
    .addEventListener("change", function () {

        const title =
            document.getElementById("hello");

        if (this.value === "hi") {

            title.textContent =
                "स्वागत है, Deepak 👋";

        } else {

            title.textContent =
                "Welcome, Deepak 👋";
        }

    });


// Initial balance

updateBalance();