import * as _ from 'lodash';

import './mobile.scss';

function component () {
  var elem = document.createElement('h1');
  elem.innerHTML = _.join(['Hello','mobile'], ' ');
  return elem;
}

document.body.appendChild(component());
