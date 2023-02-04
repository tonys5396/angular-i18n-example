import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lang-button',
  templateUrl: './lang-button.component.html',
  styleUrls: ['./lang-button.component.css']
})
export class LangButtonComponent implements OnInit {

  public displayLanguage: string = 'en-US'; //語言

  constructor() { }

  ngOnInit(): void {
    this.displayLanguage = this.getCurrentLanguage();
  }

  //改變語言按鈕
  public changeLanguage(){
    let redirectLang: string;
    if(this.displayLanguage === 'en-US'){
      redirectLang = 'tw';
    }else{
      redirectLang = 'en-US';
    }
    //網址語言取代
    const redirectPathName = window.location.pathname.replace(`/${this.displayLanguage}/`, `/${redirectLang}/`);
    window.location.pathname = redirectPathName;
  }

  //抓取目前語言
  private getCurrentLanguage = () => {
    const lang = ['en-US', 'tw']; //設定要抓取的語言
    //從pathname裡找出語言
    const currentLang = lang.find(l => new RegExp(`/${l}/`).test(window.location.pathname));
    if (!currentLang) {
      return 'tw';
    }
    return currentLang;
  };

}
