//--------------------
// 通信処理
//--------------------
import { Injectable } from '@angular/core';
import {RequestOptions, URLSearchParams, Jsonp, Response, RequestOptionsArgs} from "@angular/http";
import {Observable} from  "rxjs/Observable";
import "rxjs/add/operator/map";

@Injectable()
export class HttpService {

  //Web API URL
  WEB_API_URL: string =
    "https://webservice.recruit.co.jp/ab-road/tour/v1/";
  //APIキー
  API_KEY = "";
  //取得件数
  DEFAULT_SIZE = "30";
  //取得の順番(人気順:5)
  SORT_RANKING = "5";
  //JSONPコールバック関数名(Angular2固有値）
  // CALLBACK = "JSONP_CALLBACK";
  //JSONP_CALLBACKが動作しない為、仕方なく定義
  times: number;

  //--------------------
  // コンストラクタ
  // JSONPのDI
  //--------------------
  constructor(private jsonp: Jsonp) {
      this.times=0;
  }

  //--------------------
  //クラウドからツアー情報取得
  //--------------------
  getTourData(areaCode: string): Observable<Response> {
    //接続設定
    let option = this.setParam(areaCode);
    //データ取得
    return this.reqData(option);
  }

  //--------------------
  //通信設定値作成
  //--------------------
  setParam(areaCode: string): RequestOptions {
    //Urlパラメータオブジェクト作成
    let param = new URLSearchParams();
    param.set("key", this.API_KEY);
    param.set("area", areaCode);
    param.set("order", this.SORT_RANKING);
    param.set("count", this.DEFAULT_SIZE);
    param.set("format", "jsonp");
    // 何故かこの指定だと動作しないのでコメントアウト
    // param.set("callback", this.CALLBACK);
    param.set("callback", `__ng_jsonp__.__req${this.times}.finished`);
    this.times=this.times+1;
    
    //通信設定オブジェクト作成
    let options: RequestOptionsArgs = {
        method: "get",
        url: this.WEB_API_URL,
        search: param
    };
    return new RequestOptions(options);
  }
  //--------------------
  //HTTPリクエストとレスポンス処理
  //--------------------
  reqData(config: RequestOptions): Observable<Response> {
    return this.jsonp.request(config.url, config)
    .map((response) => {
            let tourData;
            let obj = response.json();
            if (obj.results.error) {
                //Web APIリクエスト失敗
                let err = obj.results.error[0];
                tourData = {
                    error: err.code,
                    message: err.message
                }
            } else {
                //Web APIリクエスト成功
                let dataObj = obj.results.tour;
                tourData = {
                    error: null,
                    data: dataObj,
                };
            }
            console.dir(tourData);
            return tourData;
        });
    };
}
