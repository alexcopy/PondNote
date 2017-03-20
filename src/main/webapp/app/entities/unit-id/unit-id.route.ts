import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { UnitIdComponent } from './unit-id.component';
import { UnitIdDetailComponent } from './unit-id-detail.component';
import { UnitIdPopupComponent } from './unit-id-dialog.component';
import { UnitIdDeletePopupComponent } from './unit-id-delete-dialog.component';

import { Principal } from '../../shared';


export const unitIdRoute: Routes = [
  {
    path: 'unit-id',
    component: UnitIdComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'pondNotesApp.unitId.home.title'
    }
  }, {
    path: 'unit-id/:id',
    component: UnitIdDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'pondNotesApp.unitId.home.title'
    }
  }
];

export const unitIdPopupRoute: Routes = [
  {
    path: 'unit-id-new',
    component: UnitIdPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'pondNotesApp.unitId.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'unit-id/:id/edit',
    component: UnitIdPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'pondNotesApp.unitId.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'unit-id/:id/delete',
    component: UnitIdDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'pondNotesApp.unitId.home.title'
    },
    outlet: 'popup'
  }
];
