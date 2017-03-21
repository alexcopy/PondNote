import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { DevicePondSuffixComponent } from './device-pond-suffix.component';
import { DevicePondSuffixDetailComponent } from './device-pond-suffix-detail.component';
import { DevicePondSuffixPopupComponent } from './device-pond-suffix-dialog.component';
import { DevicePondSuffixDeletePopupComponent } from './device-pond-suffix-delete-dialog.component';

import { Principal } from '../../shared';


export const deviceRoute: Routes = [
  {
    path: 'device-pond-suffix',
    component: DevicePondSuffixComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'pondNotesApp.device.home.title'
    }
  }, {
    path: 'device-pond-suffix/:id',
    component: DevicePondSuffixDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'pondNotesApp.device.home.title'
    }
  }
];

export const devicePopupRoute: Routes = [
  {
    path: 'device-pond-suffix-new',
    component: DevicePondSuffixPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'pondNotesApp.device.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'device-pond-suffix/:id/edit',
    component: DevicePondSuffixPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'pondNotesApp.device.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'device-pond-suffix/:id/delete',
    component: DevicePondSuffixDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'pondNotesApp.device.home.title'
    },
    outlet: 'popup'
  }
];
