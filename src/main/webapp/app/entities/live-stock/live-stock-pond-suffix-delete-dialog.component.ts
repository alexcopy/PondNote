import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { LiveStockPondSuffix } from './live-stock-pond-suffix.model';
import { LiveStockPondSuffixPopupService } from './live-stock-pond-suffix-popup.service';
import { LiveStockPondSuffixService } from './live-stock-pond-suffix.service';

@Component({
    selector: 'jhi-live-stock-pond-suffix-delete-dialog',
    templateUrl: './live-stock-pond-suffix-delete-dialog.component.html'
})
export class LiveStockPondSuffixDeleteDialogComponent {

    liveStock: LiveStockPondSuffix;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private liveStockService: LiveStockPondSuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['liveStock', 'stockCase']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.liveStockService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'liveStockListModification',
                content: 'Deleted an liveStock'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-live-stock-pond-suffix-delete-popup',
    template: ''
})
export class LiveStockPondSuffixDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private liveStockPopupService: LiveStockPondSuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.liveStockPopupService
                .open(LiveStockPondSuffixDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
