import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { MeterReadingPondSuffix } from './meter-reading-pond-suffix.model';
import { MeterReadingPondSuffixPopupService } from './meter-reading-pond-suffix-popup.service';
import { MeterReadingPondSuffixService } from './meter-reading-pond-suffix.service';

@Component({
    selector: 'jhi-meter-reading-pond-suffix-delete-dialog',
    templateUrl: './meter-reading-pond-suffix-delete-dialog.component.html'
})
export class MeterReadingPondSuffixDeleteDialogComponent {

    meterReading: MeterReadingPondSuffix;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private meterReadingService: MeterReadingPondSuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['meterReading']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.meterReadingService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'meterReadingListModification',
                content: 'Deleted an meterReading'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-meter-reading-pond-suffix-delete-popup',
    template: ''
})
export class MeterReadingPondSuffixDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private meterReadingPopupService: MeterReadingPondSuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.meterReadingPopupService
                .open(MeterReadingPondSuffixDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
