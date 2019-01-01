import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-learning-with-disney',
  templateUrl: './learning-with-disney.component.html',
  styleUrls: ['./learning-with-disney.component.css']
})
export class LearningWithDisneyComponent implements OnInit {

  fold1Text = "Skate through a winter wonderland with Anna and Elsa in this magical tale about love and sisterhood! "
  fold2Text = "The unforgettable adventures of Woody and Buzz come to perfect conclusion in this classic tale about friendship!"
  fold3Text  = "Board the boat and join the adventurous Moana as she sails out on a daring mission to save her people!"
  fold4Text  = "Zip through the racetrack with Lightening McQueen, the most loved race car in the world!"
  fold5Text  = "Solve the mysteries of Zootopia with the coolest detective duo around, Judy the bunny and Nick the fox!"
  fold6Text  = "Just keep swimming with Dory in this funny underwater adventure about family and friends!"
  fold7Text  = "Experience the adventure of a lifetime with Miguel, a young aspiring musician, as he travels into the mysterious land of the dead!"
  fold8Text  = "They are strong, elastic, invisible and fast! They are the Incredibles!"
  fold9Text  = "Explore the epic circle of life and join Simba in his journey to become the next King of the Savanna!"

  assetPath = "./assets/learnDisney/";
  assetCollection = [
      {
      id: "frozen",
      background: "frozen_bg_pattern",
      mainImage: "frozen_pics",
      logo: "frozen_logo",
      text: this.fold1Text,
      fold1ImageLeft: "",
      fold1ImageRight: "frozen_characters",
      fold2ImageLeft: "",
      fold2ImageRight: "",
      learnMoreUrl: "Learn more",


    },
     {
      id: "toy",
      background: "toy_bg_pattern",
      mainImage: "toy_pics",
      logo: "toy_logo",
      text: this.fold2Text,
      fold1ImageLeft: "",
      fold1ImageRight: "",
      fold2ImageLeft: "toy_left_character",
      fold2ImageRight: "toy_right_character",
      learnMoreUrl: "Learn more"
    },
    {
      id: "moana",
      background: "moana_bg_pattern",
      mainImage: "moana_pics",
      logo: "moana_logo",
      text: this.fold3Text,
      fold1ImageLeft: "moana_left_character",
      fold1ImageRight: "moana_characters",
      fold2ImageLeft: "moana_left_character",
      fold2ImageRight: "moana_right_character",
      learnMoreUrl: "Learn more"
    },
    {
      id: "cars",
      background: "cars_bg_pattern",
      mainImage: "cars_pics",
      logo: "cars_logo",
      text: this.fold4Text,
      fold1ImageLeft: "",
      fold1ImageRight: "cars_characters",
      fold2ImageLeft: "cars_left_character",
      fold2ImageRight: "cars_right_character",
      learnMoreUrl: "Learn more"
    },
    {
      id: "zoo",
      background: "zoo_bg_pattern",
      mainImage: "zoo_pics",
      logo: "zoo_logo",
      text: this.fold5Text,
      fold1ImageLeft: "",
      fold1ImageRight: "zoo_characters",
      fold2ImageLeft: "zoo_left_character",
      fold2ImageRight: "zoo_right_character",
      learnMoreUrl: "Learn more"
    },
    {
      id: "dory",
      background: "dory_bg_pattern",
      mainImage: "dory_pics",
      logo: "dory_logo",
      text: this.fold6Text,
      fold1ImageLeft: "",
      fold1ImageRight: "dory_characters",
      fold2ImageLeft: "dory_left_character",
      fold2ImageRight: "dory_right_character",
      learnMoreUrl: "Learn more"
    },
    {
      id: "coco",
      background: "coco_bg_pattern",
      mainImage: "coco_pics",
      logo: "coco_logo",
      text: this.fold7Text,
      fold1ImageLeft: "",
      fold1ImageRight: "coco_characters",
      fold2ImageLeft: "coco_left_character",
      fold2ImageRight: "coco_right_character",
      learnMoreUrl: "Learn more"
    },
    {
      id: "incradibles",
      background: "incradibles_bg_pattern",
      mainImage: "incradibles_pics",
      logo: "incradibles_logo",
      text: this.fold8Text,
      fold1ImageLeft: "",
      fold1ImageRight: "incradibles_characters",
      fold2ImageLeft: "incradibles_left_character",
      fold2ImageRight: "incradibles_right_character",
      learnMoreUrl: "Learn more"
    },
    {
      id: "lion",
      background: "lion_king_bg_pattern",
      mainImage: "lion_king_pics",
      logo: "lion_king_logo",
      text: this.fold9Text,
      fold1ImageLeft: "lion_king_left_character",
      fold1ImageRight: "lion_king_right_character",
      fold2ImageLeft: "lion_king_left_character",
      fold2ImageRight: "lion_king_right_character",
      learnMoreUrl: "Learn more"
    }


  ];


  learnMore = "Learn more"

  constructor() { }

  ngOnInit() {
  }

  imageErrorHandler(event){
    event.currentTarget.style.display = "none";
  }

}
