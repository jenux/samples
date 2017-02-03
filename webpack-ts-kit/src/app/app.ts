import * as _ from 'lodash';
import * as $ from 'jquery';
import * as moment from 'moment';

import './app.scss';

$(function() {
  let now = moment().format('LTS');
  let rawHTML = `<h1>${now}</h1>`;
  $('body').append(rawHTML);
});
