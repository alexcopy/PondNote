import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { WaterCounter } from './water-counter.model';
import { WaterCounterService } from './water-counter.service';

@Component({
    selector: 'jhi-water-counter-detail',
    templateUrl: './water-counter-detail.component.html'
})
export class WaterCounterDetailComponent implements OnInit, OnDestroy {

    waterCounter: WaterCounter;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private waterCounterService: WaterCounterService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['waterCounter', 'waterCounterTypes']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.waterCounterService.find(id).subscribe(waterCounter => {
            this.waterCounter = waterCounter;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
