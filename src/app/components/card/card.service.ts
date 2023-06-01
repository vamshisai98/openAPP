import { Injectable } from '@angular/core';
import { CARD_DATA } from './card';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor() { }

  getCardData(): string[] {
    return CARD_DATA;
  }

}
