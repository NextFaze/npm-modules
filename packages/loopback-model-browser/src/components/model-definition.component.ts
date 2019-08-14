import { Input, ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbmb-model-definition',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './model-definition.component.html',
  styleUrls: ['./model-definition.component.scss'],
})
export class ModelDefinitionComponent {
  @Input() modelDefinition: any;

  getKeys(obj: any) {
    return Object.keys(obj);
  }
}
