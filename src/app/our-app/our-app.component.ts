import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-our-app',
  templateUrl: './our-app.component.html',
  styleUrls: ['./our-app.component.css']
})
export class OurAppComponent implements OnInit {

  introducing = "introducing";
  kntooDisneyText = "Kantoo Disney offers a complete English learning experience for children, from the very first steps to more advanced English speakers. Children choose their favorite movies and learn English while reliving their favorite stories"
  active = "Active and intuitive";
  weTeach = "We teach English through context, alongside a beloved Disney movie. Each movie is divided to several learning parts containing interactive elements for active and intuitive English learning progression.";
  ourCambridge = "Our Cambridge pedagogical team has created the most-effective syllabus for children using English words and phrases that are useful and suitable for a young audience.";
  fastNeasy = "Fast and easy viewing experience";
  disneyMovies = "Our Disney movies are available for instant watch, and new Disney smash hits are being added all the time! Our content is ever-growing with new games and cool original features that kids love!";
  learnEnglish = "Learn English in a personal way!";
  meetOur = "Meet our lovely host as she guides the children through the twists and turns of each movie while teaching them English. Your child personal guide and teacher will practice the English learned together with the children and inspire them to take an active part in the story and in the English learning process.";
  futureReady = "Future ready learning experience!";
  worldChanging = "The world is changing rapidly and uncertainties about the jobs of tomorrow prevail. No doubt, the foundation for success in the 21st century is learning how to communicate in English. Kantoo Disney combines 21st century skills with top of the line technology, gamification and personalization across our platforms to accelerate language absorption for today’s kids.";
  safeLearningTitle = "Safe learning environment"
  safeLearningText = "Kantoo Disney is a safe learning environment for your child and we take the highest measures to ensure security and privacy. No ads, pop ups or solicitations. Ever!"
  kantooWayTitle = "The Kantoo way to learn and play!"
  kantooWayText = "Practice your English with our ultimate challenge quiz, specifically designed to challenge your kids’ abilities in acquiring new words and phrases. Kantoo Disney offers fun games that instantly enhance your child’s English skills and transform practice time into play time."
  kantooWayText2 = "Teaching children how to pronounce English words and sentences is no longer limited to the classroom. We use cutting edge voice recognition technology, never before adapted for child education, that directly improves English speaking skills."
  constructor() { }

  ngOnInit() {
  }

}
