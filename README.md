# AngularI18nExample

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.15.

## 如何新增文字
新增文字並在tag上加入i18n後，請執行`ng xi18n --output-path src/locale`後，會更新`src/locale/messages.xlf`檔案，並將新增的內容複製到`src/locale/messages.tw.xlf`中，且加入`<target>中文</target>`

## 測試方式

* 英文版執行 `ng serve --configuration=en `
* 中文版執行 `ng serve --configuration=tw `

## 包版方式

`ng build --localize`
