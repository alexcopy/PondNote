import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { TempMeterPondSuffixComponent } from './temp-meter-pond-suffix.component';
import { TempMeterPondSuffixDetailComponent } from './temp-meter-pond-suffix-detail.component';
import { TempMeterPondSuffixPopupComponent } from './temp-meter-pond-suffix-dialog.component';
import { TempMeterPondSuffixDeletePopupComponent } from './temp-meter-pond-suffix-delete-dialog.component';

import { Principal } from '../../shared';


export const tempMeterRoute: Routes = [
  {
    path: 'temp-meter-pond-suffix',
    component: TempMeterPondSuffixComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'pondNotesApp.tempMeter.home.title'
    }
  }, {
    path: 'temp-meter-pond-suffix/:id',
    component: TempMeterPondSuffixDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'pondNotesApp.tempMeter.home.title'
    }
  }
];

export const tempMeterPopupRoute: Routes = [
  {
    path: 'temp-meter-pond-suffix-new',
    component: TempMeterPondSuffixPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'pondNotesApp.tempMeter.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'temp-meter-pond-suffix/:id/edit',
    component: TempMeterPondSuffixPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'pondNotesApp.tempMeter.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'temp-meter-pond-suffix/:id/delete',
    component: TempMeterPondSuffixDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'pondNotesApp.tempMeter.home.title'
    },
    outlet: 'popup'
  }
];
