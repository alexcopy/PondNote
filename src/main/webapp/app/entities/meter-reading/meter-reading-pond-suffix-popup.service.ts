import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { MeterReadingPondSuffix } from './meter-reading-pond-suffix.model';
import { MeterReadingPondSuffixService } from './meter-reading-pond-suffix.service';
@Injectable()
export class MeterReadingPondSuffixPopupService {
    private isOpen = false;
    constructor (
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private meterReadingService: MeterReadingPondSuffixService

    ) {}

    open (component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.meterReadingService.find(id).subscribe(meterReading => {
                meterReading.readingDate = this.datePipe
                    .transform(meterReading.readingDate, 'yyyy-MM-ddThh:mm');
                this.meterReadingModalRef(component, meterReading);
            });
        } else {
            return this.meterReadingModalRef(component, new MeterReadingPondSuffix());
        }
    }

    meterReadingModalRef(component: Component, meterReading: MeterReadingPondSuffix): NgbModalRef {
        let modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.meterReading = meterReading;
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
