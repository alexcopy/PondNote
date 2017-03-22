import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { TankPondSuffixComponent } from './tank-pond-suffix.component';
import { TankPondSuffixDetailComponent } from './tank-pond-suffix-detail.component';
import { TankPondSuffixPopupComponent } from './tank-pond-suffix-dialog.component';
import { TankPondSuffixDeletePopupComponent } from './tank-pond-suffix-delete-dialog.component';

import { Principal } from '../../shared';


export const tankRoute: Routes = [
  {
    path: 'tank-pond-suffix',
    component: TankPondSuffixComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'pondNotesApp.tank.home.title'
    }
  }, {
    path: 'tank-pond-suffix/:id',
    component: TankPondSuffixDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'pondNotesApp.tank.home.title'
    }
  }
];

export const tankPopupRoute: Routes = [
  {
    path: 'tank-pond-suffix-new',
    component: TankPondSuffixPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'pondNotesApp.tank.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'tank-pond-suffix/:id/edit',
    component: TankPondSuffixPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'pondNotesApp.tank.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'tank-pond-suffix/:id/delete',
    component: TankPondSuffixDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'pondNotesApp.tank.home.title'
    },
    outlet: 'popup'
  }
];
