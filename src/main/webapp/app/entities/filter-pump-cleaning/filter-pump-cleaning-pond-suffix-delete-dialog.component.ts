import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { FilterPumpCleaningPondSuffix } from './filter-pump-cleaning-pond-suffix.model';
import { FilterPumpCleaningPondSuffixPopupService } from './filter-pump-cleaning-pond-suffix-popup.service';
import { FilterPumpCleaningPondSuffixService } from './filter-pump-cleaning-pond-suffix.service';

@Component({
    selector: 'jhi-filter-pump-cleaning-pond-suffix-delete-dialog',
    templateUrl: './filter-pump-cleaning-pond-suffix-delete-dialog.component.html'
})
export class FilterPumpCleaningPondSuffixDeleteDialogComponent {

    filterPumpCleaning: FilterPumpCleaningPondSuffix;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private filterPumpCleaningService: FilterPumpCleaningPondSuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['filterPumpCleaning']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.filterPumpCleaningService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'filterPumpCleaningListModification',
                content: 'Deleted an filterPumpCleaning'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-filter-pump-cleaning-pond-suffix-delete-popup',
    template: ''
})
export class FilterPumpCleaningPondSuffixDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private filterPumpCleaningPopupService: FilterPumpCleaningPondSuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.filterPumpCleaningPopupService
                .open(FilterPumpCleaningPondSuffixDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
