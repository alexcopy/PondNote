import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { WaterCounter } from './water-counter.model';
import { WaterCounterPopupService } from './water-counter-popup.service';
import { WaterCounterService } from './water-counter.service';

@Component({
    selector: 'jhi-water-counter-delete-dialog',
    templateUrl: './water-counter-delete-dialog.component.html'
})
export class WaterCounterDeleteDialogComponent {

    waterCounter: WaterCounter;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private waterCounterService: WaterCounterService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['waterCounter', 'waterCounterTypes']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.waterCounterService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'waterCounterListModification',
                content: 'Deleted an waterCounter'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-water-counter-delete-popup',
    template: ''
})
export class WaterCounterDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private waterCounterPopupService: WaterCounterPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.waterCounterPopupService
                .open(WaterCounterDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
