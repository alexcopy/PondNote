import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { TankPondSuffix } from './tank-pond-suffix.model';
import { TankPondSuffixPopupService } from './tank-pond-suffix-popup.service';
import { TankPondSuffixService } from './tank-pond-suffix.service';
import { LocationPondSuffix, LocationPondSuffixService } from '../location';

@Component({
    selector: 'jhi-tank-pond-suffix-dialog',
    templateUrl: './tank-pond-suffix-dialog.component.html'
})
export class TankPondSuffixDialogComponent implements OnInit {

    tank: TankPondSuffix;
    authorities: any[];
    isSaving: boolean;

    locations: LocationPondSuffix[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private tankService: TankPondSuffixService,
        private locationService: LocationPondSuffixService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['tank', 'tankType']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.locationService.query().subscribe(
            (res: Response) => { this.locations = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.tank.id !== undefined) {
            this.tankService.update(this.tank)
                .subscribe((res: TankPondSuffix) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.tankService.create(this.tank)
                .subscribe((res: TankPondSuffix) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: TankPondSuffix) {
        this.eventManager.broadcast({ name: 'tankListModification', content: 'OK'});
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

    trackLocationById(index: number, item: LocationPondSuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-tank-pond-suffix-popup',
    template: ''
})
export class TankPondSuffixPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private tankPopupService: TankPondSuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.tankPopupService
                    .open(TankPondSuffixDialogComponent, params['id']);
            } else {
                this.modalRef = this.tankPopupService
                    .open(TankPondSuffixDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
