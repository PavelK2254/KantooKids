import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TestFrameComponent } from './test-frame/test-frame.component'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'
import { HomePageComponent } from './home-page/home-page.component'
import { OurAppComponent } from './our-app/our-app.component'
import { LearningWithDisneyComponent } from './learning-with-disney/learning-with-disney.component'
import { MoviePageComponent } from './movie-page/movie-page.component'

const routes: Routes = [

  { path: '', component: HomePageComponent },
  { path: 'our-app', component: OurAppComponent },
  { path: 'learning-with-disney', component: LearningWithDisneyComponent },
  { path: 'kantoo-blog', component: TestFrameComponent },
  { path: 'contact', component: TestFrameComponent },
  { path: ':id', component: MoviePageComponent },
  { path: '**', component: PageNotFoundComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
