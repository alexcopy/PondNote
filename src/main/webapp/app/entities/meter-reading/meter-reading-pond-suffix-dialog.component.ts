import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { MeterReadingPondSuffix } from './meter-reading-pond-suffix.model';
import { MeterReadingPondSuffixPopupService } from './meter-reading-pond-suffix-popup.service';
import { MeterReadingPondSuffixService } from './meter-reading-pond-suffix.service';
import { DevicePondSuffix, DevicePondSuffixService } from '../device';

@Component({
    selector: 'jhi-meter-reading-pond-suffix-dialog',
    templateUrl: './meter-reading-pond-suffix-dialog.component.html'
})
export class MeterReadingPondSuffixDialogComponent implements OnInit {

    meterReading: MeterReadingPondSuffix;
    authorities: any[];
    isSaving: boolean;

    devices: DevicePondSuffix[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private meterReadingService: MeterReadingPondSuffixService,
        private deviceService: DevicePondSuffixService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['meterReading']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.deviceService.query().subscribe(
            (res: Response) => { this.devices = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.meterReading.id !== undefined) {
            this.meterReadingService.update(this.meterReading)
                .subscribe((res: MeterReadingPondSuffix) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.meterReadingService.create(this.meterReading)
                .subscribe((res: MeterReadingPondSuffix) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: MeterReadingPondSuffix) {
        this.eventManager.broadcast({ name: 'meterReadingListModification', content: 'OK'});
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

    trackDeviceById(index: number, item: DevicePondSuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-meter-reading-pond-suffix-popup',
    template: ''
})
export class MeterReadingPondSuffixPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private meterReadingPopupService: MeterReadingPondSuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.meterReadingPopupService
                    .open(MeterReadingPondSuffixDialogComponent, params['id']);
            } else {
                this.modalRef = this.meterReadingPopupService
                    .open(MeterReadingPondSuffixDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
