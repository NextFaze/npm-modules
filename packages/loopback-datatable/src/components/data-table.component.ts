import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  ContentChildren,
  Input,
  QueryList,
  ViewChildren
} from '@angular/core';
import { MatPaginator } from '@angular/material';

import { AbstractModelApi } from '..';
import { CellPlaceholderDirective, CellRendererDirective } from '../directives';
import { ColumnRendererConfig } from '../services';
import { CellRendererComponent, ColumnConfig } from '../types';

@Component({
  selector: 'loopback-datatable, loopback-data-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './data-table.component.html'
})
export class LoopbackDataTableComponent {
  // Whether or not to link rows. The string passed in will be the key to link to
  @Input() paginator: MatPaginator;
  @Input() query: any;
  @Input() relatedFields = 'merge';
  _columnConfig: Map<string, ColumnConfig>;
  @Input()
  set columnConfig(value: Map<string, ColumnConfig>) {
    this._columnConfig = value;
    this.columns = Array.from(this.columnConfig.values());
  }
  get columnConfig() {
    return this._columnConfig;
  }
  @Input() displayedColumns: string[];

  // Loopback model to be turned into a datasource for CDK
  @Input() model: AbstractModelApi;

  columns: ColumnConfig[];

  // Placeholder cells rendered in the table.
  @ViewChildren(CellPlaceholderDirective)
  set placeholders(values: QueryList<CellPlaceholderDirective>) {
    this.cellPlaceholders.clear();
    if (values) {
      values.forEach(cell => {
        const cells = this.cellPlaceholders.get(cell.cellPlaceholder) || [];
        this.cellPlaceholders.set(cell.cellPlaceholder, cells.concat(cell));
      });
    }
    this.rerender();
  }

  // Custom cell renderers from the parent
  @ContentChildren(CellRendererDirective)
  set renderers(values: QueryList<CellRendererDirective>) {
    this.cellRenderers.clear();
    if (values) {
      values.forEach(value => {
        this.cellRenderers.set(value.cellRenderer, value);
      });
    }
    this.rerender();
  }

  cellPlaceholders: Map<string, CellPlaceholderDirective[]> = new Map();
  cellRenderers: Map<string, CellRendererDirective> = new Map();
  sortActive: string;
  sortDirection: string;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    public config: ColumnRendererConfig
  ) {}

  ngOnInit() {
    const modelProperties = Object.keys(
      this.model.model.getModelDefinition().properties
    );

    if (!this.columnConfig) {
      this.columnConfig = new Map();
      modelProperties.forEach(item =>
        this.addColumn(item, {
          key: item,
          type: this.model.model.getModelDefinition().properties[item].type,
          sortable: true,
          title: this.title(item)
        })
      );
    }

    this.displayedColumns =
      this.displayedColumns || Array.from(this.columnConfig.keys());

    if (this.relatedFields === 'merge') {
      this.resolveRelations();
    }
  }

  addColumn(key: string, value: ColumnConfig) {
    this.columnConfig.set(key, value);
    this.columns = Array.from(this.columnConfig.values());
  }

  title(value: string) {
    // Convert to title case except the value 'id' when it is on its own which becomes 'ID'
    return `${value[0].toUpperCase()}${value
      .slice(1)
      .replace(/([A-Z])/g, ' $1')}`.replace(/\b(id)\b/gi, 'ID');
  }

  resolveRelations() {
    const relations = this.model.model.getModelDefinition().relations;
    for (let relationName in relations) {
      if (relations[relationName]) {
        const relation = relations[relationName];
        switch (relation.relationType) {
          case 'belongsTo': {
            this.addColumn(relation.keyFrom, {
              key: relation.keyFrom,
              type: 'belongsTo',
              sortable: false,
              title: this.title(relation.name)
            });
          }
        }
      }
    }
  }

  /**
   * Update all the cell placeholders passed to CDK with our custom renderers
   */
  rerender() {
    this.cellPlaceholders.forEach((placeholders, key) => {
      const renderer = this.cellRenderers.get(key);
      const config = this.columnConfig.get(key);
      placeholders.forEach(placeholderCell => {
        placeholderCell.viewContainer.clear();
        if (renderer) {
          placeholderCell.viewContainer.createEmbeddedView(renderer.template, {
            $implicit: placeholderCell.payload
          });
        } else {
          const self = this;
          this.renderComponentForCell(
            config,
            placeholderCell,
            key,
            this.config.getCellRenderer(key) ||
              this.config.getCellRenderer(config.type) ||
              this.config.getCellRenderer('object')
          );
        }
      });
    });
    this.changeDetector.detectChanges();
  }

  renderComponentForCell(
    config: ColumnConfig,
    placeholderCell: CellPlaceholderDirective,
    key: string,
    componentClass: any
  ) {
    const payload = config.render
      ? config.render(placeholderCell.payload)
      : placeholderCell.payload[key];
    const createdComponent = this.createComponent(
      placeholderCell,
      payload,
      componentClass
    );
    createdComponent.instance.row = placeholderCell.payload;
    createdComponent.instance.columnName = key;
    createdComponent.instance.api = this.model;
  }

  createComponent(
    targetComponent: CellPlaceholderDirective,
    payload: string,
    component: new () => CellRendererComponent<any>
  ): ComponentRef<CellRendererComponent<any>> {
    const factory = this.componentFactoryResolver.resolveComponentFactory(
      component
    );
    const cell = targetComponent.viewContainer.createComponent(factory);
    return cell;
  }
}
