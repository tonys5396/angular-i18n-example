import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
//import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root',
})
export class GetDataService {
  private objArea = {}; //整理全部資料
  private selectOption = []; //編號、地區
  private dataStatus = new BehaviorSubject<boolean>(false);
  public getDataStatus = this.dataStatus.asObservable();

  constructor(private http: HttpClient) {
    this.init();
  }

  private init() {
    this.getData().subscribe({
      next: (travelData: any) => {
        //console.log(travelData);
        let infoData = travelData.data.XML_Head.Infos.Info;
        this.cleanData(infoData);
        this.dataStatus.next(true);
        //取得完整的資料
      },
      error: (error) => {
        console.log('get travelData error');
        console.log(error);
      },
    });
  }

  private getData() {
    const API ='https://api.kcg.gov.tw/api/service/get/9c8e1450-e833-499c-8320-29b36b7ace5c';
    const header = { 'Content-Type': 'application/json;multipart/form-data' };
    return this.http.get(API, { headers: header });
  }

  private cleanData(infoData) {
    var objTemperate = {};
    var areaName = '';
    var keyNum = 0;
    //更新選單和資料整理
    for (var i = 0; i < infoData.length; i++) {
      areaName = this.findArea(infoData[i].Add);
      //console.log(areaName);
      //obj中沒地點就加入一個
      if (!this.objArea[areaName]) {
        this.selectOption.push({ keyNum: keyNum, Zone: areaName });
        this.objArea[areaName] = { list: [], keyNum: keyNum };
        keyNum += 1;
      }
      //不重複地區加入選單
      objTemperate = {
        Tel: infoData[i].Tel,
        Zone: areaName,
        Add: this.deleteZipcode(infoData[i].Add),
        Opentime: infoData[i].Opentime,
        Name: infoData[i].Name,
        Picture1: infoData[i].Picture1,
        Ticketonfo: infoData[i].Ticketinfo
      };
      this.objArea[areaName].list.push(objTemperate);
      objTemperate = {};
    }
  }

  //從地址中切出區域名
  private findArea(add) {
    var str1 = '';
    var str2 = [];
    //先切掉 高雄市+郵遞區號
    str1 = add.substr(6);
    //以區為分割切開
    str2 = str1.split('區');
    //只留下區域，所以只要陣列的第一個位置，並把刪掉的區還回去
    str2[0] += '區';
    return str2[0];
  }

  //把地址裡的郵遞區號去掉
  private deleteZipcode(add) {
    var str1 = '';
    var str2 = '';
    //切出高雄市
    str1 = add.substr(0, 3);
    //切出郵遞區號後面得地址
    str2 = add.substr(6);
    return str1 + str2;
  }

  public getArea(){
    return this.objArea;
  }

  public getSelect(){
    return this.selectOption;
  }

}
