import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { RepositoryComponent } from './components/repository/repository.component';

@NgModule({
  declarations: [HomeComponent, RepositoryComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
  ]
})
export class HomeModule { }
