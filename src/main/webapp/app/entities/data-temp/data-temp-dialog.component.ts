import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { DataTemp } from './data-temp.model';
import { DataTempPopupService } from './data-temp-popup.service';
import { DataTempService } from './data-temp.service';
@Component({
    selector: 'jhi-data-temp-dialog',
    templateUrl: './data-temp-dialog.component.html'
})
export class DataTempDialogComponent implements OnInit {

    dataTemp: DataTemp;
    authorities: any[];
    isSaving: boolean;
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private dataTempService: DataTempService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['dataTemp']);
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
        if (this.dataTemp.id !== undefined) {
            this.dataTempService.update(this.dataTemp)
                .subscribe((res: DataTemp) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.dataTempService.create(this.dataTemp)
                .subscribe((res: DataTemp) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: DataTemp) {
        this.eventManager.broadcast({ name: 'dataTempListModification', content: 'OK'});
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
    selector: 'jhi-data-temp-popup',
    template: ''
})
export class DataTempPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private dataTempPopupService: DataTempPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.dataTempPopupService
                    .open(DataTempDialogComponent, params['id']);
            } else {
                this.modalRef = this.dataTempPopupService
                    .open(DataTempDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
