export class FieldBase {
  icon:  string;
  title: string;
  type:  string = 'base';
  datatype: string;
  archetype: string = 'field';

  model: any;
  
  id = 0;
  getId() {
    return this.id++;
  }
}
