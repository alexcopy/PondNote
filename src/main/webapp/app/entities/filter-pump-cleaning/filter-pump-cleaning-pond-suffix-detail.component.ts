import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { FilterPumpCleaningPondSuffix } from './filter-pump-cleaning-pond-suffix.model';
import { FilterPumpCleaningPondSuffixService } from './filter-pump-cleaning-pond-suffix.service';

@Component({
    selector: 'jhi-filter-pump-cleaning-pond-suffix-detail',
    templateUrl: './filter-pump-cleaning-pond-suffix-detail.component.html'
})
export class FilterPumpCleaningPondSuffixDetailComponent implements OnInit, OnDestroy {

    filterPumpCleaning: FilterPumpCleaningPondSuffix;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private filterPumpCleaningService: FilterPumpCleaningPondSuffixService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['filterPumpCleaning']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.filterPumpCleaningService.find(id).subscribe(filterPumpCleaning => {
            this.filterPumpCleaning = filterPumpCleaning;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
