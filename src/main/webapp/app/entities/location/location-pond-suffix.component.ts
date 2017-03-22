import { Component, OnInit, OnDestroy } from '@angular/core';
import { Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager, ParseLinks, PaginationUtil, JhiLanguageService, AlertService } from 'ng-jhipster';

import { LocationPondSuffix } from './location-pond-suffix.model';
import { LocationPondSuffixService } from './location-pond-suffix.service';
import { ITEMS_PER_PAGE, Principal } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-location-pond-suffix',
    templateUrl: './location-pond-suffix.component.html'
})
export class LocationPondSuffixComponent implements OnInit, OnDestroy {
locations: LocationPondSuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private locationService: LocationPondSuffixService,
        private alertService: AlertService,
        private eventManager: EventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = activatedRoute.snapshot.params['search'] ? activatedRoute.snapshot.params['search'] : '';
        this.jhiLanguageService.setLocations(['location']);
    }

    loadAll() {
        if (this.currentSearch) {
            this.locationService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: Response) => this.locations = res.json(),
                    (res: Response) => this.onError(res.json())
                );
            return;
       }
        this.locationService.query().subscribe(
            (res: Response) => {
                this.locations = res.json();
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
        this.registerChangeInLocations();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId (index: number, item: LocationPondSuffix) {
        return item.id;
    }



    registerChangeInLocations() {
        this.eventSubscriber = this.eventManager.subscribe('locationListModification', (response) => this.loadAll());
    }


    private onError (error) {
        this.alertService.error(error.message, null, null);
    }
}
