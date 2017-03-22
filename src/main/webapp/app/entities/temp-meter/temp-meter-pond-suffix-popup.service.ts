import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { TempMeterPondSuffix } from './temp-meter-pond-suffix.model';
import { TempMeterPondSuffixService } from './temp-meter-pond-suffix.service';
@Injectable()
export class TempMeterPondSuffixPopupService {
    private isOpen = false;
    constructor (
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private tempMeterService: TempMeterPondSuffixService

    ) {}

    open (component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.tempMeterService.find(id).subscribe(tempMeter => {
                tempMeter.readingDate = this.datePipe
                    .transform(tempMeter.readingDate, 'yyyy-MM-ddThh:mm');
                this.tempMeterModalRef(component, tempMeter);
            });
        } else {
            return this.tempMeterModalRef(component, new TempMeterPondSuffix());
        }
    }

    tempMeterModalRef(component: Component, tempMeter: TempMeterPondSuffix): NgbModalRef {
        let modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.tempMeter = tempMeter;
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
