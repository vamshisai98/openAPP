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
  }

  openCard(index: number) {

    const cardElements = document.querySelectorAll('.card');
    cardElements.forEach(cardElement => {
      cardElement.classList.add('disabled');
    });

    this.flipCardStates[index] = !this.flipCardStates[index];

    if (this.flipCardStates[index] && index === 3) {
      console.log("Hit");
    } else {
      console.log("Missed");
    }

    setTimeout(() => {
      this.flipCardStates = Array(this.cards.length).fill(false);
    }, 5000);
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
