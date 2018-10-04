import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import './scss/styles.scss';
import { matrix, puzzle } from './constants.js';


$(document).ready(function() {
  let userPuzzle = [];
  for (let i = 0; i < 9; i++) {
    let row = [];
    for (let j = 0; j < 9; j++) {
      row.push(puzzle[i][j]);
    }
    userPuzzle.push(row);
  }

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const coord = `.${i}${j}`;
      const num = `num-${i}${j}`;
      const numclass = `.${num}`;
      $(coord).html(`<div class='location'>(${coord[1]}, ${coord[2]})</div><div class='${num}'</div>`);
      if (userPuzzle[coord[1]][coord[2]] == 0) {
        $(coord).addClass("user-input");
        $(coord).click(function() {
          $(coord).toggleClass("active");
          $(".entry").toggleClass("hidden");
          $(".entry").html("<label for='user-num'>Please enter a number between 1 and 9 to enter in cell (" + coord[1] + ", " + coord[2] + "):  <input type='text' id='user-num'><button type='button' class='btn " + coord[1] + coord[2] + "'>Click</button");
          $(`button${coord}`).click(function() {
            let userInput = parseInt($("#user-num").val());
            $("#user-num").val("");
            userPuzzle[coord[1]][coord[2]] = userInput;
            $(numclass).text(userInput);
            $(coord).toggleClass("active");
            $(".entry").toggleClass("hidden");
          });
        });
      }
      else {
        $(coord).html("<div class='location'>(" + coord[1] + ",  " + coord[2] + ")</div>" + userPuzzle[coord[1]][coord[2]]);
        $(coord).addClass("clue");
      }
    }
  }
});
