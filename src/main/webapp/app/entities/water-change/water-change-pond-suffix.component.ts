import { Component, OnInit, OnDestroy } from '@angular/core';
import { Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager, ParseLinks, PaginationUtil, JhiLanguageService, AlertService } from 'ng-jhipster';

import { WaterChangePondSuffix } from './water-change-pond-suffix.model';
import { WaterChangePondSuffixService } from './water-change-pond-suffix.service';
import { ITEMS_PER_PAGE, Principal } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-water-change-pond-suffix',
    templateUrl: './water-change-pond-suffix.component.html'
})
export class WaterChangePondSuffixComponent implements OnInit, OnDestroy {
waterChanges: WaterChangePondSuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private waterChangeService: WaterChangePondSuffixService,
        private alertService: AlertService,
        private eventManager: EventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = activatedRoute.snapshot.params['search'] ? activatedRoute.snapshot.params['search'] : '';
        this.jhiLanguageService.setLocations(['waterChange']);
    }

    loadAll() {
        if (this.currentSearch) {
            this.waterChangeService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: Response) => this.waterChanges = res.json(),
                    (res: Response) => this.onError(res.json())
                );
            return;
       }
        this.waterChangeService.query().subscribe(
            (res: Response) => {
                this.waterChanges = res.json();
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
        this.registerChangeInWaterChanges();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId (index: number, item: WaterChangePondSuffix) {
        return item.id;
    }



    registerChangeInWaterChanges() {
        this.eventSubscriber = this.eventManager.subscribe('waterChangeListModification', (response) => this.loadAll());
    }


    private onError (error) {
        this.alertService.error(error.message, null, null);
    }
}
