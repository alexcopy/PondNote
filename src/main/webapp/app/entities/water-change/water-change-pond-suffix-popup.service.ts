import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { WaterChangePondSuffix } from './water-change-pond-suffix.model';
import { WaterChangePondSuffixService } from './water-change-pond-suffix.service';
@Injectable()
export class WaterChangePondSuffixPopupService {
    private isOpen = false;
    constructor (
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private waterChangeService: WaterChangePondSuffixService

    ) {}

    open (component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.waterChangeService.find(id).subscribe(waterChange => {
                waterChange.changeDate = this.datePipe
                    .transform(waterChange.changeDate, 'yyyy-MM-ddThh:mm');
                this.waterChangeModalRef(component, waterChange);
            });
        } else {
            return this.waterChangeModalRef(component, new WaterChangePondSuffix());
        }
    }

    waterChangeModalRef(component: Component, waterChange: WaterChangePondSuffix): NgbModalRef {
        let modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.waterChange = waterChange;
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
