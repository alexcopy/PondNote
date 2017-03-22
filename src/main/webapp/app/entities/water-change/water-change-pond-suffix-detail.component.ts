import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { WaterChangePondSuffix } from './water-change-pond-suffix.model';
import { WaterChangePondSuffixService } from './water-change-pond-suffix.service';

@Component({
    selector: 'jhi-water-change-pond-suffix-detail',
    templateUrl: './water-change-pond-suffix-detail.component.html'
})
export class WaterChangePondSuffixDetailComponent implements OnInit, OnDestroy {

    waterChange: WaterChangePondSuffix;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private waterChangeService: WaterChangePondSuffixService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['waterChange']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.waterChangeService.find(id).subscribe(waterChange => {
            this.waterChange = waterChange;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
