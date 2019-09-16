import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-custom-button',
  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.scss']
})
export class CustomButtonComponent implements OnInit {
  @Input() buttonLabel: string = null;
  @Input() isDisabled: boolean = false;
  @Input() isLoading: boolean = false;
  @Input() backgroundColor: string;
  @Input() size: string;

  // Toggles
  isDelete = false;

  // Styles
  bgColor: string;
  border: string;
  padding: string;
  fontSize: string;
  color = 'white';
  boxShadow = 'box-shadow: 0 13px 26px rgba(255, 121, 90, 0.5)';
  fontFamily = '"Montserrat", sans-serif !important';
  constructor() { }

  ngOnInit() {
    this.setBgColor();
    this.setSizes();
  }

  setBgColor() {
    switch (this.backgroundColor) {
      case 'delete':
        this.isDelete = true;
        this.bgColor = 'transparent';
        this.border = '1px solid tomato';
        this.boxShadow = 'none';
        this.color = 'rgba(0, 0, 0, .8)';
        break;
      default:
        this.bgColor = '#FF795A';
        break;
    }

    if (this.isDisabled) {
      this.bgColor = 'transparent !important';
      this.boxShadow = 'none';
    }
  }

  setSizes() {
    switch (this.size) {
      case 'large':
        this.padding = '15px 100px';
        this.fontSize = 'inherit';
        break;
      case 'small':
        this.fontSize = '14px';
        break;
      default:
        this.fontSize = 'inherit';
        break;
    }
  }

}
