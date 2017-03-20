import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DataTemp } from './data-temp.model';
import { DataTempService } from './data-temp.service';
@Injectable()
export class DataTempPopupService {
    private isOpen = false;
    constructor (
        private modalService: NgbModal,
        private router: Router,
        private dataTempService: DataTempService

    ) {}

    open (component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.dataTempService.find(id).subscribe(dataTemp => {
                if (dataTemp.data) {
                    dataTemp.data = {
                        year: dataTemp.data.getFullYear(),
                        month: dataTemp.data.getMonth() + 1,
                        day: dataTemp.data.getDate()
                    };
                }
                this.dataTempModalRef(component, dataTemp);
            });
        } else {
            return this.dataTempModalRef(component, new DataTemp());
        }
    }

    dataTempModalRef(component: Component, dataTemp: DataTemp): NgbModalRef {
        let modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.dataTemp = dataTemp;
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
