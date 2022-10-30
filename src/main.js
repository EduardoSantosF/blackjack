import { drawCard, startNewGame, stopGame } from './helpers/game';
import './style.css';

const shuffleButton = document.querySelector('.shuffle');
const drawButton = document.querySelector('.draw');
const stopButton = document.querySelector('.stop');

shuffleButton.addEventListener('click', startNewGame);
drawButton.addEventListener('click', drawCard);
stopButton.addEventListener('click', stopGame);
