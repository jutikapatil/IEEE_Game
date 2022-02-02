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
var arr = ["The emblem on the flag of the Republic of Tajikistan features a sunrise over mountains below what symbol?" , "How many countries are located in the Southern Hemisphere?" , "What River that flows through Grand Canyon?","What is the only major city located on two continents?","How many minutes for each degree of longitude does local tim of any place vary from greenwich time?", "The largest island in the world is Greenland. It is an integral part of",            "Which indian player did not bowl or bat but fielded for Pakistan in only one exhibition match in 1987?" , "Which 2 countries hosted the 1956 summer Olympics?","Which player has scored most goals in a single football match and how many?", "What sports did Apollo 14 astronauts Alan shepherd and Edgar Mitchell play on the moon in 1971?" ,"Which 2 countries hosted the 1956 summer Olympics?",          "Who was named president after Abraham Lincoln was assassinated?", "How long did it take to build the Titanic?","During World War I, the Muslim Ottoman government committee organized genocide against which group of people?" ,"Which British archaeologist discovered Tutankhamun’s tomb?" ];


// var down = document.getElementById('GFG_DOWN');
// var arr = ["GFG_1", "GeeksForGeeks",
//                 "Geeks", "Computer Science Portal"];
         

// function GFG_Fun() {
//   down.innerHTML =
//       arr[Math.floor(Math.random() * arr.length)];
// }
