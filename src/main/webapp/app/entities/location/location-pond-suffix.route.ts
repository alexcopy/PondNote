import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { LocationPondSuffixComponent } from './location-pond-suffix.component';
import { LocationPondSuffixDetailComponent } from './location-pond-suffix-detail.component';
import { LocationPondSuffixPopupComponent } from './location-pond-suffix-dialog.component';
import { LocationPondSuffixDeletePopupComponent } from './location-pond-suffix-delete-dialog.component';

import { Principal } from '../../shared';


export const locationRoute: Routes = [
  {
    path: 'location-pond-suffix',
    component: LocationPondSuffixComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'pondNotesApp.location.home.title'
    }
  }, {
    path: 'location-pond-suffix/:id',
    component: LocationPondSuffixDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'pondNotesApp.location.home.title'
    }
  }
];

export const locationPopupRoute: Routes = [
  {
    path: 'location-pond-suffix-new',
    component: LocationPondSuffixPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'pondNotesApp.location.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'location-pond-suffix/:id/edit',
    component: LocationPondSuffixPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'pondNotesApp.location.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'location-pond-suffix/:id/delete',
    component: LocationPondSuffixDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'pondNotesApp.location.home.title'
    },
    outlet: 'popup'
  }
];
