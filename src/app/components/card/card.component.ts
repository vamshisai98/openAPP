import { Component, OnInit } from '@angular/core';
import { CardService } from './card.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  cards: any[];
  flipCardStates: boolean[];
  playMenu :string = 'newGame';
  cardMatch: string =''
  score:number = 0
  roundCount:number = 0

  constructor(private cardService: CardService) {
    this.cards = [];
    this.flipCardStates = [];
  }

  ngOnInit(): void {
    this.cards = this.cardService.getCardData();

    const flipCardStates = [];
    for (let i = 0; i < this.cards.length; i++) {
      flipCardStates.push(false);
    }
  }

  shuffleCards() {
    this.cards = this.shuffleArray(this.cards);
    this.flipCardStates = Array(this.cards.length).fill(true);

    const cardContainer = document.querySelector('.card-container');
    if (cardContainer) {
      cardContainer.classList.add('shuffle-animation');
      setTimeout(() => {
        cardContainer.classList.remove('shuffle-animation');
      }, 1000);
    }
  }

  playGame() {
    this.shuffleCards();
    const cardElements = document.querySelectorAll('.card');
    cardElements.forEach(cardElement => {
      cardElement.classList.remove('disabled');
    });
    this.playMenu = 'startGame'
    this.cardMatch = 'Please click on the card that you think is Ace of Spades'

  }

  openCard(index: number,cardIndex:number) {
    console.log(index,'INDEX')
    this.roundCount +=1
    const cardElements = document.querySelectorAll('.card');
    cardElements.forEach(cardElement => {
      cardElement.classList.add('disabled');
    });

    this.flipCardStates[index] = !this.flipCardStates[index];

    if (cardIndex===3) {
      this.cardMatch = 'Hit'
      this.score += 1
    } else {
      this.cardMatch = 'Missed'
    }

    setTimeout(() => {
      this.flipCardStates = Array(this.cards.length).fill(false);
      this.playGame()
    }, 3000);
  }

  shuffleArray(array: any[]) {
    const shuffledArray = [...array];

    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }

    return shuffledArray;
  }
}
