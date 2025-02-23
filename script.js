class AudioController {
  constructor() {
    this.bgMusic = new Audio('Assets/Audio/creepy.mp3')
    this.flipSound = new Audio('Assets/Audio/flip.wav')
    this.matchSound = new Audio('Assets/Audio/match.wav')
    this.victorySound = new Audio('Assets/Audio/victory.wav')
    this.gameOverSound = new Audio('Assets/Audio/gameOver.wav')
    this.bgMusic.volume = 0.0
    this.matchSound.volume =0.0
    this.bgMusic.loop = true
  }
  startMusic() {
    this.bgMusic.play()
  }
  stopMusic() {
    this.bgMusic.pause()
    this.bgMusic.currentTime = 0
  }
  flip() {
    this.flipSound.play()
  }
  match() {
    this.matchSound.play()
  }
  victory() {
    this.stopMusic()
    this.victorySound.play()
  }
  gameOver() {
    this.stopMusic()
    this.gameOverSound.play()
  }
}

class MixOrMatch {
  constructor(totalTime, cards) {
    this.cardsArray = cards
    this.totalTime = totalTime
    this.timeRemaining = totalTime
    this.timer = document.getElementById('time-remaining')
    this.ticker = document.getElementById('flips')
    this.audioController = new AudioController()
  }

  startGame() {
    this.totalClicks = 0
    this.timeRemaining = this.totalTime
    this.cardToCheck = null
    this.matchedCards = []
    this.busy = true
    setTimeout(() => {
      this.audioController.startMusic()
      this.shuffleCards(this.cardsArray)
      this.countdown = this.startCountdown()
      this.busy = false
    }, 500)
    this.hideCards()
    this.timer.innerText = this.timeRemaining
    this.ticker.innerText = this.totalClicks
  }
  startCountdown() {
    return setInterval(() => {
      this.timeRemaining--
      this.timer.innerText = this.timeRemaining
      if (this.timeRemaining === 0) this.gameOver()
    }, 1000)
  }
  gameOver() {
    clearInterval(this.countdown)
    this.audioController.gameOver()
    document.getElementById('game-over-text').classList.add('visible')
  }
  victory() {
    clearInterval(this.countdown)
    this.audioController.victory()
    document.getElementById('victory-text').classList.add('visible')
  }
  hideCards() {
    this.cardsArray.forEach((card) => {
      card.classList.remove('visible')
      card.classList.remove('matched')
    })
  }
  flipCard(card) {
    if (this.canFlipCard(card)) {
      this.audioController.flip()
      // this.totalClicks++
      this.ticker.innerText = this.totalClicks
      card.classList.add('visible')

      if (this.cardToCheck) {
        this.checkForCardMatch(card)
      } else {
        this.cardToCheck = card
      }
    }
  }
  checkForCardMatch(card) {
    if (this.getCardType(card) === this.getCardType(this.cardToCheck))
      this.cardMatch(card, this.cardToCheck)
    else this.cardMismatch(card, this.cardToCheck)

    this.cardToCheck = null
  }
  cardMatch(card1, card2) {
    this.matchedCards.push(card1)
    this.matchedCards.push(card2)
    card1.classList.add('matched')
    card2.classList.add('matched')
    /////
    openModal(modal);
    var num = Math.floor(Math.random() * arr.length);
    if(arr.length>0){
      var que = arr[num];
      down.innerHTML = que;
      arr.splice(num, 1); 
    }
    else{
     
      down.innerHTML = "";
    }    
    this.audioController.match()
    if (this.matchedCards.length === this.cardsArray.length) this.victory()

  }
  cardMismatch(card1, card2) {
    this.busy = true
    setTimeout(() => {
      card1.classList.remove('visible')
      card2.classList.remove('visible')
      this.busy = false
    }, 1000)
  }
  shuffleCards(cardsArray) {
    // Fisher-Yates Shuffle Algorithm.
    for (let i = cardsArray.length - 1; i > 0; i--) {
      let randIndex = Math.floor(Math.random() * (i + 1))
      cardsArray[randIndex].style.order = i
      cardsArray[i].style.order = randIndex
    }
  }
  getCardType(card) {
    return card.getElementsByClassName('card-value')[0].src
  }
  canFlipCard(card) {
    return (
      !this.busy &&
      !this.matchedCards.includes(card) &&
      card !== this.cardToCheck
    )
  }
}

if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready)
} else {
  ready()
}

function ready() {
  let overlays = Array.from(document.getElementsByClassName('overlay-text'))
  let cards = Array.from(document.getElementsByClassName('card'))
  let game = new MixOrMatch(8000, cards)

  overlays.forEach((overlay) => {
    overlay.addEventListener('click', () => {
      overlay.classList.remove('visible')
      game.startGame()
    })
  })

  cards.forEach((card) => {
    card.addEventListener('click', () => {
      game.flipCard(card)
      
    })
  })
}


// MODAL (POP UP)
const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

openModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = document.querySelector(button.dataset.modalTarget)
    openModal(modal)
    
  })
})

overlay.addEventListener('click', () => {
  const modals = document.querySelectorAll('.modal.active')
  modals.forEach(modal => {
    closeModal(modal)
  })
})

closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal')
    closeModal(modal)
  })
})

function openModal(modal) {
  if (modal == null) return
  modal.classList.add('active')
  overlay.classList.add('active')
}

function closeModal(modal) {
  if (modal == null) return
  modal.classList.remove('active')
  overlay.classList.remove('active')
}

// set of ques 
var down = document.getElementById('GFG_DOWN');
var arr = ["One nibble is equivalent to how many bits?" , "What is the name of the oldest programming language still in use" , "Where was the world wide web invented?",
"The largest island in the world is Greenland. It is an integral part of?","How many minutes for each degree of longitude does local time of any place vary from Greenwich time?", 
 "In fireworks, the green flame is produced because of" , "What does an airbag, used for the safety of a car driver, contain?",
 "Anne Frank’s diary was edited after her death. Who did it?" ,  "What happens when some charge is placed on a soap bubble?", 
 "The outermost layer of the sun is called","Name a jovian planet." ,"Entomology is the science that studies" ,
   "Firewall in computer is used for", "1024 bit is equal to how many byte","The gas usually filled in the electric bulb is","The inert gas which is substituted for nitrogen in the air used by deep sea divers for breathing, is","What will be the result when seven times of 15 is subtracted from 119 ?", "Who was the first Indian Scientist to win a Nobel Prize?",
    "The amount of time light takes to reach the earth’s surface from the sun is"," Hydroscope is an instrument that used to","Receptors used to detect taste are known as","Which substance is used in the preservation of food stuff?", "What is the temperature at which both the Fahrenheit and the centigrade scales have the same value?","Which Noble Gas is also known as ‘Stranger Gas’?"];


// var down = document.getElementById('GFG_DOWN');
// var arr = ["GFG_1", "GeeksForGeeks",
//                 "Geeks", "Computer Science Portal"];
         

// function GFG_Fun() {
//   down.innerHTML =
//       arr[Math.floor(Math.random() * arr.length)];
// }
