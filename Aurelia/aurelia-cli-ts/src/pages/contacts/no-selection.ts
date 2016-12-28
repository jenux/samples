
export class NoSelection {
  message = "Please select a contact to start";
  showing = false;

  options = [
    {id: false, text: 'Hide'},
    {id: true, text: 'Show'}
  ]

  closeDialog() {
    this.showing = false;
  }

  content="../../../pages/contacts/list";
}
