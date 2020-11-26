import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-custom-button',
  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.scss']
})
export class CustomButtonComponent implements OnInit {
  @Input() buttonLabel: string = null;
  @Input() isDisabled = false;
  @Input() isLoading = false;
  @Input() size: string;

  // Toggles
  isDelete = false;

  padding: string;
  fontSize: string;
  constructor() { }

  ngOnInit() {
    this.setSizes();
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
