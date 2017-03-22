import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { ChemicalsPondSuffix } from './chemicals-pond-suffix.model';
import { ChemicalsPondSuffixPopupService } from './chemicals-pond-suffix-popup.service';
import { ChemicalsPondSuffixService } from './chemicals-pond-suffix.service';
import { TankPondSuffix, TankPondSuffixService } from '../tank';

@Component({
    selector: 'jhi-chemicals-pond-suffix-dialog',
    templateUrl: './chemicals-pond-suffix-dialog.component.html'
})
export class ChemicalsPondSuffixDialogComponent implements OnInit {

    chemicals: ChemicalsPondSuffix;
    authorities: any[];
    isSaving: boolean;

    tanks: TankPondSuffix[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private chemicalsService: ChemicalsPondSuffixService,
        private tankService: TankPondSuffixService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['chemicals']);
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
        if (this.chemicals.id !== undefined) {
            this.chemicalsService.update(this.chemicals)
                .subscribe((res: ChemicalsPondSuffix) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.chemicalsService.create(this.chemicals)
                .subscribe((res: ChemicalsPondSuffix) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: ChemicalsPondSuffix) {
        this.eventManager.broadcast({ name: 'chemicalsListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-chemicals-pond-suffix-popup',
    template: ''
})
export class ChemicalsPondSuffixPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private chemicalsPopupService: ChemicalsPondSuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.chemicalsPopupService
                    .open(ChemicalsPondSuffixDialogComponent, params['id']);
            } else {
                this.modalRef = this.chemicalsPopupService
                    .open(ChemicalsPondSuffixDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
