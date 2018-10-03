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
  console.log(userPuzzle);

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const coord = `.${i}${j}`;
      if (userPuzzle[coord[1]][coord[2]] == 0) {
        $(coord).click(function() {
          console.log(coord);
          $(".entry").toggleClass("hidden");
          $("#enter-value-button").click(function() {
            let userInput = parseInt($("#user-num").val());
            console.log(userInput);
            $("#user-num").val("");
            userPuzzle[coord[1]][coord[2]] = userInput;
            $(coord).text(userInput);
            $(coord).toggleClass("user-input");
            $(".entry").toggleClass("hidden");
          });
        });
      }
      else {
        $(coord).text(userPuzzle[coord[1]][coord[2]]);
        $(coord).toggleClass("clue");
      }
    }
  }
});
