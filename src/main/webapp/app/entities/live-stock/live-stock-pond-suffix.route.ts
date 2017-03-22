import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { LiveStockPondSuffixComponent } from './live-stock-pond-suffix.component';
import { LiveStockPondSuffixDetailComponent } from './live-stock-pond-suffix-detail.component';
import { LiveStockPondSuffixPopupComponent } from './live-stock-pond-suffix-dialog.component';
import { LiveStockPondSuffixDeletePopupComponent } from './live-stock-pond-suffix-delete-dialog.component';

import { Principal } from '../../shared';


export const liveStockRoute: Routes = [
  {
    path: 'live-stock-pond-suffix',
    component: LiveStockPondSuffixComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'pondNotesApp.liveStock.home.title'
    }
  }, {
    path: 'live-stock-pond-suffix/:id',
    component: LiveStockPondSuffixDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'pondNotesApp.liveStock.home.title'
    }
  }
];

export const liveStockPopupRoute: Routes = [
  {
    path: 'live-stock-pond-suffix-new',
    component: LiveStockPondSuffixPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'pondNotesApp.liveStock.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'live-stock-pond-suffix/:id/edit',
    component: LiveStockPondSuffixPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'pondNotesApp.liveStock.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'live-stock-pond-suffix/:id/delete',
    component: LiveStockPondSuffixDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'pondNotesApp.liveStock.home.title'
    },
    outlet: 'popup'
  }
];
