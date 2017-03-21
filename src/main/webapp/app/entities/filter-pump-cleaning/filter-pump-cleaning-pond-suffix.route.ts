import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { FilterPumpCleaningPondSuffixComponent } from './filter-pump-cleaning-pond-suffix.component';
import { FilterPumpCleaningPondSuffixDetailComponent } from './filter-pump-cleaning-pond-suffix-detail.component';
import { FilterPumpCleaningPondSuffixPopupComponent } from './filter-pump-cleaning-pond-suffix-dialog.component';
import { FilterPumpCleaningPondSuffixDeletePopupComponent }
    from './filter-pump-cleaning-pond-suffix-delete-dialog.component';

import { Principal } from '../../shared';

@Injectable()
export class FilterPumpCleaningPondSuffixResolvePagingParams implements Resolve<any> {

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

export const filterPumpCleaningRoute: Routes = [
  {
    path: 'filter-pump-cleaning-pond-suffix',
    component: FilterPumpCleaningPondSuffixComponent,
    resolve: {
      'pagingParams': FilterPumpCleaningPondSuffixResolvePagingParams
    },
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'pondNotesApp.filterPumpCleaning.home.title'
    }
  }, {
    path: 'filter-pump-cleaning-pond-suffix/:id',
    component: FilterPumpCleaningPondSuffixDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'pondNotesApp.filterPumpCleaning.home.title'
    }
  }
];

export const filterPumpCleaningPopupRoute: Routes = [
  {
    path: 'filter-pump-cleaning-pond-suffix-new',
    component: FilterPumpCleaningPondSuffixPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'pondNotesApp.filterPumpCleaning.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'filter-pump-cleaning-pond-suffix/:id/edit',
    component: FilterPumpCleaningPondSuffixPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'pondNotesApp.filterPumpCleaning.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'filter-pump-cleaning-pond-suffix/:id/delete',
    component: FilterPumpCleaningPondSuffixDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'pondNotesApp.filterPumpCleaning.home.title'
    },
    outlet: 'popup'
  }
];
