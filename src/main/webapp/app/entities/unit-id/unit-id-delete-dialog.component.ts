import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { UnitId } from './unit-id.model';
import { UnitIdPopupService } from './unit-id-popup.service';
import { UnitIdService } from './unit-id.service';

@Component({
    selector: 'jhi-unit-id-delete-dialog',
    templateUrl: './unit-id-delete-dialog.component.html'
})
export class UnitIdDeleteDialogComponent {

    unitId: UnitId;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private unitIdService: UnitIdService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['unitId']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.unitIdService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'unitIdListModification',
                content: 'Deleted an unitId'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-unit-id-delete-popup',
    template: ''
})
export class UnitIdDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private unitIdPopupService: UnitIdPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.unitIdPopupService
                .open(UnitIdDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
