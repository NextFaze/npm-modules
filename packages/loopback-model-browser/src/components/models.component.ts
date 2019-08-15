import { Location } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatExpansionPanel } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { ModelApiService } from '@nextfaze/loopback-datatable';
import { QuerializeService } from '@nextfaze/loopback-query';

import { LoopbackModelBrowserConfig, MODEL_BROWSER_CONFIG } from '../config';

@Component({
  selector: 'lbmb-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.scss'],
})
export class ModelsComponent implements OnInit {
  query: any;
  subscription: any;
  modelName: string;
  modelDefinition: any;
  dataModel: any;
  api: any;
  viewModelDefinition: boolean;
  @ViewChild('filterPanel', { static: true })
  filterPanel: MatExpansionPanel;
  @ViewChild('definitionPanel', { static: true })
  definitionPanel: MatExpansionPanel;
  constructor(
    public modelsApi: ModelApiService,
    public route: ActivatedRoute,
    public location: Location,
    public service: QuerializeService,
    @Inject(MODEL_BROWSER_CONFIG) public config: LoopbackModelBrowserConfig
  ) {}

  ngOnInit() {
    this.subscription = this.route.params.subscribe(({ modelName }: any) =>
      this.setModel(modelName)
    );
  }

  setModel(modelName: string) {
    this.modelName = modelName;
    this.modelDefinition = this.modelsApi.getModelDefinition(modelName);
    this.api = this.modelsApi.getModelApi(modelName);
    this.dataModel = this.service.createDataModel(this.modelDefinition);
  }

  toggleDefinitionPanel() {
    this.definitionPanel.toggle();
  }

  toggleFilterPanel() {
    this.filterPanel.toggle();
  }

  update(query: any) {
    this.query = query;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
