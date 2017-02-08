import {Users} from 'src/users';
import {HttpClient} from 'aurelia-fetch-client';

class HttpStub {
  items;
  
  fetch(url) {
    return new Promise(resolve => {
      resolve({ json: () => this.items });
    });
  }
  
  configure(func) { }
}

function createHttpStub() {
  return new HttpStub();
}

xdescribe('the Users module', () => {

  it('sets fetch response to users', (done) => {
    var http = createHttpStub(),
        sut = new Users(<HttpClient>http),
        itemStubs = [1],
        itemFake = [2];
        
    http.items = itemStubs;
    
    sut.activate().then(() => {
      expect(sut.users).toBe(itemStubs);
      expect(sut.users).not.toBe(itemFake);
      done();
    });
  });
});
