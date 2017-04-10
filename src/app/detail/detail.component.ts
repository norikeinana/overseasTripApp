import {Component, Input, ViewChild} from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/modal';

@Component({
  selector: 'detail-dialog',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})

export class DetailComponent{
  //親コンポーネントから受け取るプロパティ
 @Input() tourData;
  //Modalダイアログへの参照
 @ViewChild("lgModal") public modalRef:ModalDirective;//Modalダイアログへの参照
 
  //--------------------
  //コンストラクタ
  //--------------------
  constructor() {
  }

  //--------------------
  //ダイアログを開く
  //--------------------
  openDialog() {
   this.modalRef.show();
  }
}
