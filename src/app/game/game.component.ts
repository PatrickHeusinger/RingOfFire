import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { EditPlayerComponent } from '../edit-player/edit-player.component';
import { GameServiceService } from '../game-service.service';



@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
 
  game: Game;
  gameId: string;
  title: string = '';
  description: string = '';
  gameOver: boolean = false;
  
  

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, private dialog: MatDialog ,public service: GameServiceService) { }

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

  restartGame(){
    if(this.game.stack.length == 0 ){
        this.newGame();
        this.game.players = [];
        this.gameOver = false;
      }
   }

   thisGameOver(){
    if (this.game.stack.length <= 1) {
      setTimeout(() => {
        this.gameOver = true;
      }, 3000);
    
    }
   }
 

  takeCard(){
    if (this.game.players.length < 2) {
    this.openDialog();
    } else if(!this.game.pickCardAnimation && this.game.stack.length > 0){
    this.game.currentCard = this.game.stack.pop();
    this.game.pickCardAnimation = true;
    this.game.currentPlayer++;
    this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
    this.saveGame();
    setTimeout(() => {
      this.game.playedCards.push(this.game.currentCard);
      this.game.pickCardAnimation = false;
      this.saveGame();
    }, 1000);
   } 
   this.thisGameOver();
  }

  openDialog(): void {
  const dialogRef = this.dialog.open(DialogAddPlayerComponent, {
     
    });

    dialogRef.afterClosed().subscribe((name: string) => {
      if(name && name.length > 0){
     this.game.players.push(name);
     this.game.player_images.push('Player_2.jpg');
     this.saveGame();
    }
  });
 }

 


saveGame(){
this.firestore.collection('games').doc(this.gameId).update(this.game.toJson());
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



showRules(){
  document.getElementById('ruleContainer').classList.remove('d-none');
  document.getElementById('stack').classList.add('d-none');
}
hideRules(){
  document.getElementById('ruleContainer').classList.add('d-none');
  document.getElementById('stack').classList.remove('d-none');
}

}


