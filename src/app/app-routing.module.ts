import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { RulesComponent } from './rules/rules.component';
import { StartscreenComponent } from './startscreen/startscreen.component';

const routes: Routes = [
  {path: '', component: StartscreenComponent},
  {path: 'game', component: GameComponent},
  {path: 'rules', component: RulesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
