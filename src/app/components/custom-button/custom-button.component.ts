import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-custom-button',
  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.scss']
})
export class CustomButtonComponent implements OnInit {
  @Input() buttonLabel: string = null;
  @Input() isDisabled = false;
  @Input() backgroundColor: string;
  @Input() size: string;

  bgColor: string;
  padding: string;
  fontSize: string;
  constructor() { }

  ngOnInit() {
    this.setBgColor();
    this.setSizes();
  }

  setBgColor() {
    switch (this.backgroundColor) {
      case 'delete':
        this.bgColor = 'red';
        break;
      default:
        this.bgColor = '#FF795A';
        break;
    }

    if (this.isDisabled) {
      this.bgColor = 'transparent !important';
    }
  }

  setSizes() {
    switch (this.size) {
      case 'large':
        this.padding = '15px 100px';
        this.fontSize = 'inherit';
        break;
      case 'small':
        this.padding = '10px 50px';
        this.fontSize = '14px';
        break;
      default:
        this.padding = '15px 100px';
        this.fontSize = 'inherit';
        break;
    }
  }

}
