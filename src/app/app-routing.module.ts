import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoreModule } from './core/core.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ChatThreadsComponent } from './chat/chat-threads/chat-threads.component';
import { ChatDetailComponent } from './chat/chat-detail/chat-detail.component';
import { AuthGuard } from './core/auth/guards/auth.guard';
// import { ChatListComponent } from './core/chat/chat-list/chat-list.component';
// import { ChatDetailComponent } from './core/chat/chat-detail/chat-detail.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  // {path: 'chat', component: ChatThreadsComponent, data: {state: 'chat'}},
  // {path: 'chat/:id', component: ChatDetailComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // scrollPositionRestoration: 'top',
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      scrollOffset: [0, 0] // x + y
    }),
    CoreModule,
    DashboardModule
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
