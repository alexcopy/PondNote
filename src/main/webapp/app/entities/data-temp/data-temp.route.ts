import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { DataTempComponent } from './data-temp.component';
import { DataTempDetailComponent } from './data-temp-detail.component';
import { DataTempPopupComponent } from './data-temp-dialog.component';
import { DataTempDeletePopupComponent } from './data-temp-delete-dialog.component';

import { Principal } from '../../shared';

@Injectable()
export class DataTempResolvePagingParams implements Resolve<any> {

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

export const dataTempRoute: Routes = [
  {
    path: 'data-temp',
    component: DataTempComponent,
    resolve: {
      'pagingParams': DataTempResolvePagingParams
    },
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'pondNotesApp.dataTemp.home.title'
    }
  }, {
    path: 'data-temp/:id',
    component: DataTempDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'pondNotesApp.dataTemp.home.title'
    }
  }
];

export const dataTempPopupRoute: Routes = [
  {
    path: 'data-temp-new',
    component: DataTempPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'pondNotesApp.dataTemp.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'data-temp/:id/edit',
    component: DataTempPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'pondNotesApp.dataTemp.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'data-temp/:id/delete',
    component: DataTempDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'pondNotesApp.dataTemp.home.title'
    },
    outlet: 'popup'
  }
];
