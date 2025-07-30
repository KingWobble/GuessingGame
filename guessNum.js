window.onload = function () {
  const input = document.getElementById('my_input');
  const submitBtn = document.getElementById('my_button');
  const message = document.getElementById('message');
  const gifContainer = document.getElementById('gif_container');
  const playAgainBtn = document.getElementById('play_again');
  const historyList = document.getElementById('history');

  let target = Math.floor(Math.random() * 100) + 1;
  console.log("Target number:", target);

  let guessCount = 0;
  let guessHistory = [];

  function resetGame() {
    target = Math.floor(Math.random() * 100) + 1;
    console.log("New target:", target);
    guessCount = 0;
    guessHistory = [];
    message.textContent = '';
    gifContainer.innerHTML = '';
    historyList.innerHTML = '';
    input.value = '';
    input.disabled = false;
    submitBtn.style.display = 'inline-block';
    playAgainBtn.style.display = 'none';
  }

  function updateHistory() {
    historyList.innerHTML = '';
    guessHistory.forEach((guess, index) => {
      const li = document.createElement('li');
      li.textContent = `Guess ${index + 1}: ${guess}`;
      historyList.appendChild(li);
    });
  }

  submitBtn.addEventListener('click', () => {
    const guess = parseInt(input.value);

    if (isNaN(guess) || guess < 1 || guess > 100) {
      message.textContent = "Please enter a valid number between 1 and 100.";
      return;
    }

    guessCount++;
    guessHistory.push(guess);
    updateHistory();

    if (guess < target) {
      message.textContent = "Too low!";
    } else if (guess > target) {
      message.textContent = "Too high!";
    } else {
      message.innerHTML = `🎉 Correct! It took you <strong>${guessCount}</strong> guesses!`;
      gifContainer.innerHTML = `<img src="https://media1.tenor.com/m/DNJUBVv2aSwAAAAd/celebrate-celebration.gif" alt="Winner GIF" />`;
      input.disabled = true;
      submitBtn.style.display = 'none';
      playAgainBtn.style.display = 'inline-block';
    }

    input.value = '';
  });

  playAgainBtn.addEventListener('click', resetGame);
};