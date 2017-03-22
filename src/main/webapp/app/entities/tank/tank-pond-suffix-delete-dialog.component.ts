import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { TankPondSuffix } from './tank-pond-suffix.model';
import { TankPondSuffixPopupService } from './tank-pond-suffix-popup.service';
import { TankPondSuffixService } from './tank-pond-suffix.service';

@Component({
    selector: 'jhi-tank-pond-suffix-delete-dialog',
    templateUrl: './tank-pond-suffix-delete-dialog.component.html'
})
export class TankPondSuffixDeleteDialogComponent {

    tank: TankPondSuffix;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private tankService: TankPondSuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['tank', 'tankType']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.tankService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'tankListModification',
                content: 'Deleted an tank'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tank-pond-suffix-delete-popup',
    template: ''
})
export class TankPondSuffixDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private tankPopupService: TankPondSuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.tankPopupService
                .open(TankPondSuffixDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
