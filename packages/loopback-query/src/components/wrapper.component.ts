import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'lbq-wrapper',
  template: `
    <form [formGroup]="formGroup" (ngSubmit)="onSubmit(formGroup.value)">
        <form *ngFor="let field of fields" [formGroup]="field.form">
            <ng-container *ngTemplateOutlet="inputTpl; context: field.inputCtx"></ng-container>
            <ng-container *ngTemplateOutlet="selectorTpl; context: field.selectorCtx"></ng-container>
        </form>
        <ng-container *ngTemplateOutlet="content"></ng-container>
    </form>
  `,
})
export class WrapperComponent implements OnInit {
  dataModel: any;
  formGroup: FormGroup;
  inputTpl: TemplateRef<any>;
  selectorTpl: TemplateRef<any>;
  content: TemplateRef<any>;
  onSubmit: Function;
  fields: any[] = [];

  constructor(
    private fb: FormBuilder,
    private factory: ComponentFactoryResolver
  ) {}

  ngOnInit() {
    this.formGroup = this.createForm(this.dataModel);
    this.fields = this.createFields(this.dataModel, this.formGroup);
  }

  createForm(dataModel: any) {
    const config = {};
    for (let name in dataModel) {
      if (dataModel[name]) {
        config[name] = this.fb.group({
          type: dataModel[name].types[0],
          value: '',
        });
      }
    }
    return this.fb.group(config);
  }

  createFields(dataModel: any, form: FormGroup) {
    const fields = [];
    for (let name in dataModel) {
      if (dataModel[name]) {
        fields.push({
          form: this.formGroup.get(name) as FormGroup,
          inputCtx: {
            name: name,
            formControl: this.formGroup.get(name).get('value'),
          },
          selectorCtx: {
            types: dataModel[name].types,
            formControl: this.formGroup.get(name).get('type'),
          },
        });
      }
    }
    return fields;
  }
}
