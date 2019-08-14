## @nextfaze/css-url-pipes

Straight forward pipe to turn an image url into a css url:

```typescript
// Example usage
@Component({
  selector: 'my-cmp',
  template: `
    <div [style.backgroundImage]="image | cssUrl"></div>
  `
})
export class MyComponent {
  public image: 'goo.gl/63eYzG'; // with pipe gets converted to 'url("goo.gl/63eYzG")'
}
```

## Installation

```typescript
import { CssUrlPipesModule } from '@nextfaze/css-url-pipes';

@NgModule({
  // ...
  imports: [
    // ...,
    CssUrlPipesModule
  ]
  // ...
})
export class MyModule {}
```
