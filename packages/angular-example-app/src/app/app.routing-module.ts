import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { children } from '@nextfaze/loopback-model-browser';

import { ChildComponentComponent } from './child-component/child-component.component';
import { FormComponent } from './form/form.component';
import { HomeComponent } from './home/home.component';
import { UrlPipesDemoComponent } from './url-pipes-demo/url-pipes-demo.component';
import { QueryComponent } from './query/query.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'datatable',
        component: ChildComponentComponent,
      },
      {
        path: 'form',
        component: FormComponent,
      },
      {
        path: 'system',
        children: children,
      },
      {
        path: 'css-url-pipes',
        component: UrlPipesDemoComponent,
      },
      {
        path: 'query',
        component: QueryComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
