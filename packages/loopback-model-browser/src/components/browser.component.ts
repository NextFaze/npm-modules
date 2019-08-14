import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { ModelApiService } from '@nextfaze/loopback-datatable';

import { LoopbackModelBrowserConfig, MODEL_BROWSER_CONFIG } from '../config';

@Component({
  selector: 'lbmb-browser',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.scss'],
})
export class BrowserComponent implements OnInit {
  constructor(
    public modelApi: ModelApiService,
    public router: Router,
    @Inject(MODEL_BROWSER_CONFIG) public config: LoopbackModelBrowserConfig
  ) {}
  modelGroups: any[];
  models = {};
  text: string;

  ngOnInit() {
    const groupOther = this.config.groupOther || {
      title: 'Models',
      icon: 'folder',
    };
    const hidden = this.config.hidden || [];
    const models = this.modelApi.modelNames.filter(
      name => !hidden.find(regex => regex.test(name))
    );
    // Add the models into their groups
    let ungrouped = [...models];
    const modelGroups = this.config.modelGroups || [];
    modelGroups.forEach(({ title, match }: any) => {
      this.models[title] = models.filter(name => match.test(name)).map(name => {
        if (ungrouped.indexOf(name) >= 0) {
          ungrouped.splice(ungrouped.indexOf(name), 1);
        }
        return name;
      });
    });
    // Add the unsorted models into a group at the bottom
    this.models[groupOther.title] = ungrouped;
    this.modelGroups = [...modelGroups, groupOther];
  }

  view(modelName: string) {
    this.router.navigate([this.config.routerRoot, modelName]);
  }

  filter(models: string[], text: string) {
    if (!text) {
      return models;
    }
    return models.filter(model =>
      model.toLowerCase().includes(text.toLowerCase())
    );
  }
}
