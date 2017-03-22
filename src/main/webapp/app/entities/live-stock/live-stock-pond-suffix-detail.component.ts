import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { LiveStockPondSuffix } from './live-stock-pond-suffix.model';
import { LiveStockPondSuffixService } from './live-stock-pond-suffix.service';

@Component({
    selector: 'jhi-live-stock-pond-suffix-detail',
    templateUrl: './live-stock-pond-suffix-detail.component.html'
})
export class LiveStockPondSuffixDetailComponent implements OnInit, OnDestroy {

    liveStock: LiveStockPondSuffix;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private liveStockService: LiveStockPondSuffixService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['liveStock', 'stockCase']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.liveStockService.find(id).subscribe(liveStock => {
            this.liveStock = liveStock;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
