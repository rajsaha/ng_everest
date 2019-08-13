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
  constructor() { }

  ngOnInit() {
    this.setBgColor();
    this.setSize();
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
  }

  setSize() {
    switch (this.size) {
      case 'large':
        this.padding = '15px 100px';
        break;
      case 'small':
        this.padding = '15px 50px';
        break;
      default:
        this.padding = '15px 100px';
        break;
    }
  }

}
