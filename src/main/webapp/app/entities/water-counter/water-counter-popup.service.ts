import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { WaterCounter } from './water-counter.model';
import { WaterCounterService } from './water-counter.service';
@Injectable()
export class WaterCounterPopupService {
    private isOpen = false;
    constructor (
        private modalService: NgbModal,
        private router: Router,
        private waterCounterService: WaterCounterService

    ) {}

    open (component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.waterCounterService.find(id).subscribe(waterCounter => {
                if (waterCounter.date) {
                    waterCounter.date = {
                        year: waterCounter.date.getFullYear(),
                        month: waterCounter.date.getMonth() + 1,
                        day: waterCounter.date.getDate()
                    };
                }
                this.waterCounterModalRef(component, waterCounter);
            });
        } else {
            return this.waterCounterModalRef(component, new WaterCounter());
        }
    }

    waterCounterModalRef(component: Component, waterCounter: WaterCounter): NgbModalRef {
        let modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.waterCounter = waterCounter;
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
