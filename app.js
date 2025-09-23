// sound effects
//I like this way of adding sound effects because it makes the most sense to me, it is something I learned from
// a classmate and mdn and I have used it before in my mandarin-calculator-app https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement/Audio

const spinSound = new Audio('images/bubbling.mp3');
const winSound = new Audio('images/whale.mp3');
const coinSound = new Audio('images/coin.mp3');


//start off with this amount for users

let balance = 1000;

// an array of all the images....learning that an array is a list made this make sense

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


// Get random symbol from the array function...I saw how another classmate used Math.random in their code and thought it looked great
// so I found it on mdn https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random

    function getRandomSymbol() {
      return symbols[Math.floor(Math.random() * symbols.length)];
    }

// Set an image inside a reel...I used chatgpt to help me with this. I was having trouble getting my images to 
// appear when they would randomize. some images appeared and others did not, some looked great and fit well and
// others were not large enough or spilling out of their respective 'spots' 
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
// I used chatgpt for help with this...it gave me a more advanced version on how to do this so I stuck with this one
// so I could understand what I was typing and then played around with the spin count to get the effect I wanted 
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
//same idea here, I asked chatgpt for help on the function and even considered randomizing my messages 
// but was provided with answers that were too advanced so I just decided to keep it simple with one message 
//this way I could look back and explain what had been done
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
//boolean created here to have buttons disabled and enabled before and after spins

    function disableButtons() {
      document.getElementById('minBtn').disabled = true;
      document.getElementById('maxBtn').disabled = true;
    }

    function enableButtons() {
      document.getElementById('minBtn').disabled = false;
      document.getElementById('maxBtn').disabled = false;
    }











