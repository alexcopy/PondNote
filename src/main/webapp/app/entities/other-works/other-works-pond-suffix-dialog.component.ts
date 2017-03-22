import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { OtherWorksPondSuffix } from './other-works-pond-suffix.model';
import { OtherWorksPondSuffixPopupService } from './other-works-pond-suffix-popup.service';
import { OtherWorksPondSuffixService } from './other-works-pond-suffix.service';
import { TankPondSuffix, TankPondSuffixService } from '../tank';

@Component({
    selector: 'jhi-other-works-pond-suffix-dialog',
    templateUrl: './other-works-pond-suffix-dialog.component.html'
})
export class OtherWorksPondSuffixDialogComponent implements OnInit {

    otherWorks: OtherWorksPondSuffix;
    authorities: any[];
    isSaving: boolean;

    tanks: TankPondSuffix[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private otherWorksService: OtherWorksPondSuffixService,
        private tankService: TankPondSuffixService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['otherWorks']);
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
        if (this.otherWorks.id !== undefined) {
            this.otherWorksService.update(this.otherWorks)
                .subscribe((res: OtherWorksPondSuffix) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.otherWorksService.create(this.otherWorks)
                .subscribe((res: OtherWorksPondSuffix) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: OtherWorksPondSuffix) {
        this.eventManager.broadcast({ name: 'otherWorksListModification', content: 'OK'});
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
    selector: 'jhi-other-works-pond-suffix-popup',
    template: ''
})
export class OtherWorksPondSuffixPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private otherWorksPopupService: OtherWorksPondSuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.otherWorksPopupService
                    .open(OtherWorksPondSuffixDialogComponent, params['id']);
            } else {
                this.modalRef = this.otherWorksPopupService
                    .open(OtherWorksPondSuffixDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
