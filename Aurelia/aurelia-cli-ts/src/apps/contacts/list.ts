import {WebAPI} from './web-api';
import {inject} from 'aurelia-framework';

import {EventAggregator} from 'aurelia-event-aggregator';
import {ContactUpdated, ContactViewed} from './message';

@inject(WebAPI, EventAggregator)
export class ContactList {
  contacts;
  selectId = 0;

  constructor(private api: WebAPI, ea: EventAggregator) {
    ea.subscribe(ContactViewed, msg => this.select(msg.contact));
    ea.subscribe(ContactUpdated, msg => {
      let id = msg.contact.id;
      let found = this.contacts.find(x => x.id == id);
      Object.assign(found, msg.contact);
    });
  }

  created() {
    this.api.getContactList().then(contacts => this.contacts = contacts);
  } 
  select(contact) {
    this.selectId = contact.id;
    return true;
  } 
}
