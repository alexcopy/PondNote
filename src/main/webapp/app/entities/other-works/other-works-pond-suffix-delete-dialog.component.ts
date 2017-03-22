import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { OtherWorksPondSuffix } from './other-works-pond-suffix.model';
import { OtherWorksPondSuffixPopupService } from './other-works-pond-suffix-popup.service';
import { OtherWorksPondSuffixService } from './other-works-pond-suffix.service';

@Component({
    selector: 'jhi-other-works-pond-suffix-delete-dialog',
    templateUrl: './other-works-pond-suffix-delete-dialog.component.html'
})
export class OtherWorksPondSuffixDeleteDialogComponent {

    otherWorks: OtherWorksPondSuffix;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private otherWorksService: OtherWorksPondSuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['otherWorks']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.otherWorksService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'otherWorksListModification',
                content: 'Deleted an otherWorks'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-other-works-pond-suffix-delete-popup',
    template: ''
})
export class OtherWorksPondSuffixDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private otherWorksPopupService: OtherWorksPondSuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.otherWorksPopupService
                .open(OtherWorksPondSuffixDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
