import { Component, OnInit, OnDestroy } from '@angular/core';
import { Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager, ParseLinks, PaginationUtil, JhiLanguageService, AlertService } from 'ng-jhipster';

import { UnitId } from './unit-id.model';
import { UnitIdService } from './unit-id.service';
import { ITEMS_PER_PAGE, Principal } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-unit-id',
    templateUrl: './unit-id.component.html'
})
export class UnitIdComponent implements OnInit, OnDestroy {
unitIds: UnitId[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private unitIdService: UnitIdService,
        private alertService: AlertService,
        private eventManager: EventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = activatedRoute.snapshot.params['search'] ? activatedRoute.snapshot.params['search'] : '';
        this.jhiLanguageService.setLocations(['unitId']);
    }

    loadAll() {
        if (this.currentSearch) {
            this.unitIdService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: Response) => this.unitIds = res.json(),
                    (res: Response) => this.onError(res.json())
                );
            return;
       }
        this.unitIdService.query().subscribe(
            (res: Response) => {
                this.unitIds = res.json();
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
        this.registerChangeInUnitIds();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId (index: number, item: UnitId) {
        return item.id;
    }



    registerChangeInUnitIds() {
        this.eventSubscriber = this.eventManager.subscribe('unitIdListModification', (response) => this.loadAll());
    }


    private onError (error) {
        this.alertService.error(error.message, null, null);
    }
}
