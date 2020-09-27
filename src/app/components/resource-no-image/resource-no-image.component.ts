import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { setFormValue } from "@services/ngrx/noImageComponent.actions";
import { Observable } from "rxjs";
import { select, Store } from "@ngrx/store";

@Component({
  selector: "app-resource-no-image",
  templateUrl: "./resource-no-image.component.html",
  styleUrls: ["./resource-no-image.component.scss"],
})
export class ResourceNoImageComponent implements OnInit, OnChanges {
  @Input() data: { title: string, backgroundColor?: string, textColor?: string };
  @Input() mode = "edit";
  form: FormGroup;

  // Store
  noImageComponentFormState$: Observable<boolean>;

  // Presets
  presets = [
    {
      backgroundColor: "#000",
      textColor: "#fff",
      text: "Black & White"
    }
  ];

  constructor(
    private fb: FormBuilder,
    private store: Store<{ noImageComponentFormState: any }>
  ) {
    this.noImageComponentFormState$ = store.pipe(
      select("noImageComponentFormState")
    );
  }

  ngOnInit(): void {
    this.initForm();
    if (this.mode === 'edit') {
      this.onFormChange();
      this.monitorNoImageState();
    }
    this.prepareText(this.data);
  }

  initForm() {
    this.form = this.fb.group({
      topText: [""],
      bottomText: [""],
      preset: [""],
      backgroundColor: ["#ffbc63"],
      textColor: ["#c25151"],
      presetSelect: [""]
    });
  }

  onFormChange() {
    this.form.valueChanges.subscribe((val) => {
      this.store.dispatch(setFormValue({ formVal: val }));
    });
  }

  setPreset(selectValue: any) {
    this.form.controls.backgroundColor.patchValue(selectValue.value.backgroundColor);
    this.form.controls.textColor.patchValue(selectValue.value.textColor);
  }

  prepareText(data: any) {
    if (this.mode === 'edit') {
      this.monitorNoImageState();
    }
    let stringArray = data.title.split(" ");
    let halfLength = Math.ceil(stringArray.length / 2);
    let topText = stringArray.splice(0, halfLength);
    let bottomText = stringArray;
    this.form.controls.topText.patchValue(topText.join(" "));
    this.form.controls.bottomText.patchValue(bottomText.join(" "));
    if (this.mode === 'edit') {
      this.store.dispatch(setFormValue({ formVal: this.form.value }));
    } else {
      this.form.controls.backgroundColor.patchValue(data.backgroundColor);
      this.form.controls.textColor.patchValue(data.textColor);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.firstChange && changes.data.currentValue.title) {
      this.initForm();
      this.onFormChange();
      let temp = { title: changes.data.currentValue.title };
      this.prepareText(temp);
    }
  }

  monitorNoImageState() {
    this.store
      .select((state) => state)
      .subscribe((data: any) => {
        this.form.controls.backgroundColor.patchValue(
          data.noImageComponentState.backgroundColor,
          { emitEvent: false, onlySelf: true }
        );
        this.form.controls.textColor.patchValue(
          data.noImageComponentState.textColor,
          { emitEvent: false, onlySelf: true }
        );
        this.form.controls.preset.patchValue(
          data.noImageComponentState.preset,
          { emitEvent: false, onlySelf: true }
        );
      });
  }
}
