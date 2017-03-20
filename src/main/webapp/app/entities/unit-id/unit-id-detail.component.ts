import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { UnitId } from './unit-id.model';
import { UnitIdService } from './unit-id.service';

@Component({
    selector: 'jhi-unit-id-detail',
    templateUrl: './unit-id-detail.component.html'
})
export class UnitIdDetailComponent implements OnInit, OnDestroy {

    unitId: UnitId;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private unitIdService: UnitIdService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['unitId']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.unitIdService.find(id).subscribe(unitId => {
            this.unitId = unitId;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
