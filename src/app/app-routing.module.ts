import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgChartsModule } from 'ng2-charts';
import { ContactEditComponent } from './cmps/contact-edit/contact-edit.component';
import { LoginComponent } from './cmps/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { ContactResolver } from './resolvers/contact.resolver';
import { ContactDetailsComponent } from './views/contact-details/contact-details.component';
import { ContactIndexComponent } from './views/contact-index/contact-index.component';
import { HomeComponent } from './views/home/home.component';
import { StatisticsComponent } from './views/statistics/statistics.component';

const routes: Routes = [
  {
    path: 'contact/edit/:id',
    component: ContactEditComponent,
    resolve: { contact: ContactResolver },
    canActivate: [AuthGuard],
  },
  {
    path: 'contact/edit',
    component: ContactEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'contact/:id',
    component: ContactDetailsComponent,
    resolve: { contact: ContactResolver },
    canActivate: [AuthGuard],
  },
  {
    path: 'contact',
    component: ContactIndexComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'statistics',
    component: StatisticsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
