import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {WebAPI} from '../../web-api';

import {areEqual} from '../../utility';
import {ContactUpdated, ContactViewed} from '../../message';

//import {computedFrom} from 'aurelia-framework';

interface Contact {
  firstName: string;
  lastName: string;
  email: string;
}

@inject(WebAPI, EventAggregator)
export class ContactDetail {
  routeConfig;
  contact: Contact;
  originalContact: Contact;
  message: string;

  constructor(private api: WebAPI, private ea: EventAggregator) { }

  activate(params, routeConfig) {
    this.routeConfig = routeConfig;

    return this.api.getContactDetails(params.id).then(contact => {
      this.contact = <Contact>contact;
      this.routeConfig.navModel.setTitle(this.contact.firstName);
      this.originalContact = JSON.parse(JSON.stringify(this.contact));

      this.ea.publish(new ContactViewed(this.contact));
    });

  }

  get canSave() {
    return this.contact.firstName &&
      this.contact.lastName &&
      !this.api.isRequesting &&
      !areEqual(this.originalContact, this.contact);
  }


  save() {
    this.message = "Saving...";
    this.api.saveContact(this.contact).then(contact => {
      this.contact = <Contact>contact;
      this.routeConfig.navModel.setTitle(this.contact.firstName);
      this.originalContact = JSON.parse(JSON.stringify(this.contact));
      this.message = "Saved";

      this.ea.publish(new ContactUpdated(this.contact));
      setTimeout(()=>this.message="", 1000);
    });
  }

  canDeactivate() {
    if (!areEqual(this.originalContact, this.contact)) {
      let result = confirm('You have unsaved changes. Are you sure you wish to leave?');
      if (!result) {
        this.ea.publish(new ContactViewed(this.contact));
      }
      return result;
    }

    return true;
  }
}
