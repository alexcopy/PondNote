import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { UnitId } from './unit-id.model';
import { UnitIdService } from './unit-id.service';
@Injectable()
export class UnitIdPopupService {
    private isOpen = false;
    constructor (
        private modalService: NgbModal,
        private router: Router,
        private unitIdService: UnitIdService

    ) {}

    open (component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.unitIdService.find(id).subscribe(unitId => {
                this.unitIdModalRef(component, unitId);
            });
        } else {
            return this.unitIdModalRef(component, new UnitId());
        }
    }

    unitIdModalRef(component: Component, unitId: UnitId): NgbModalRef {
        let modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.unitId = unitId;
        modalRef.result.then(result => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        });
        return modalRef;
    }
}
