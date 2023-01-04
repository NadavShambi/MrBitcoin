import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app-root/app.component';
import { ContactIndexComponent } from './views/contact-index/contact-index.component';
import { ContactListComponent } from './cmps/contact-list/contact-list.component';
import { ContactPreviewComponent } from './cmps/contact-preview/contact-preview.component';
import { ContactDetailsComponent } from './views/contact-details/contact-details.component';
import { AppHeaderComponent } from './cmps/app-header/app-header.component';
import { HomeComponent } from './views/home/home.component';
import { StatisticsComponent } from './views/statistics/statistics.component';
import { NgChartsModule, NgChartsConfiguration } from 'ng2-charts';
import { UserMsgComponent } from './cmps/user-msg/user-msg.component';
import { ContactFilterComponent } from './cmps/contact-filter/contact-filter.component';
import { FormsModule } from '@angular/forms';
import { ContactEditComponent } from './cmps/contact-edit/contact-edit.component';
import { ChartComponent } from './cmps/chart/chart.component';
import { LoginComponent } from './cmps/login/login.component';
import { TransferFundsComponent } from './cmps/transfer-funds/transfer-funds.component';
import { MovesListComponent } from './cmps/moves-list/moves-list.component';
import { MoveComponent } from './cmps/move/move.component';
import { CoolBtnComponent } from './cmps/cool-btn/cool-btn.component';
import { NaturalPipe } from './pipes/natural.pipe';
import { TransferBtnComponent } from './cmps/transfer-btn/transfer-btn.component';
import { FilterArrPipe } from './pipes/filter-arr.pipe';
@NgModule({
  declarations: [
    AppComponent,
    ContactIndexComponent,
    ContactListComponent,
    ContactPreviewComponent,
    ContactDetailsComponent,
    AppHeaderComponent,
    HomeComponent,
    StatisticsComponent,
    UserMsgComponent,
    ContactFilterComponent,
    ContactEditComponent,
    ChartComponent,
    LoginComponent,
    TransferFundsComponent,
    MovesListComponent,
    MoveComponent,
    CoolBtnComponent,
    NaturalPipe,
    TransferBtnComponent,
    FilterArrPipe,
  ],
  imports: [BrowserModule, AppRoutingModule, NgChartsModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
