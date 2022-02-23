'use strict';

class PigGame {
    constructor() {
        this.turn = 1; //1 or 2
        this.score1 = 0;
        this.currentScore1 = 0;
        this.score2 = 0;
        this.currentScore2 = 0;
        this.winner = false;
    }

    get win (){
        return this.winner;
    }

    whoIsWinner(who){
        this.winner = true;
        document.querySelector(".player--0").classList.remove("player--active");
        document.querySelector(".player--1").classList.remove("player--active");
        if (who === 1){
            document.querySelector(".player--0").classList.add("player--winner");
        } else {
            document.querySelector(".player--1").classList.add("player--winner");
        }
    }

    resetCurrentScore() {
        this.currentScore1 = 0;
        this.currentScore2 = 0;
        document.getElementById("current--0").textContent = "0";
        document.getElementById("current--1").textContent = "0";
    }

    begin() {
        this.turn = 1;
        this.score1 = 0;
        this.currentScore1 = 0;
        this.score2 = 0;
        this.currentScore2 = 0;
        this.winner = false;
        document.querySelector(".player--0").classList.add("player--active");
        document.querySelector(".player--0").classList.remove("player--winner");
        document.querySelector(".player--1").classList.remove("player--winner");
        document.querySelector(".player--1").classList.remove("player--active");
        document.getElementById("current--0").textContent = "0";
        document.getElementById("current--1").textContent = "0";
        document.getElementById("score--0").textContent = "0";
        document.getElementById("score--1").textContent = "0";
        document.querySelector(".dice").classList.add("hidden");
    }

    holdButton(){
        if (this.turn === 1) {
            this.score1 += this.currentScore1;
            document.getElementById("score--0").textContent = this.score1;

            if (this.score1 >= 100) {
                this.whoIsWinner(1);
            }

            this.resetCurrentScore();
            this.changePlayer();
        } else {
            this.score2 += this.currentScore2;
            document.getElementById("score--1").textContent = this.score2;

            if (this.score2 >= 100) {
                this.whoIsWinner(2);
            }

            this.resetCurrentScore();
            this.changePlayer();
        }
    }

    changePlayer(){
        if (this.turn === 1) {
            document.querySelector(".player--0").classList.remove("player--active");
            this.turn = 2;
            if (this.winner === false) {
                document.querySelector(".player--1").classList.add("player--active");
            }
        } else {
            document.querySelector(".player--1").classList.remove("player--active");
            this.turn = 1;
            if (this.winner === false) {
                document.querySelector(".player--0").classList.add("player--active");
            }
        }
    }

    rolling(){
        document.querySelector(".dice").classList.remove("hidden");
        let number = Math.floor(Math.random() * 6) + 1;
        document.querySelector(".dice").src = `dice/dice-${number}.png`;

        if (number === 1) {
            this.resetCurrentScore();
            this.changePlayer();
        } else {
            if (this.turn === 1) {
                this.currentScore1 += number;
                document.getElementById("current--0").textContent = this.currentScore1.toString();
            } else {
                this.currentScore2 += number;
                document.getElementById("current--1").textContent = this.currentScore2.toString();
            }
        }
    }
}

let game = new PigGame();

//roll dice button
document.querySelector('.btn--roll').addEventListener(
    "click", function(e) {
        if (game.win === false) {
            game.rolling();
        }
    })

//hold button
document.querySelector('.btn--hold').addEventListener(
    "click", function(e) {
        if (game.win === false) {
            game.holdButton();
        }
    })

//new game button
document.querySelector('.btn--new').addEventListener(
    "click", function(e) {
        game.begin();
    })
