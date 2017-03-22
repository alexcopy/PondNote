import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { TankPondSuffix } from './tank-pond-suffix.model';
import { TankPondSuffixService } from './tank-pond-suffix.service';

@Component({
    selector: 'jhi-tank-pond-suffix-detail',
    templateUrl: './tank-pond-suffix-detail.component.html'
})
export class TankPondSuffixDetailComponent implements OnInit, OnDestroy {

    tank: TankPondSuffix;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private tankService: TankPondSuffixService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['tank', 'tankType']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.tankService.find(id).subscribe(tank => {
            this.tank = tank;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
