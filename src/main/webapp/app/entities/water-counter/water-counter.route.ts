import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { WaterCounterComponent } from './water-counter.component';
import { WaterCounterDetailComponent } from './water-counter-detail.component';
import { WaterCounterPopupComponent } from './water-counter-dialog.component';
import { WaterCounterDeletePopupComponent } from './water-counter-delete-dialog.component';

import { Principal } from '../../shared';

@Injectable()
export class WaterCounterResolvePagingParams implements Resolve<any> {

  constructor(private paginationUtil: PaginationUtil) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      let page = route.queryParams['page'] ? route.queryParams['page'] : '1';
      let sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
      return {
          page: this.paginationUtil.parsePage(page),
          predicate: this.paginationUtil.parsePredicate(sort),
          ascending: this.paginationUtil.parseAscending(sort)
    };
  }
}

export const waterCounterRoute: Routes = [
  {
    path: 'water-counter',
    component: WaterCounterComponent,
    resolve: {
      'pagingParams': WaterCounterResolvePagingParams
    },
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'pondNotesApp.waterCounter.home.title'
    }
  }, {
    path: 'water-counter/:id',
    component: WaterCounterDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'pondNotesApp.waterCounter.home.title'
    }
  }
];

export const waterCounterPopupRoute: Routes = [
  {
    path: 'water-counter-new',
    component: WaterCounterPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'pondNotesApp.waterCounter.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'water-counter/:id/edit',
    component: WaterCounterPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'pondNotesApp.waterCounter.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'water-counter/:id/delete',
    component: WaterCounterDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'pondNotesApp.waterCounter.home.title'
    },
    outlet: 'popup'
  }
];
