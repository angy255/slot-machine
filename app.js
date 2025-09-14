// sound effects

const spinSound = new Audio('images/bubbling.mp3');
const winSound = new Audio('images/whale.mp3');
const coinSound = new Audio('images/coin.mp3');


//start off with this amount

let balance = 1000;

// an array of all the images

const symbols = [
      'images/conch.jpg',
      'images/coral.jpg',
      'images/fish.jpg',
      'images/mermaid.jpg',
      'images/pearl2.jpg',
      'images/seashell.jpg',
      'images/starfish.jpg',
      'images/shark.jpg',
      'images/eel.jpg',
      'images/octopus.jpg'
    ];


// Get random symbol from the array
    function getRandomSymbol() {
      return symbols[Math.floor(Math.random() * symbols.length)];
    }

// Set an image inside a reel
    function setReelImage(reelId, imageUrl) {
      const reel = document.getElementById(reelId);
      reel.innerHTML = `<img src="${imageUrl} "class="symbol-img">`;
    }


//Create function for spins

    function spin(bet) {

// Disable buttons during spin
    disableButtons();

// Check balance
      if (balance < bet) {
        document.getElementById('message').textContent = "Aaaargghh! Yer out of coins!";
        coinSound.play();
        enableButtons();
        return;
      }

      balance -= bet;
      document.getElementById('balance').textContent = balance;
      document.getElementById('message').textContent = "Spinnin' the reels, ye salty dog!";
      spinSound.play();

// making the reels spin so it feels more like a slot machine (random flash) started at 10 for spin count and 100 ms but 20 and 50ms looks cooler
      
        let spinCount = 20;
        const spinInterval = setInterval(() => {
        setReelImage('reel1', getRandomSymbol());
        setReelImage('reel2', getRandomSymbol());
        setReelImage('reel3', getRandomSymbol());
        spinCount--;

        if (spinCount <= 0) {
          clearInterval(spinInterval);
          showFinalResult(bet);
        }
      }, 50);
    }






// Create final result function

      function showFinalResult(bet) {

      const reel1 = getRandomSymbol();
      const reel2 = getRandomSymbol();
      const reel3 = getRandomSymbol();

      setReelImage('reel1', reel1);
      setReelImage('reel2', reel2);
      setReelImage('reel3', reel3);

      if (reel1 === reel2 && reel2 === reel3) {
        const winAmount = bet * 100;
        balance += winAmount;
        document.getElementById('balance').textContent = balance;
        document.getElementById('message').textContent = `Yo-ho-ho! Ye struck gold, matey! ${winAmount} coins!`;
        document.body.style.backgroundImage="url('images/treasure.jpg')";      
        winSound.play();
      } else {
        document.getElementById('message').textContent = "No gold in yer net, sailor! Give it another whirl!";
        document.body.style.backgroundImage = "url('images/underwater.jpg')";
      }
// enable buttons after spin

      enableButtons();
    }




//create function for disable and enable buttons

    function disableButtons() {
      document.getElementById('minBtn').disabled = true;
      document.getElementById('maxBtn').disabled = true;
    }

    function enableButtons() {
      document.getElementById('minBtn').disabled = false;
      document.getElementById('maxBtn').disabled = false;
    }











