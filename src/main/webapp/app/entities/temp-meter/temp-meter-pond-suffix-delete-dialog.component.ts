import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { TempMeterPondSuffix } from './temp-meter-pond-suffix.model';
import { TempMeterPondSuffixPopupService } from './temp-meter-pond-suffix-popup.service';
import { TempMeterPondSuffixService } from './temp-meter-pond-suffix.service';

@Component({
    selector: 'jhi-temp-meter-pond-suffix-delete-dialog',
    templateUrl: './temp-meter-pond-suffix-delete-dialog.component.html'
})
export class TempMeterPondSuffixDeleteDialogComponent {

    tempMeter: TempMeterPondSuffix;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private tempMeterService: TempMeterPondSuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['tempMeter']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.tempMeterService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'tempMeterListModification',
                content: 'Deleted an tempMeter'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-temp-meter-pond-suffix-delete-popup',
    template: ''
})
export class TempMeterPondSuffixDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private tempMeterPopupService: TempMeterPondSuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.tempMeterPopupService
                .open(TempMeterPondSuffixDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
