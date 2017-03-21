import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { DevicePondSuffix } from './device-pond-suffix.model';
import { DevicePondSuffixPopupService } from './device-pond-suffix-popup.service';
import { DevicePondSuffixService } from './device-pond-suffix.service';

@Component({
    selector: 'jhi-device-pond-suffix-delete-dialog',
    templateUrl: './device-pond-suffix-delete-dialog.component.html'
})
export class DevicePondSuffixDeleteDialogComponent {

    device: DevicePondSuffix;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private deviceService: DevicePondSuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['device']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.deviceService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'deviceListModification',
                content: 'Deleted an device'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-device-pond-suffix-delete-popup',
    template: ''
})
export class DevicePondSuffixDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private devicePopupService: DevicePondSuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.devicePopupService
                .open(DevicePondSuffixDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
