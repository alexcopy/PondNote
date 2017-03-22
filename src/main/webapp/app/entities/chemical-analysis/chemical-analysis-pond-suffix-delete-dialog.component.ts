import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { ChemicalAnalysisPondSuffix } from './chemical-analysis-pond-suffix.model';
import { ChemicalAnalysisPondSuffixPopupService } from './chemical-analysis-pond-suffix-popup.service';
import { ChemicalAnalysisPondSuffixService } from './chemical-analysis-pond-suffix.service';

@Component({
    selector: 'jhi-chemical-analysis-pond-suffix-delete-dialog',
    templateUrl: './chemical-analysis-pond-suffix-delete-dialog.component.html'
})
export class ChemicalAnalysisPondSuffixDeleteDialogComponent {

    chemicalAnalysis: ChemicalAnalysisPondSuffix;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private chemicalAnalysisService: ChemicalAnalysisPondSuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['chemicalAnalysis']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.chemicalAnalysisService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'chemicalAnalysisListModification',
                content: 'Deleted an chemicalAnalysis'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-chemical-analysis-pond-suffix-delete-popup',
    template: ''
})
export class ChemicalAnalysisPondSuffixDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private chemicalAnalysisPopupService: ChemicalAnalysisPondSuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.chemicalAnalysisPopupService
                .open(ChemicalAnalysisPondSuffixDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
