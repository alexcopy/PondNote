import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { OtherWorksPondSuffixComponent } from './other-works-pond-suffix.component';
import { OtherWorksPondSuffixDetailComponent } from './other-works-pond-suffix-detail.component';
import { OtherWorksPondSuffixPopupComponent } from './other-works-pond-suffix-dialog.component';
import { OtherWorksPondSuffixDeletePopupComponent } from './other-works-pond-suffix-delete-dialog.component';

import { Principal } from '../../shared';


export const otherWorksRoute: Routes = [
  {
    path: 'other-works-pond-suffix',
    component: OtherWorksPondSuffixComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'pondNotesApp.otherWorks.home.title'
    }
  }, {
    path: 'other-works-pond-suffix/:id',
    component: OtherWorksPondSuffixDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'pondNotesApp.otherWorks.home.title'
    }
  }
];

export const otherWorksPopupRoute: Routes = [
  {
    path: 'other-works-pond-suffix-new',
    component: OtherWorksPondSuffixPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'pondNotesApp.otherWorks.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'other-works-pond-suffix/:id/edit',
    component: OtherWorksPondSuffixPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'pondNotesApp.otherWorks.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'other-works-pond-suffix/:id/delete',
    component: OtherWorksPondSuffixDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'pondNotesApp.otherWorks.home.title'
    },
    outlet: 'popup'
  }
];
