import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { MeterReadingPondSuffix } from './meter-reading-pond-suffix.model';
import { MeterReadingPondSuffixService } from './meter-reading-pond-suffix.service';

@Component({
    selector: 'jhi-meter-reading-pond-suffix-detail',
    templateUrl: './meter-reading-pond-suffix-detail.component.html'
})
export class MeterReadingPondSuffixDetailComponent implements OnInit, OnDestroy {

    meterReading: MeterReadingPondSuffix;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private meterReadingService: MeterReadingPondSuffixService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['meterReading']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.meterReadingService.find(id).subscribe(meterReading => {
            this.meterReading = meterReading;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
