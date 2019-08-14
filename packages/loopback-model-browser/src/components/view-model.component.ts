import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModelFormService } from '@nextfaze/loopback-model-form';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'lbmb-model-view',
  templateUrl: './view-model.component.html',
  styleUrls: ['./view-model.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewModelComponent {
  @Input() modelDefinition: any;
  @Input() initialData: any;

  form: FormGroup;
  modelProperties: any[] = [];

  @Output() patchAttributes = new EventEmitter();
  @Output() deleteById = new EventEmitter();

  model$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private formService: ModelFormService) {}

  ngAfterContentInit() {
    this.modelProperties = this.modelDefinition
      ? Object.keys(this.modelDefinition.properties).map(
          propName => this.modelDefinition.properties[propName]
        )
      : [];
    this.form = this.formService.buildForm(
      this.modelDefinition.properties,
      this.initialData
    );
  }
}
