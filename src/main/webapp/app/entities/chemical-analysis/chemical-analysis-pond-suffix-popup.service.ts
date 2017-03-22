import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { ChemicalAnalysisPondSuffix } from './chemical-analysis-pond-suffix.model';
import { ChemicalAnalysisPondSuffixService } from './chemical-analysis-pond-suffix.service';
@Injectable()
export class ChemicalAnalysisPondSuffixPopupService {
    private isOpen = false;
    constructor (
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private chemicalAnalysisService: ChemicalAnalysisPondSuffixService

    ) {}

    open (component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.chemicalAnalysisService.find(id).subscribe(chemicalAnalysis => {
                chemicalAnalysis.date = this.datePipe
                    .transform(chemicalAnalysis.date, 'yyyy-MM-ddThh:mm');
                this.chemicalAnalysisModalRef(component, chemicalAnalysis);
            });
        } else {
            return this.chemicalAnalysisModalRef(component, new ChemicalAnalysisPondSuffix());
        }
    }

    chemicalAnalysisModalRef(component: Component, chemicalAnalysis: ChemicalAnalysisPondSuffix): NgbModalRef {
        let modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.chemicalAnalysis = chemicalAnalysis;
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
