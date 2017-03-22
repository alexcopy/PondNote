import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { ChemicalAnalysisPondSuffixComponent } from './chemical-analysis-pond-suffix.component';
import { ChemicalAnalysisPondSuffixDetailComponent } from './chemical-analysis-pond-suffix-detail.component';
import { ChemicalAnalysisPondSuffixPopupComponent } from './chemical-analysis-pond-suffix-dialog.component';
import { ChemicalAnalysisPondSuffixDeletePopupComponent } from './chemical-analysis-pond-suffix-delete-dialog.component';

import { Principal } from '../../shared';


export const chemicalAnalysisRoute: Routes = [
  {
    path: 'chemical-analysis-pond-suffix',
    component: ChemicalAnalysisPondSuffixComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'pondNotesApp.chemicalAnalysis.home.title'
    }
  }, {
    path: 'chemical-analysis-pond-suffix/:id',
    component: ChemicalAnalysisPondSuffixDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'pondNotesApp.chemicalAnalysis.home.title'
    }
  }
];

export const chemicalAnalysisPopupRoute: Routes = [
  {
    path: 'chemical-analysis-pond-suffix-new',
    component: ChemicalAnalysisPondSuffixPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'pondNotesApp.chemicalAnalysis.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'chemical-analysis-pond-suffix/:id/edit',
    component: ChemicalAnalysisPondSuffixPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'pondNotesApp.chemicalAnalysis.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'chemical-analysis-pond-suffix/:id/delete',
    component: ChemicalAnalysisPondSuffixDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'pondNotesApp.chemicalAnalysis.home.title'
    },
    outlet: 'popup'
  }
];
