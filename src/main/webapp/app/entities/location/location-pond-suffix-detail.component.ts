import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { LocationPondSuffix } from './location-pond-suffix.model';
import { LocationPondSuffixService } from './location-pond-suffix.service';

@Component({
    selector: 'jhi-location-pond-suffix-detail',
    templateUrl: './location-pond-suffix-detail.component.html'
})
export class LocationPondSuffixDetailComponent implements OnInit, OnDestroy {

    location: LocationPondSuffix;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private locationService: LocationPondSuffixService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['location']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.locationService.find(id).subscribe(location => {
            this.location = location;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
