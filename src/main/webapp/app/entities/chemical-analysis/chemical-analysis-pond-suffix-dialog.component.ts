import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { ChemicalAnalysisPondSuffix } from './chemical-analysis-pond-suffix.model';
import { ChemicalAnalysisPondSuffixPopupService } from './chemical-analysis-pond-suffix-popup.service';
import { ChemicalAnalysisPondSuffixService } from './chemical-analysis-pond-suffix.service';
import { TankPondSuffix, TankPondSuffixService } from '../tank';

@Component({
    selector: 'jhi-chemical-analysis-pond-suffix-dialog',
    templateUrl: './chemical-analysis-pond-suffix-dialog.component.html'
})
export class ChemicalAnalysisPondSuffixDialogComponent implements OnInit {

    chemicalAnalysis: ChemicalAnalysisPondSuffix;
    authorities: any[];
    isSaving: boolean;

    tanks: TankPondSuffix[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private chemicalAnalysisService: ChemicalAnalysisPondSuffixService,
        private tankService: TankPondSuffixService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['chemicalAnalysis']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.tankService.query().subscribe(
            (res: Response) => { this.tanks = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.chemicalAnalysis.id !== undefined) {
            this.chemicalAnalysisService.update(this.chemicalAnalysis)
                .subscribe((res: ChemicalAnalysisPondSuffix) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.chemicalAnalysisService.create(this.chemicalAnalysis)
                .subscribe((res: ChemicalAnalysisPondSuffix) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: ChemicalAnalysisPondSuffix) {
        this.eventManager.broadcast({ name: 'chemicalAnalysisListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError (error) {
        this.isSaving = false;
        this.onError(error);
    }

    private onError (error) {
        this.alertService.error(error.message, null, null);
    }

    trackTankById(index: number, item: TankPondSuffix) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-chemical-analysis-pond-suffix-popup',
    template: ''
})
export class ChemicalAnalysisPondSuffixPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private chemicalAnalysisPopupService: ChemicalAnalysisPondSuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.chemicalAnalysisPopupService
                    .open(ChemicalAnalysisPondSuffixDialogComponent, params['id']);
            } else {
                this.modalRef = this.chemicalAnalysisPopupService
                    .open(ChemicalAnalysisPondSuffixDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
