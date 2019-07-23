import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { TranslateService,LangChangeEvent } from '@ngx-translate/core';


@Component({
  selector: 'app-learning-with-disney',
  templateUrl: './learning-with-disney.component.html',
  styleUrls: ['./learning-with-disney.component.css']
})
export class LearningWithDisneyComponent implements OnInit {

  fold1Text = ""
  fold2Text = ""
  fold3Text = ""
  fold4Text = ""
  fold5Text = ""
  fold6Text = ""
  fold7Text = ""
  fold8Text = ""
  fold9Text = ""

  assetPath = "./assets/learnDisney/";
  dynamicAssetPath = "./assets/learnDisney/";
  assetCollection = [];
  activeLanguage = "en";
  baseVideoUrl = "https://kantoo-kids.s3-eu-west-1.amazonaws.com/assets/learnDisney/pt/Videos/";
  baseVideoUrlTestCDN = "https://besttv233.cdn.it.best-tv.com/assets/learnDisney/pt/Videos/";
  learnMore = "Learn more"

  constructor(private deviceService: DeviceDetectorService, private translate: TranslateService) {
    if (this.deviceService.isMobile()) {
      this.dynamicAssetPath += "Mobile/"
    }
    this.changeLanguage(translate);
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.activeLanguage = event.lang;
        this.changeLanguage(translate);
    });

  }



  changeLanguage(translate: TranslateService):void {
    translate.get(['fold1Text', 'fold2Text', 'fold3Text', 'fold4Text', 'fold5Text', 'fold6Text', 'fold7Text', 'fold8Text', 'fold9Text']).subscribe(translations => {

      this.assetCollection = [
        {
          id: 2,
          name: "frozen",
          background: "frozen_bg_pattern",
          mainImage: "frozen_pics",
          logo: "frozen_logo",
          text: translations.fold1Text,
          fold1ImageLeft: "",
          fold1ImageRight: "frozen_characters",
          fold2ImageLeft: "",
          fold2ImageRight: "",
          learnMoreUrl: "Learn more",
          videoUrl: "PT_Frozen_1.mp4"


        },
        {
          id: 4,
          name: "toy",
          background: "toy_bg_pattern",
          mainImage: "toy_pics",
          logo: "toy_logo",
          text: translations.fold2Text,
          fold1ImageLeft: "",
          fold1ImageRight: "",
          fold2ImageLeft: "toy_left_character",
          fold2ImageRight: "toy_right_character",
          learnMoreUrl: "Learn more",
          videoUrl: "PT_TS3_1.mp4"
        },
        {
          id: 3,
          name: "moana",
          background: "moana_bg_pattern",
          mainImage: "moana_pics",
          logo: "moana_logo",
          text: translations.fold3Text,
          fold1ImageLeft: "moana_left_character",
          fold1ImageRight: "moana_characters",
          fold2ImageLeft: "moana_left_character",
          fold2ImageRight: "moana_right_character",
          learnMoreUrl: "Learn more",
          videoUrl: "PT_Moana_1.mp4"
        },
        {
          id: 0,
          name: "cars",
          background: "cars_bg_pattern",
          mainImage: "cars_pics",
          logo: "cars_logo",
          text: translations.fold4Text,
          fold1ImageLeft: "",
          fold1ImageRight: "cars_characters",
          fold2ImageLeft: "cars_left_character",
          fold2ImageRight: "cars_right_character",
          learnMoreUrl: "Learn more",
          videoUrl: "PT_Cars_1.mp4"
        }/*,
        {
          id: 5,
          name: "zoo",
          background: "zoo_bg_pattern",
          mainImage: "zoo_pics",
          logo: "zoo_logo",
          text: translations.fold5Text,
          fold1ImageLeft: "",
          fold1ImageRight: "zoo_characters",
          fold2ImageLeft: "zoo_left_character",
          fold2ImageRight: "zoo_right_character",
          learnMoreUrl: "Learn more"
        },
        {
          id: 1,
          name: "dory",
          background: "dory_bg_pattern",
          mainImage: "dory_pics",
          logo: "dory_logo",
          text: translations.fold6Text,
          fold1ImageLeft: "",
          fold1ImageRight: "dory_characters",
          fold2ImageLeft: "dory_left_character",
          fold2ImageRight: "dory_right_character",
          learnMoreUrl: "Learn more"
        },*/
      /*  {
          name: "coco",
          background: "coco_bg_pattern",
          mainImage: this.activeLanguage + "/coco_pics",
          logo: this.activeLanguage + "/coco_logo",
          text: translations.fold7Text,
          fold1ImageLeft: "",
          fold1ImageRight: "coco_characters",
          fold2ImageLeft: "coco_left_character",
          fold2ImageRight: "coco_right_character",
          learnMoreUrl: "Learn more"
        },
        {
          name: "incradibles",
          background: "incradibles_bg_pattern",
          mainImage: this.activeLanguage + "/incradibles_pics",
          logo: "incradibles_logo",
          text: translations.fold8Text,
          fold1ImageLeft: "",
          fold1ImageRight: "incradibles_characters",
          fold2ImageLeft: "incradibles_left_character",
          fold2ImageRight: "incradibles_right_character",
          learnMoreUrl: "Learn more"
        },
        {
          name: "lion",
          background: "lion_king_bg_pattern",
          mainImage: this.activeLanguage + "/lion_king_pics",
          logo: "lion_king_logo",
          text: translations.fold9Text,
          fold1ImageLeft: "lion_king_left_character",
          fold1ImageRight: "lion_king_right_character",
          fold2ImageLeft: "lion_king_left_character",
          fold2ImageRight: "lion_king_right_character",
          learnMoreUrl: "Learn more"
        }*/
      ];
    })
  }

  ngOnInit() {
  }

  toggleVideo(event){
    var idNum = event.target.id.charAt(event.target.id.length-1)
    event.target.style.display = "none";
    document.getElementById('video'+idNum).style.display = "block";
    (<HTMLVideoElement>document.getElementById('video'+idNum)).play();
  }

  imageErrorHandler(event) {
    event.currentTarget.style.display = "none";
  }

}
