import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { OtherWorksPondSuffix } from './other-works-pond-suffix.model';
import { OtherWorksPondSuffixService } from './other-works-pond-suffix.service';

@Component({
    selector: 'jhi-other-works-pond-suffix-detail',
    templateUrl: './other-works-pond-suffix-detail.component.html'
})
export class OtherWorksPondSuffixDetailComponent implements OnInit, OnDestroy {

    otherWorks: OtherWorksPondSuffix;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private otherWorksService: OtherWorksPondSuffixService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['otherWorks']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.otherWorksService.find(id).subscribe(otherWorks => {
            this.otherWorks = otherWorks;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
