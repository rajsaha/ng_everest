import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ColorEvent } from 'ngx-color';

@Component({
  selector: 'app-resource-no-image',
  templateUrl: './resource-no-image.component.html',
  styleUrls: ['./resource-no-image.component.scss']
})
export class ResourceNoImageComponent implements OnInit, OnChanges {
  @Input() data: any;
  form: FormGroup;
  
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.prepareText(this.data);
  }

  initForm() {
    this.form = this.fb.group({
      topText: [""],
      bottomText: [""],
      preset: [""],
      backgroundColor: [""],
      textColor: [""]
    });
  }

  prepareText(data: any) {
    let stringArray = data.title.split(" ");
    let halfLength = Math.ceil(stringArray.length / 2);
    let topText = stringArray.splice(0, halfLength);
    let bottomText = stringArray;
    this.form.controls.topText.patchValue(topText.join(" "));
    this.form.controls.bottomText.patchValue(bottomText.join(" "));
  }

  handleBgColorChange($event: ColorEvent) {
    console.log($event.color);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.initForm();
    if (!changes.firstChange && changes.data.currentValue.title) {
      let temp = { title: changes.data.currentValue.title };
      this.prepareText(temp);
    }
  }

}
