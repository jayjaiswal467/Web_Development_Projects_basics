
let gameseq = [];
let userseq = [];

let btns = ["red", "yellow", "blue", "green"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

// Start game
document.addEventListener("keypress", function () {
    if (!started) {
        console.log("Game started");

        started = true;
        level = 0;
        gameseq = [];
        userseq = [];

        levelup();
    }
});

// Level up
function levelup() {
    userseq = [];
    level++;

    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * btns.length);
    let randcolor = btns[randIdx];
    let randbtn = document.querySelector(`#${randcolor}`);

    gameseq.push(randcolor);

    console.log("Game sequence:", gameseq);

    btnflash(randbtn);
}

// Flash game button
function btnflash(btn) {
    btn.classList.add("flash");

    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

// Flash user button
function userflash(btn) {
    btn.classList.add("userflash");

    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

// Button click
function btnPress() {
    if (!started) return;

    let btn = this;

    userflash(btn);

    let usercolor = btn.getAttribute("id");

    console.log("User color:", usercolor);

    userseq.push(usercolor);

    checkans(userseq.length - 1);
}

// Check answer
function checkans(idx) {
    if (userseq[idx] === gameseq[idx]) {
        console.log("Correct!");

        if (userseq.length === gameseq.length) {
            setTimeout(levelup, 1000);
        }
    } else {
        h2.innerText =
            `Game over! Your score was ${level - 1}. Press any key to restart.`;

        document.body.classList.add("game-over");

        setTimeout(function () {
            document.body.classList.remove("game-over");
        }, 200);

        started = false;
    }
}

// Add click events to all buttons
let allbtns = document.querySelectorAll(".btn");

for (let btn of allbtns) {
    btn.addEventListener("click", btnPress);
}
