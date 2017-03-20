import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { WaterCounter } from './water-counter.model';
import { WaterCounterPopupService } from './water-counter-popup.service';
import { WaterCounterService } from './water-counter.service';
@Component({
    selector: 'jhi-water-counter-dialog',
    templateUrl: './water-counter-dialog.component.html'
})
export class WaterCounterDialogComponent implements OnInit {

    waterCounter: WaterCounter;
    authorities: any[];
    isSaving: boolean;
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private waterCounterService: WaterCounterService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['waterCounter', 'waterCounterTypes']);
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
        if (this.waterCounter.id !== undefined) {
            this.waterCounterService.update(this.waterCounter)
                .subscribe((res: WaterCounter) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.waterCounterService.create(this.waterCounter)
                .subscribe((res: WaterCounter) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: WaterCounter) {
        this.eventManager.broadcast({ name: 'waterCounterListModification', content: 'OK'});
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
    selector: 'jhi-water-counter-popup',
    template: ''
})
export class WaterCounterPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private waterCounterPopupService: WaterCounterPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.waterCounterPopupService
                    .open(WaterCounterDialogComponent, params['id']);
            } else {
                this.modalRef = this.waterCounterPopupService
                    .open(WaterCounterDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
