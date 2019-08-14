import { FormGroup } from '@angular/forms';

export type ModelFormConfig = Map<
  string,
  { defaults: Object; form: FormGroup }
>;
