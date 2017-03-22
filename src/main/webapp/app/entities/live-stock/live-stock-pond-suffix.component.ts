import { Component, OnInit, OnDestroy } from '@angular/core';
import { Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager, ParseLinks, PaginationUtil, JhiLanguageService, AlertService } from 'ng-jhipster';

import { LiveStockPondSuffix } from './live-stock-pond-suffix.model';
import { LiveStockPondSuffixService } from './live-stock-pond-suffix.service';
import { ITEMS_PER_PAGE, Principal } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-live-stock-pond-suffix',
    templateUrl: './live-stock-pond-suffix.component.html'
})
export class LiveStockPondSuffixComponent implements OnInit, OnDestroy {
liveStocks: LiveStockPondSuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private liveStockService: LiveStockPondSuffixService,
        private alertService: AlertService,
        private eventManager: EventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = activatedRoute.snapshot.params['search'] ? activatedRoute.snapshot.params['search'] : '';
        this.jhiLanguageService.setLocations(['liveStock', 'stockCase']);
    }

    loadAll() {
        if (this.currentSearch) {
            this.liveStockService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: Response) => this.liveStocks = res.json(),
                    (res: Response) => this.onError(res.json())
                );
            return;
       }
        this.liveStockService.query().subscribe(
            (res: Response) => {
                this.liveStocks = res.json();
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
        this.registerChangeInLiveStocks();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId (index: number, item: LiveStockPondSuffix) {
        return item.id;
    }



    registerChangeInLiveStocks() {
        this.eventSubscriber = this.eventManager.subscribe('liveStockListModification', (response) => this.loadAll());
    }


    private onError (error) {
        this.alertService.error(error.message, null, null);
    }
}
