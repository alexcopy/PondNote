import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { DevicePondSuffix } from './device-pond-suffix.model';
import { DevicePondSuffixService } from './device-pond-suffix.service';

@Component({
    selector: 'jhi-device-pond-suffix-detail',
    templateUrl: './device-pond-suffix-detail.component.html'
})
export class DevicePondSuffixDetailComponent implements OnInit, OnDestroy {

    device: DevicePondSuffix;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private deviceService: DevicePondSuffixService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['device', 'deviceType']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.deviceService.find(id).subscribe(device => {
            this.device = device;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
