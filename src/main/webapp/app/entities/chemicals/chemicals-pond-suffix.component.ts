import { Component, OnInit, OnDestroy } from '@angular/core';
import { Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager, ParseLinks, PaginationUtil, JhiLanguageService, AlertService } from 'ng-jhipster';

import { ChemicalsPondSuffix } from './chemicals-pond-suffix.model';
import { ChemicalsPondSuffixService } from './chemicals-pond-suffix.service';
import { ITEMS_PER_PAGE, Principal } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-chemicals-pond-suffix',
    templateUrl: './chemicals-pond-suffix.component.html'
})
export class ChemicalsPondSuffixComponent implements OnInit, OnDestroy {
chemicals: ChemicalsPondSuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private chemicalsService: ChemicalsPondSuffixService,
        private alertService: AlertService,
        private eventManager: EventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = activatedRoute.snapshot.params['search'] ? activatedRoute.snapshot.params['search'] : '';
        this.jhiLanguageService.setLocations(['chemicals']);
    }

    loadAll() {
        if (this.currentSearch) {
            this.chemicalsService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: Response) => this.chemicals = res.json(),
                    (res: Response) => this.onError(res.json())
                );
            return;
       }
        this.chemicalsService.query().subscribe(
            (res: Response) => {
                this.chemicals = res.json();
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
        this.registerChangeInChemicals();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId (index: number, item: ChemicalsPondSuffix) {
        return item.id;
    }



    registerChangeInChemicals() {
        this.eventSubscriber = this.eventManager.subscribe('chemicalsListModification', (response) => this.loadAll());
    }


    private onError (error) {
        this.alertService.error(error.message, null, null);
    }
}
