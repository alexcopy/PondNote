import { Component, OnInit, OnDestroy } from '@angular/core';
import { Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager, ParseLinks, PaginationUtil, JhiLanguageService, AlertService } from 'ng-jhipster';

import { TankPondSuffix } from './tank-pond-suffix.model';
import { TankPondSuffixService } from './tank-pond-suffix.service';
import { ITEMS_PER_PAGE, Principal } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-tank-pond-suffix',
    templateUrl: './tank-pond-suffix.component.html'
})
export class TankPondSuffixComponent implements OnInit, OnDestroy {
tanks: TankPondSuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private tankService: TankPondSuffixService,
        private alertService: AlertService,
        private eventManager: EventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = activatedRoute.snapshot.params['search'] ? activatedRoute.snapshot.params['search'] : '';
        this.jhiLanguageService.setLocations(['tank', 'tankType']);
    }

    loadAll() {
        if (this.currentSearch) {
            this.tankService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: Response) => this.tanks = res.json(),
                    (res: Response) => this.onError(res.json())
                );
            return;
       }
        this.tankService.query().subscribe(
            (res: Response) => {
                this.tanks = res.json();
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
        this.registerChangeInTanks();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId (index: number, item: TankPondSuffix) {
        return item.id;
    }



    registerChangeInTanks() {
        this.eventSubscriber = this.eventManager.subscribe('tankListModification', (response) => this.loadAll());
    }


    private onError (error) {
        this.alertService.error(error.message, null, null);
    }
}
