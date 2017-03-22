import { Component, OnInit, OnDestroy } from '@angular/core';
import { Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager, ParseLinks, PaginationUtil, JhiLanguageService, AlertService } from 'ng-jhipster';

import { ChemicalAnalysisPondSuffix } from './chemical-analysis-pond-suffix.model';
import { ChemicalAnalysisPondSuffixService } from './chemical-analysis-pond-suffix.service';
import { ITEMS_PER_PAGE, Principal } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-chemical-analysis-pond-suffix',
    templateUrl: './chemical-analysis-pond-suffix.component.html'
})
export class ChemicalAnalysisPondSuffixComponent implements OnInit, OnDestroy {
chemicalAnalyses: ChemicalAnalysisPondSuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private chemicalAnalysisService: ChemicalAnalysisPondSuffixService,
        private alertService: AlertService,
        private eventManager: EventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = activatedRoute.snapshot.params['search'] ? activatedRoute.snapshot.params['search'] : '';
        this.jhiLanguageService.setLocations(['chemicalAnalysis']);
    }

    loadAll() {
        if (this.currentSearch) {
            this.chemicalAnalysisService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: Response) => this.chemicalAnalyses = res.json(),
                    (res: Response) => this.onError(res.json())
                );
            return;
       }
        this.chemicalAnalysisService.query().subscribe(
            (res: Response) => {
                this.chemicalAnalyses = res.json();
                this.currentSearch = '';
            },
            (res: Response) => this.onError(res.json())
        );
    }

    search (query) {
        if (!query) {
            return this.clear();
        }
        this.currentSearch = query;
        this.loadAll();
    }

    clear() {
        this.currentSearch = '';
        this.loadAll();
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInChemicalAnalyses();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId (index: number, item: ChemicalAnalysisPondSuffix) {
        return item.id;
    }



    registerChangeInChemicalAnalyses() {
        this.eventSubscriber = this.eventManager.subscribe('chemicalAnalysisListModification', (response) => this.loadAll());
    }


    private onError (error) {
        this.alertService.error(error.message, null, null);
    }
}
