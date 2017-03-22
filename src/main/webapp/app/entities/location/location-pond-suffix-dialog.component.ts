import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { LocationPondSuffix } from './location-pond-suffix.model';
import { LocationPondSuffixPopupService } from './location-pond-suffix-popup.service';
import { LocationPondSuffixService } from './location-pond-suffix.service';

@Component({
    selector: 'jhi-location-pond-suffix-dialog',
    templateUrl: './location-pond-suffix-dialog.component.html'
})
export class LocationPondSuffixDialogComponent implements OnInit {

    location: LocationPondSuffix;
    authorities: any[];
    isSaving: boolean;
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private locationService: LocationPondSuffixService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['location']);
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
        if (this.location.id !== undefined) {
            this.locationService.update(this.location)
                .subscribe((res: LocationPondSuffix) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.locationService.create(this.location)
                .subscribe((res: LocationPondSuffix) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: LocationPondSuffix) {
        this.eventManager.broadcast({ name: 'locationListModification', content: 'OK'});
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
    selector: 'jhi-location-pond-suffix-popup',
    template: ''
})
export class LocationPondSuffixPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private locationPopupService: LocationPondSuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.locationPopupService
                    .open(LocationPondSuffixDialogComponent, params['id']);
            } else {
                this.modalRef = this.locationPopupService
                    .open(LocationPondSuffixDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
