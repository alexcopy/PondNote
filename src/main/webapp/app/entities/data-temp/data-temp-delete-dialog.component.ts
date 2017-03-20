import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { DataTemp } from './data-temp.model';
import { DataTempPopupService } from './data-temp-popup.service';
import { DataTempService } from './data-temp.service';

@Component({
    selector: 'jhi-data-temp-delete-dialog',
    templateUrl: './data-temp-delete-dialog.component.html'
})
export class DataTempDeleteDialogComponent {

    dataTemp: DataTemp;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private dataTempService: DataTempService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['dataTemp']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.dataTempService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'dataTempListModification',
                content: 'Deleted an dataTemp'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-data-temp-delete-popup',
    template: ''
})
export class DataTempDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private dataTempPopupService: DataTempPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.dataTempPopupService
                .open(DataTempDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
