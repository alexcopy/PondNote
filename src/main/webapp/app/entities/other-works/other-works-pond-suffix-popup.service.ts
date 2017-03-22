import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { OtherWorksPondSuffix } from './other-works-pond-suffix.model';
import { OtherWorksPondSuffixService } from './other-works-pond-suffix.service';
@Injectable()
export class OtherWorksPondSuffixPopupService {
    private isOpen = false;
    constructor (
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private otherWorksService: OtherWorksPondSuffixService

    ) {}

    open (component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.otherWorksService.find(id).subscribe(otherWorks => {
                otherWorks.date = this.datePipe
                    .transform(otherWorks.date, 'yyyy-MM-ddThh:mm');
                this.otherWorksModalRef(component, otherWorks);
            });
        } else {
            return this.otherWorksModalRef(component, new OtherWorksPondSuffix());
        }
    }

    otherWorksModalRef(component: Component, otherWorks: OtherWorksPondSuffix): NgbModalRef {
        let modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.otherWorks = otherWorks;
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
