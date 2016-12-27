export class FormFields {
  name: string;
  type: string;
  datatype: string;
  icon: string;

  id = 0;
  getId() {
    return this.id++;
  }

  sayHello() {
    console.info('***', this.type);
  }
}
