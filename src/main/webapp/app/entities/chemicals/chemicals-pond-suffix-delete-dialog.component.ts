import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { ChemicalsPondSuffix } from './chemicals-pond-suffix.model';
import { ChemicalsPondSuffixPopupService } from './chemicals-pond-suffix-popup.service';
import { ChemicalsPondSuffixService } from './chemicals-pond-suffix.service';

@Component({
    selector: 'jhi-chemicals-pond-suffix-delete-dialog',
    templateUrl: './chemicals-pond-suffix-delete-dialog.component.html'
})
export class ChemicalsPondSuffixDeleteDialogComponent {

    chemicals: ChemicalsPondSuffix;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private chemicalsService: ChemicalsPondSuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['chemicals']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.chemicalsService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'chemicalsListModification',
                content: 'Deleted an chemicals'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-chemicals-pond-suffix-delete-popup',
    template: ''
})
export class ChemicalsPondSuffixDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private chemicalsPopupService: ChemicalsPondSuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.chemicalsPopupService
                .open(ChemicalsPondSuffixDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
