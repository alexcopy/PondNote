import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { UnitId } from './unit-id.model';
import { UnitIdPopupService } from './unit-id-popup.service';
import { UnitIdService } from './unit-id.service';
@Component({
    selector: 'jhi-unit-id-dialog',
    templateUrl: './unit-id-dialog.component.html'
})
export class UnitIdDialogComponent implements OnInit {

    unitId: UnitId;
    authorities: any[];
    isSaving: boolean;
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private unitIdService: UnitIdService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['unitId']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.unitId.id !== undefined) {
            this.unitIdService.update(this.unitId)
                .subscribe((res: UnitId) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.unitIdService.create(this.unitId)
                .subscribe((res: UnitId) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: UnitId) {
        this.eventManager.broadcast({ name: 'unitIdListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-unit-id-popup',
    template: ''
})
export class UnitIdPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private unitIdPopupService: UnitIdPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.unitIdPopupService
                    .open(UnitIdDialogComponent, params['id']);
            } else {
                this.modalRef = this.unitIdPopupService
                    .open(UnitIdDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
