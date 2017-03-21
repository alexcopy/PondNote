import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { FilterPumpCleaningPondSuffix } from './filter-pump-cleaning-pond-suffix.model';
import { FilterPumpCleaningPondSuffixPopupService } from './filter-pump-cleaning-pond-suffix-popup.service';
import { FilterPumpCleaningPondSuffixService } from './filter-pump-cleaning-pond-suffix.service';
import { DevicePondSuffix, DevicePondSuffixService } from '../device';

@Component({
    selector: 'jhi-filter-pump-cleaning-pond-suffix-dialog',
    templateUrl: './filter-pump-cleaning-pond-suffix-dialog.component.html'
})
export class FilterPumpCleaningPondSuffixDialogComponent implements OnInit {

    filterPumpCleaning: FilterPumpCleaningPondSuffix;
    authorities: any[];
    isSaving: boolean;

    devices: DevicePondSuffix[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private filterPumpCleaningService: FilterPumpCleaningPondSuffixService,
        private deviceService: DevicePondSuffixService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['filterPumpCleaning']);
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
        if (this.filterPumpCleaning.id !== undefined) {
            this.filterPumpCleaningService.update(this.filterPumpCleaning)
                .subscribe((res: FilterPumpCleaningPondSuffix) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.filterPumpCleaningService.create(this.filterPumpCleaning)
                .subscribe((res: FilterPumpCleaningPondSuffix) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: FilterPumpCleaningPondSuffix) {
        this.eventManager.broadcast({ name: 'filterPumpCleaningListModification', content: 'OK'});
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
    selector: 'jhi-filter-pump-cleaning-pond-suffix-popup',
    template: ''
})
export class FilterPumpCleaningPondSuffixPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private filterPumpCleaningPopupService: FilterPumpCleaningPondSuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.filterPumpCleaningPopupService
                    .open(FilterPumpCleaningPondSuffixDialogComponent, params['id']);
            } else {
                this.modalRef = this.filterPumpCleaningPopupService
                    .open(FilterPumpCleaningPondSuffixDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
