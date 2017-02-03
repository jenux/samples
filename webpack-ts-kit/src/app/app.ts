import * as _ from 'lodash';
import * as $ from 'jquery';
import * as moment from 'moment';

import './app.scss';

function component () {
  var elem = document.createElement('h1');
  elem.innerHTML = _.join(['Hello','eee'], ' ');
  return elem;
}

document.body.appendChild(component());
