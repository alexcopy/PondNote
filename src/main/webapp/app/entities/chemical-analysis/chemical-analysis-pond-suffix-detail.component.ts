import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { ChemicalAnalysisPondSuffix } from './chemical-analysis-pond-suffix.model';
import { ChemicalAnalysisPondSuffixService } from './chemical-analysis-pond-suffix.service';

@Component({
    selector: 'jhi-chemical-analysis-pond-suffix-detail',
    templateUrl: './chemical-analysis-pond-suffix-detail.component.html'
})
export class ChemicalAnalysisPondSuffixDetailComponent implements OnInit, OnDestroy {

    chemicalAnalysis: ChemicalAnalysisPondSuffix;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private chemicalAnalysisService: ChemicalAnalysisPondSuffixService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['chemicalAnalysis']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.chemicalAnalysisService.find(id).subscribe(chemicalAnalysis => {
            this.chemicalAnalysis = chemicalAnalysis;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
