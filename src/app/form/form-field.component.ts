import { Component, ContentChild, Directive, ElementRef, forwardRef, Host, Input, OnChanges, OnDestroy, QueryList, Renderer, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';


@Directive({ selector: '[form-field-input]' })
export class FormFieldInputDirective {}


@Component({
  selector: 'form-field',
  template: `
    <label [attr.for]="field">{{label}}</label>
    <div #inputWrapper>
      <div class="invalid-feedback">
        <div *ngIf="errors.required">Dies ist ein Pflichtfeld</div>
      </div>
      <div class="form-text text-muted" *ngIf="debug">
        <span *ngIf="control.invalid">invalid</span>
        <span *ngIf="control.valid">valid</span>
        <span *ngIf="control.dirty">dirty</span>
        <span *ngIf="control.touched">touched</span>
      </div>
      <div class="form-text text-muted" *ngIf="description">{{ description }}</div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  host: { 'class': 'form-group' },
})
export class FormFieldComponent {
  @Input() field: string;
  @Input() label: string;
  @Input() description: string;
  @Input() formGroup: FormGroup;
  @Input() debug: boolean;
  @ViewChild('inputWrapper') private inputWrapper: ElementRef;
  @ContentChild(FormFieldInputDirective, { read: ElementRef }) private input: ElementRef;
  control: any;
  errors: any = {};

  constructor(
    private renderer: Renderer
  ) {}

  ngOnInit() {
    const inputEl = this.input.nativeElement;
    this.inputWrapper.nativeElement.insertBefore(inputEl, this.inputWrapper.nativeElement.firstChild);
    this.renderer.setElementClass(inputEl, 'form-control', true);

    const control = this.formGroup.get(this.field);
    this.control=control;

    const updateValidationState = () => {
      this.errors = control.errors || {};
      this.renderer.setElementClass(inputEl, 'is-invalid', control.invalid && (control.dirty || control.touched));
    };

    control.statusChanges.subscribe(updateValidationState);
    inputEl.addEventListener('blur', updateValidationState);
    updateValidationState();
  }
}
