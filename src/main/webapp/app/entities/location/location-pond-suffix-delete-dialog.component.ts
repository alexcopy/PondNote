import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { LocationPondSuffix } from './location-pond-suffix.model';
import { LocationPondSuffixPopupService } from './location-pond-suffix-popup.service';
import { LocationPondSuffixService } from './location-pond-suffix.service';

@Component({
    selector: 'jhi-location-pond-suffix-delete-dialog',
    templateUrl: './location-pond-suffix-delete-dialog.component.html'
})
export class LocationPondSuffixDeleteDialogComponent {

    location: LocationPondSuffix;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private locationService: LocationPondSuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['location']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.locationService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'locationListModification',
                content: 'Deleted an location'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-location-pond-suffix-delete-popup',
    template: ''
})
export class LocationPondSuffixDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private locationPopupService: LocationPondSuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.locationPopupService
                .open(LocationPondSuffixDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
