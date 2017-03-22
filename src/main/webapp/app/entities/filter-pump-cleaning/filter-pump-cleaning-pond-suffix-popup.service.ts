import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { FilterPumpCleaningPondSuffix } from './filter-pump-cleaning-pond-suffix.model';
import { FilterPumpCleaningPondSuffixService } from './filter-pump-cleaning-pond-suffix.service';
@Injectable()
export class FilterPumpCleaningPondSuffixPopupService {
    private isOpen = false;
    constructor (
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private filterPumpCleaningService: FilterPumpCleaningPondSuffixService

    ) {}

    open (component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.filterPumpCleaningService.find(id).subscribe(filterPumpCleaning => {
                filterPumpCleaning.cleaningDate = this.datePipe
                    .transform(filterPumpCleaning.cleaningDate, 'yyyy-MM-ddThh:mm');
                this.filterPumpCleaningModalRef(component, filterPumpCleaning);
            });
        } else {
            return this.filterPumpCleaningModalRef(component, new FilterPumpCleaningPondSuffix());
        }
    }

    filterPumpCleaningModalRef(component: Component, filterPumpCleaning: FilterPumpCleaningPondSuffix): NgbModalRef {
        let modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.filterPumpCleaning = filterPumpCleaning;
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
