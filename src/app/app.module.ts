import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartscreenComponent } from './startscreen/startscreen.component';
import { RulesComponent } from './rules/rules.component';
import { GameComponent } from './game/game.component';
import { PlayerComponent } from './player/player.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DialogAddPlayerComponent } from './dialog-add-player/dialog-add-player.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule }  from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { GameRulesComponent } from './game-rules/game-rules.component';
import { MatCardModule } from '@angular/material/card';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideDatabase,getDatabase } from '@angular/fire/database';





@NgModule({
  declarations: [
    AppComponent,
    StartscreenComponent,
    RulesComponent,
    GameComponent,
    PlayerComponent,
    DialogAddPlayerComponent,
    GameRulesComponent
  ],
  imports: [
    provideFirebaseApp(() => initializeApp({ })),
    provideFirestore(() => getFirestore()),
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatInputModule,
    FormsModule,
    MatCardModule,
    provideDatabase(() => getDatabase())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
