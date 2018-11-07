import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TestFrameComponent } from './test-frame/test-frame.component'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'

const routes: Routes = [

  { path: '', component: TestFrameComponent },
  { path: 'our-app', component: TestFrameComponent },
  { path: 'learning-with-disney', component: TestFrameComponent },
  { path: 'kantoo-blog', component: TestFrameComponent },
  { path: 'our-legacy', component: TestFrameComponent },
  { path: 'contact', component: TestFrameComponent },
  { path: '**', component: PageNotFoundComponent },
  { path: 'franchise/:id', component: PageNotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
