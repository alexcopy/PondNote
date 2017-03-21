import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { DevicePondSuffix } from './device-pond-suffix.model';
import { DevicePondSuffixPopupService } from './device-pond-suffix-popup.service';
import { DevicePondSuffixService } from './device-pond-suffix.service';

@Component({
    selector: 'jhi-device-pond-suffix-dialog',
    templateUrl: './device-pond-suffix-dialog.component.html'
})
export class DevicePondSuffixDialogComponent implements OnInit {

    device: DevicePondSuffix;
    authorities: any[];
    isSaving: boolean;
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private deviceService: DevicePondSuffixService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['device']);
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
        if (this.device.id !== undefined) {
            this.deviceService.update(this.device)
                .subscribe((res: DevicePondSuffix) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.deviceService.create(this.device)
                .subscribe((res: DevicePondSuffix) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: DevicePondSuffix) {
        this.eventManager.broadcast({ name: 'deviceListModification', content: 'OK'});
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
    selector: 'jhi-device-pond-suffix-popup',
    template: ''
})
export class DevicePondSuffixPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private devicePopupService: DevicePondSuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.devicePopupService
                    .open(DevicePondSuffixDialogComponent, params['id']);
            } else {
                this.modalRef = this.devicePopupService
                    .open(DevicePondSuffixDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
