import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TestFrameComponent } from './test-frame/test-frame.component'

const routes: Routes = [
  { path: '', redirectTo: '/test-frame', pathMatch: 'full' }
  { path: 'test-frame', component: TestFrameComponent }
  ,
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
