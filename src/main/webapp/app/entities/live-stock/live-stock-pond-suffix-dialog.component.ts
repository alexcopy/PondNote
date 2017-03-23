import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { LiveStockPondSuffix } from './live-stock-pond-suffix.model';
import { LiveStockPondSuffixPopupService } from './live-stock-pond-suffix-popup.service';
import { LiveStockPondSuffixService } from './live-stock-pond-suffix.service';
import { TankPondSuffix, TankPondSuffixService } from '../tank';

@Component({
    selector: 'jhi-live-stock-pond-suffix-dialog',
    templateUrl: './live-stock-pond-suffix-dialog.component.html'
})
export class LiveStockPondSuffixDialogComponent implements OnInit {

    liveStock: LiveStockPondSuffix;
    authorities: any[];
    isSaving: boolean;

    tanks: TankPondSuffix[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private liveStockService: LiveStockPondSuffixService,
        private tankService: TankPondSuffixService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['liveStock', 'stockCase']);
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
        if (this.liveStock.id !== undefined) {
            this.liveStockService.update(this.liveStock)
                .subscribe((res: LiveStockPondSuffix) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.liveStockService.create(this.liveStock)
                .subscribe((res: LiveStockPondSuffix) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: LiveStockPondSuffix) {
        this.eventManager.broadcast({ name: 'liveStockListModification', content: 'OK'});
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
    selector: 'jhi-live-stock-pond-suffix-popup',
    template: ''
})
export class LiveStockPondSuffixPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private liveStockPopupService: LiveStockPondSuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.liveStockPopupService
                    .open(LiveStockPondSuffixDialogComponent, params['id']);
            } else {
                this.modalRef = this.liveStockPopupService
                    .open(LiveStockPondSuffixDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
