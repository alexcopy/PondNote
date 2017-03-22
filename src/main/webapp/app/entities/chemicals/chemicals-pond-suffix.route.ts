import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { ChemicalsPondSuffixComponent } from './chemicals-pond-suffix.component';
import { ChemicalsPondSuffixDetailComponent } from './chemicals-pond-suffix-detail.component';
import { ChemicalsPondSuffixPopupComponent } from './chemicals-pond-suffix-dialog.component';
import { ChemicalsPondSuffixDeletePopupComponent } from './chemicals-pond-suffix-delete-dialog.component';

import { Principal } from '../../shared';

@Injectable()
export class ChemicalsPondSuffixResolvePagingParams implements Resolve<any> {

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

export const chemicalsRoute: Routes = [
  {
    path: 'chemicals-pond-suffix',
    component: ChemicalsPondSuffixComponent,
    resolve: {
      'pagingParams': ChemicalsPondSuffixResolvePagingParams
    },
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'pondNotesApp.chemicals.home.title'
    }
  }, {
    path: 'chemicals-pond-suffix/:id',
    component: ChemicalsPondSuffixDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'pondNotesApp.chemicals.home.title'
    }
  }
];

export const chemicalsPopupRoute: Routes = [
  {
    path: 'chemicals-pond-suffix-new',
    component: ChemicalsPondSuffixPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'pondNotesApp.chemicals.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'chemicals-pond-suffix/:id/edit',
    component: ChemicalsPondSuffixPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'pondNotesApp.chemicals.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'chemicals-pond-suffix/:id/delete',
    component: ChemicalsPondSuffixDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'pondNotesApp.chemicals.home.title'
    },
    outlet: 'popup'
  }
];
