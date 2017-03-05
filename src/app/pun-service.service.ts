import { Injectable } from '@angular/core';
import { Observable, asap } from './app.rx';

const keywords = {
    'banana': [0, 13, 14, 15, 16],
    'cheese': [3, 4, 5, 6, 7, 8, 12],
    'bird': [3, 11, 12, 1],
    'hotel': [4, 9, 10, 11],
    'mexican': [6], 
    'cow': [12]
  };

const puns = [{
    id: '0', pun: 'My wife has banana diet', answer: 'She hasnt lost weight, but you should see her climb trees now!'
  },{
    id: '1', pun: 'Id make a pun about a chicken...', answer: 'But it would be fowl.'
  },{
    id: '2', pun: 'this is a pun about a pickle and a hat', answer: 'answer'
  },{
    id: '3', pun: 'What kind of cheese can fly?', answer: 'Curds of Prey.'
  },{
    id: '4', pun: 'What hotel did the cheese stay at?', answer: 'The Stilton.'
  },{
    id: '5', pun: 'What is the saddest cheese?', answer: 'Blue Cheese.'
  },{
    id: '6', pun: 'What do you call a cheese that isnt yours?', answer: 'Nacho Cheese.'
  },{
    id: '7', pun: 'What music does cheese listen to?', answer: 'R & Brie.'
  },{
    id: '8', pun: 'Whats always the last piece of cheese left?', answer: 'Forever Provolone.'
  },{
    id: '9', pun: 'I used to be a hotel clerk', answer: 'But then I had reservations.'
  },{
    id: '10', pun: 'Im staying at a really trend new hotel', answer: 'Its the inn thing to do.'
  },{
    id: '11', pun: 'A bird doctor checked into a hotel.', answer: 'He said, "This is the best place I feather stayed at".'
  },{
    id: '12', pun: 'A bird and a cow go shopping for cheese. The cow, knowing he can produce the milk says to the bird, "this place is robin you blind!".', answer: 'The bird says, "I like my cheese cheep cheep!'
  },{
    id: '13', pun: 'Why dont bananas snore?', answer: 'They dont want to wake up the rest of the bunch!'
  },{
    id: '14', pun: 'Why do bananas wear sunscreen?', answer: 'Because they peel.'
  },{
    id: '15', pun: 'What do you call two banana skins?', answer: 'A pair of slippers.'
  },{
    id: '16', pun: 'Why are bananas never lonely?', answer: 'Because they hang around in bunches.'
  }];

@Injectable()
export class PunService {

  constructor() { }

  getPuns(keywords: string[]): Observable<string[]> {
    if (!keywords || keywords.length === 0) {
      return Observable.of([]);
    }

    const found = keywords.reduce((found, keyword) => {
      const ids = keywords[keyword];
      if (ids) {
        return ids.reduce((found, id) => {
          found[id] = puns[id];
          return found;
        }, found);
      }
      return found;
    }, {});

    return Observable.of(Object.keys(found).map(key => found[key]));
  }

  suggestKeywords(partial: string): Observable<string[]> {
    if (!partial) {
      return Observable.of([]);
    }

    return Observable.of(
      Object.keys(keywords)
        .filter(keyword => keyword.indexOf(partial) === 0)
    );
  }
}
