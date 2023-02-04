import { GetDataService } from 'src/app/get-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-travel',
  templateUrl: './travel.component.html',
  styleUrls: ['./travel.component.css'],
})
export class TravelComponent implements OnInit {
  public select = []; //下拉選單
  public popularList = []; //按鈕
  private buttonNum = 4; //按鈕數
  public areaName: String; //圖片區顯示名稱
  public areaNum = 0; //目前區域編號
  public totalArea = {}; //全部資料
  public viewArea = []; //圖片顯示區資料
  public perPage = 6; //每頁筆數
  public currentPage = 1; //目前頁數
  public dataSize: number; //圖片顯示資料筆數


  constructor(public getDataSvc: GetDataService) {
    this.getData();
  }

  ngOnInit(): void {

  }


  //取得地區資料
  private getData() {
    this.getDataSvc.getDataStatus.subscribe({
      next: (dataStatus) => {
        if (dataStatus === true) {
          this.select = this.getDataSvc.getSelect();
          this.areaName = this.select[0].Zone; //下拉選單預設值
          this.totalArea = this.getDataSvc.getArea();
          this.viewArea = this.totalArea[Object.keys(this.totalArea)[0]].list;
          this.dataSize = this.viewArea.length;
          for (let i = 0; i < this.buttonNum; i++) {
            this.popularList.push(this.select[i]);
          }
        }
      },
      error: () => {
        console.log('get dataStatus error');
      },
    });
  }

  //按鈕選擇
  public buttonClick(keyNum: number) {
    for (let i = 0; i < this.select.length; i++) {
      if (this.select[i].keyNum === keyNum) {
        this.areaNum = this.select[i].keyNum;
        break;
      }
    }
    this.changeArea();
  }

  //地區改變
  public changeArea() {
    let keyNum = Number(this.areaNum); //選單進來會是string所以轉number
    for (let key of Object.keys(this.totalArea)) {
      if (this.totalArea[key].keyNum === keyNum) {
        this.currentPage = 1;
        this.areaName = key;
        this.viewArea = this.totalArea[key].list;
        this.dataSize = this.viewArea.length;
        break;
      }
    }
  }
}
