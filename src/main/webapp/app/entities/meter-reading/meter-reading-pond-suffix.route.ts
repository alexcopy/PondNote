import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { MeterReadingPondSuffixComponent } from './meter-reading-pond-suffix.component';
import { MeterReadingPondSuffixDetailComponent } from './meter-reading-pond-suffix-detail.component';
import { MeterReadingPondSuffixPopupComponent } from './meter-reading-pond-suffix-dialog.component';
import { MeterReadingPondSuffixDeletePopupComponent } from './meter-reading-pond-suffix-delete-dialog.component';

import { Principal } from '../../shared';

@Injectable()
export class MeterReadingPondSuffixResolvePagingParams implements Resolve<any> {

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

export const meterReadingRoute: Routes = [
  {
    path: 'meter-reading-pond-suffix',
    component: MeterReadingPondSuffixComponent,
    resolve: {
      'pagingParams': MeterReadingPondSuffixResolvePagingParams
    },
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'pondNotesApp.meterReading.home.title'
    }
  }, {
    path: 'meter-reading-pond-suffix/:id',
    component: MeterReadingPondSuffixDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'pondNotesApp.meterReading.home.title'
    }
  }
];

export const meterReadingPopupRoute: Routes = [
  {
    path: 'meter-reading-pond-suffix-new',
    component: MeterReadingPondSuffixPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'pondNotesApp.meterReading.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'meter-reading-pond-suffix/:id/edit',
    component: MeterReadingPondSuffixPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'pondNotesApp.meterReading.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'meter-reading-pond-suffix/:id/delete',
    component: MeterReadingPondSuffixDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'pondNotesApp.meterReading.home.title'
    },
    outlet: 'popup'
  }
];
