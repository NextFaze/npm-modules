import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModelFormService } from '@nextfaze/loopback-model-form';

@Component({
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  examples = [
    {
      name: 'LoginRequest',
      properties: {
        username: { type: 'string', name: 'username', default: 'johnsmith123' },
        password: { type: 'string', name: 'password', default: 'super secret' },
      },
    },
    {
      name: 'ModelWithObjectTypes',
      properties: {
        type: { type: 'string', name: 'type', default: 'REQUEST_DATA' },
        payload: {
          type: 'object',
          name: 'payload',
          default: {
            message: 'Hello, world',
            language: 'TypeScript',
            framwork: 'Angular',
          },
        },
        live: { type: 'boolean', name: 'live', default: true },
      },
    },
    {
      name: 'SignupRequest',
      properties: {
        username: { type: 'string', name: 'username', default: 'foobarbaz' },
        email: {
          type: 'string',
          name: 'email',
          default: 'someone@example.com',
        },
        dateOfBirth: {
          type: 'date',
          name: 'dateOfBirth',
          default: '2018-01-23T21:55:06.073Z',
        },
        notes: { type: 'UnknownNotesType', name: 'notes' },
        acceptTermsAndConditions: {
          type: 'boolean',
          name: 'acceptTermsAndConditions',
          default: true,
        },
      },
    },
    {
      name: 'ModelWithCustomForm',
      properties: {
        hello: { type: 'string', name: 'hello' },
        notes: { type: 'string', name: 'notes' },
      },
    },
  ];
  submitted: string;
  modelDefinition: string;
  error: string;
  properties: any = {};
  form: FormGroup;

  getControls(properties: any) {
    return Object.keys(properties);
  }

  constructor(public modelFormService: ModelFormService) {}

  test(example) {
    this.modelDefinition = JSON.stringify(example);
    this.select(this.modelDefinition);
  }

  select(str: string) {
    this.error = this.submitted = '';
    try {
      // Validate JSON-ness
      const modelDef = JSON.parse(str);
      const { properties } = modelDef;

      // Validate properties
      for (const name in properties) {
        if (properties[name]) {
          const property = properties[name];
          if (!property.type) {
            throw new Error(`Property ${name} requires 'type' field`);
          }
        }
      }
      this.form = this.modelFormService.createFormForModel(modelDef);
      this.properties = properties;
    } catch (error) {
      this.error = error.message || error;
    }
  }
}
