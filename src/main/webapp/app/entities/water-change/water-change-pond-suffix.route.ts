import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { WaterChangePondSuffixComponent } from './water-change-pond-suffix.component';
import { WaterChangePondSuffixDetailComponent } from './water-change-pond-suffix-detail.component';
import { WaterChangePondSuffixPopupComponent } from './water-change-pond-suffix-dialog.component';
import { WaterChangePondSuffixDeletePopupComponent } from './water-change-pond-suffix-delete-dialog.component';

import { Principal } from '../../shared';


export const waterChangeRoute: Routes = [
  {
    path: 'water-change-pond-suffix',
    component: WaterChangePondSuffixComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'pondNotesApp.waterChange.home.title'
    }
  }, {
    path: 'water-change-pond-suffix/:id',
    component: WaterChangePondSuffixDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'pondNotesApp.waterChange.home.title'
    }
  }
];

export const waterChangePopupRoute: Routes = [
  {
    path: 'water-change-pond-suffix-new',
    component: WaterChangePondSuffixPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'pondNotesApp.waterChange.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'water-change-pond-suffix/:id/edit',
    component: WaterChangePondSuffixPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'pondNotesApp.waterChange.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'water-change-pond-suffix/:id/delete',
    component: WaterChangePondSuffixDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'pondNotesApp.waterChange.home.title'
    },
    outlet: 'popup'
  }
];
