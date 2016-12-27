// https://github.com/jdanyow/aurelia-breeze-northwind/tree/master/src
export class ListViewModel {
  router;
  route;
  service;
  entities = [];
  pageSize = 100; //settings.pageSize;
  pageCount = 0;
  pageIndex = 0;
  isLoading = false;

  constructor(route, router, service) {
    this.route = route;
    this.router = router;
    this.service = service;
  }

  activate() {
    this.load();
  }

  load() {
    this.isLoading = true;
    this.service.getPage(this.pageIndex)
      .then(result => {
        this.entities = result.entities;
        this.pageCount = result.pageCount;
        this.isLoading = false;
      });
  }

  setPage(index) {
    this.pageIndex = index;
    this.load();
  }

  open(id) {
    this.router.navigate(this.route + '/' + id);
  }
}


/*
import {ListViewModel} from '../list-view-model';
import {inject, singleton} from 'aurelia-dependency-injection';
import {AppRouter} from 'aurelia-router';
import {OrderService} from './order-service';

@inject(AppRouter, OrderService)
@singleton()
export class OrderList extends ListViewModel {
  constructor(router, service) {
    super('orders', router, service)
  }
}*/
