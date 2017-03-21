import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { TempMeterPondSuffix } from './temp-meter-pond-suffix.model';
import { TempMeterPondSuffixService } from './temp-meter-pond-suffix.service';

@Component({
    selector: 'jhi-temp-meter-pond-suffix-detail',
    templateUrl: './temp-meter-pond-suffix-detail.component.html'
})
export class TempMeterPondSuffixDetailComponent implements OnInit, OnDestroy {

    tempMeter: TempMeterPondSuffix;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private tempMeterService: TempMeterPondSuffixService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['tempMeter']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.tempMeterService.find(id).subscribe(tempMeter => {
            this.tempMeter = tempMeter;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
