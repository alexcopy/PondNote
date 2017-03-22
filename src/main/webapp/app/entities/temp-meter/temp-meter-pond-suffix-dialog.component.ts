import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { TempMeterPondSuffix } from './temp-meter-pond-suffix.model';
import { TempMeterPondSuffixPopupService } from './temp-meter-pond-suffix-popup.service';
import { TempMeterPondSuffixService } from './temp-meter-pond-suffix.service';
import { TankPondSuffix, TankPondSuffixService } from '../tank';

@Component({
    selector: 'jhi-temp-meter-pond-suffix-dialog',
    templateUrl: './temp-meter-pond-suffix-dialog.component.html'
})
export class TempMeterPondSuffixDialogComponent implements OnInit {

    tempMeter: TempMeterPondSuffix;
    authorities: any[];
    isSaving: boolean;

    tanks: TankPondSuffix[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private tempMeterService: TempMeterPondSuffixService,
        private tankService: TankPondSuffixService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['tempMeter']);
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
        if (this.tempMeter.id !== undefined) {
            this.tempMeterService.update(this.tempMeter)
                .subscribe((res: TempMeterPondSuffix) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.tempMeterService.create(this.tempMeter)
                .subscribe((res: TempMeterPondSuffix) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: TempMeterPondSuffix) {
        this.eventManager.broadcast({ name: 'tempMeterListModification', content: 'OK'});
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
    selector: 'jhi-temp-meter-pond-suffix-popup',
    template: ''
})
export class TempMeterPondSuffixPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private tempMeterPopupService: TempMeterPondSuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.tempMeterPopupService
                    .open(TempMeterPondSuffixDialogComponent, params['id']);
            } else {
                this.modalRef = this.tempMeterPopupService
                    .open(TempMeterPondSuffixDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
