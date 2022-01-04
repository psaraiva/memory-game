import $ from 'jquery';

class Game {
  constructor() {
    this.quantity = 36;
    this.size = "md-74";
    this.icons = this.icons.concat(this.icons);
  }

  icons = [
    'favorite',
    'delete',
    'face',
    'bug_report',
    'stars',
    'hourglass_empty',
    'perm_device_information',
    'pets',
    'android',
    'alarm',
    'pan_tool',
    'extension',
    'flight_takeoff',
    'build',
    'star',
    'store',
    'flight_land',
    'rowing'
  ];

  size = "md-48";
  delay = 1500;
  ref = [];
  quantityCardTurn = 0;
  point_value = 5;
  score = 0;
  par = 0;

  start() {
    this.init();
    this.makeBoard();
    this.makeScore();
  }

  init(){
    this.main_element = $('#memory-game');
    this.main_element.append("<div id=\"board\"></div>");
    this.main_element.append("<div id=\"score\"></div>");
    this.board_element = $("#memory-game > #board");
    this.score_element = $("#memory-game > #score");
    this.sort();
  }

  sort() {
    let min = Math.ceil(0);
    let max = 0;
    for (let i = 0; i <= this.quantity; i++) {
      max = Math.floor(this.icons.length-1);
      let rand = Math.floor(Math.random() * (max - min + 1)) + min;
      this.ref.push(this.icons[rand]);
      this.icons.splice(rand, 1);
    }
  }

  makeBoard() {
    let index = 0;
    for (let i = 0; i < 6; i++) {
      index = this.generateCell(index);
      this.generateRow();
    }
    this.applyListernes();
  }

  makeScore() {
    let cell = $("<span>")
      .addClass("point")
      .addClass("md-48")
      .text("Points: 0")
      .attr("id", "points");
    this.score_element.append(cell);
    this.score_element.append("<br>");
    cell = $("<span>")
      .addClass("par")
      .addClass("md-48")
      .text("Par: 0")
      .attr("id", "par");
    this.score_element.append(cell);
  }

  generateRow() {
    this.board_element.append("<br>");
  }

  generateCell(index) {
    for (let i = 0; i < 6; i++) {
      let cell = $("<span>")
        .addClass("material-icons")
        .addClass(this.size)
        .text("image")
        .attr("turn", false)
        .attr("id", index++)
        .attr("value", "image");
      this.board_element.append(cell);
    }

    return index;
  }

  applyListernes() {
    var obj = this;
    $( "#memory-game > #board > .material-icons" ).on('click', function(el) {
      obj.turnCard($(el.target));
    });
  }

  turnCard(cell) {
    let turn = cell.attr("turn");
    if (this.quantityCardTurn > 1 || turn != 'false') return;

    this.quantityCardTurn++;
    let txt = this.ref[parseInt(cell.attr("id"))];
    cell.text(txt).attr("turn", true).attr("value", txt);
    this.checkPar();
  }

  checkPar() {
    if (this.quantityCardTurn != 2) return;

    let cells = $( "#memory-game > #board > .material-icons[turn='true']" );
    if ($(cells[0]).text() == $(cells[1]).text()) {
      $(cells[0]).attr('turn', 'fixed');
      $(cells[1]).attr('turn', 'fixed');
      this.score = this.score + this.point_value;
      this.par++;
      this.quantityCardTurn = 0;
      this.updateDisplayScore();
      return;
    }

    var obj = this;
    setTimeout(function() {
      $(cells[0]).text('image').attr('turn', 'false').attr("value", "image");
      $(cells[1]).text('image').attr('turn', 'false').attr("value", "image");
      obj.quantityCardTurn = 0;
    }, this.delay);
  }

  updateDisplayScore() {
    this.score_element.children("#points").text(`Points: ${this.score}`);
    this.score_element.children("#par").text(`Par: ${this.par}`);
  }
}

module.exports = Game;