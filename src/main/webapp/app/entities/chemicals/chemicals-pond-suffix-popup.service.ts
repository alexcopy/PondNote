import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ChemicalsPondSuffix } from './chemicals-pond-suffix.model';
import { ChemicalsPondSuffixService } from './chemicals-pond-suffix.service';
@Injectable()
export class ChemicalsPondSuffixPopupService {
    private isOpen = false;
    constructor (
        private modalService: NgbModal,
        private router: Router,
        private chemicalsService: ChemicalsPondSuffixService

    ) {}

    open (component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.chemicalsService.find(id).subscribe(chemicals => {
                if (chemicals.date) {
                    chemicals.date = {
                        year: chemicals.date.getFullYear(),
                        month: chemicals.date.getMonth() + 1,
                        day: chemicals.date.getDate()
                    };
                }
                this.chemicalsModalRef(component, chemicals);
            });
        } else {
            return this.chemicalsModalRef(component, new ChemicalsPondSuffix());
        }
    }

    chemicalsModalRef(component: Component, chemicals: ChemicalsPondSuffix): NgbModalRef {
        let modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.chemicals = chemicals;
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
