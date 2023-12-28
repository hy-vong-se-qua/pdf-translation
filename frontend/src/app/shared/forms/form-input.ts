import { OnChanges, Input, Directive } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { CallbackFunction, CustomType } from '../type/dynamic-type';

@Directive()
export abstract class FormInput implements ControlValueAccessor, OnChanges {

  @Input('readonly') public readonly: boolean = false;
  @Input('must') public must: boolean = false;
  @Input("style") public style: CustomType<string> = {};

  protected onChangeCallback: CallbackFunction<any, void> = null;
  public value: string = "";
  public cssClass: CustomType<boolean> = {};

  ngOnChanges(): void {
    this.cssClass = {
      'form-control': true,
      'must': this.must,
    }
  }

  writeValue(value: string): void {
    if (this.value != value) this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void { }

  setDisabledState?(isDisabled: boolean): void { }


  public onChange(event: any) {
    const value = event.target.value;
    this.onChangeCallback(value);
  }
}
