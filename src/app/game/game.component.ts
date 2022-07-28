import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
//import { collectionData } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { EditPlayerComponent } from '../edit-player/edit-player.component';



@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
 // pickCardAnimation: boolean = false;
 // currentCard: string = '';
  game: Game;
  gameId: string;
  title = '';
  description = '';
  
  

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((params) => {

    console.log(params['id']);

    this.gameId = params['id'];
    this.firestore.collection('games').doc(this.gameId).valueChanges().subscribe((game: any) => {

    console.log('Game update : ', game);

    this.game.currentPlayer = game.currentPlayer;
    this.game.playedCards = game.playedCards;
    this.game.players = game.players;
    this.game.player_images = game.player_images;
    this.game.stack = game.stack;
    this.game.pickCardAnimation = game.pickCardAnimation;
    this.game.currentCard = game.currentCard;
    });

    }); 
   
}

  newGame(){
    this.game = new Game();
  }

  takeCard(){
    if(!this.game.pickCardAnimation && this.game.stack.length > 0){
    this.game.currentCard = this.game.stack.pop();
    this.game.pickCardAnimation = true;

    console.log(this.game.currentCard);
    console.log('CurrentCard ' + this.game.currentCard);
    console.log(this.game);

    this.game.currentPlayer++;
    this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
    this.saveGame();
    setTimeout(() => {
      this.game.playedCards.push(this.game.currentCard);
      this.game.pickCardAnimation = false;
      this.saveGame();
    }, 1000);
   
  }else{
    if(this.game.stack.length == 0){
      this.newGame();
      this.game.players = [];
    };
  }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent, {
     
    });

    dialogRef.afterClosed().subscribe((name: string) => {
      if(name && name.length > 0){
     this.game.players.push(name);
     this.game.player_images.push('Player_1.jpg');
     this.saveGame();
    }
  });
 }


saveGame(){
 this.firestore.collection('games').doc(this.gameId).update(this.game.toJson());
 }

 /*
 cardStack(){
  for (let index = 0; index < this.game.stack.length; index++) {
    const cardsStack = this.game.stack[index];
    console.log(cardsStack);
    
  }
 }*/


 setCard() {
  if(this.game.players.length >= 2) {
    this.title = 'Please pick a card';
    this.description = 'Please click on the card stack to select a card';
  } else {
    this.title = 'Add players!';
    this.description = 'Please add at least two players bofore you pick a card!';
  }
}

editPlayer(playerId: number){
  console.log('edit', playerId);
  const dialogRef = this.dialog.open(EditPlayerComponent);
  dialogRef.afterClosed().subscribe((change: string) => {
    if(change){
      if(change == 'DELETE'){
      this.game.player_images.splice(playerId, 1);
      this.game.players.splice(playerId, 1);
      } else {
        this.game.player_images[playerId] = change;
       }
      this.saveGame();
    }
  });
}
}

