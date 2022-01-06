import 'bootstrap/dist/css/bootstrap.min.css';
import 'material-design-icons/iconfont/material-icons.css';
import $ from 'jquery';

$(function() {
    const Game = require('./game');
    const game = new Game();
    game.start();
});
