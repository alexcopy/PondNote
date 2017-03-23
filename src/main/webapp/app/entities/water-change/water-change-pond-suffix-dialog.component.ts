import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { WaterChangePondSuffix } from './water-change-pond-suffix.model';
import { WaterChangePondSuffixPopupService } from './water-change-pond-suffix-popup.service';
import { WaterChangePondSuffixService } from './water-change-pond-suffix.service';
import { TankPondSuffix, TankPondSuffixService } from '../tank';

@Component({
    selector: 'jhi-water-change-pond-suffix-dialog',
    templateUrl: './water-change-pond-suffix-dialog.component.html'
})
export class WaterChangePondSuffixDialogComponent implements OnInit {

    waterChange: WaterChangePondSuffix;
    authorities: any[];
    isSaving: boolean;

    tanks: TankPondSuffix[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private waterChangeService: WaterChangePondSuffixService,
        private tankService: TankPondSuffixService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['waterChange']);
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
        if (this.waterChange.id !== undefined) {
            this.waterChangeService.update(this.waterChange)
                .subscribe((res: WaterChangePondSuffix) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.waterChangeService.create(this.waterChange)
                .subscribe((res: WaterChangePondSuffix) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: WaterChangePondSuffix) {
        this.eventManager.broadcast({ name: 'waterChangeListModification', content: 'OK'});
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
    selector: 'jhi-water-change-pond-suffix-popup',
    template: ''
})
export class WaterChangePondSuffixPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private waterChangePopupService: WaterChangePondSuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.waterChangePopupService
                    .open(WaterChangePondSuffixDialogComponent, params['id']);
            } else {
                this.modalRef = this.waterChangePopupService
                    .open(WaterChangePondSuffixDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
