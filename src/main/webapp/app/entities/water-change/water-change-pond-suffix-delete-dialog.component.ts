import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { WaterChangePondSuffix } from './water-change-pond-suffix.model';
import { WaterChangePondSuffixPopupService } from './water-change-pond-suffix-popup.service';
import { WaterChangePondSuffixService } from './water-change-pond-suffix.service';

@Component({
    selector: 'jhi-water-change-pond-suffix-delete-dialog',
    templateUrl: './water-change-pond-suffix-delete-dialog.component.html'
})
export class WaterChangePondSuffixDeleteDialogComponent {

    waterChange: WaterChangePondSuffix;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private waterChangeService: WaterChangePondSuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['waterChange']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.waterChangeService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'waterChangeListModification',
                content: 'Deleted an waterChange'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-water-change-pond-suffix-delete-popup',
    template: ''
})
export class WaterChangePondSuffixDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private waterChangePopupService: WaterChangePondSuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.waterChangePopupService
                .open(WaterChangePondSuffixDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
