import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { DataTemp } from './data-temp.model';
import { DataTempService } from './data-temp.service';

@Component({
    selector: 'jhi-data-temp-detail',
    templateUrl: './data-temp-detail.component.html'
})
export class DataTempDetailComponent implements OnInit, OnDestroy {

    dataTemp: DataTemp;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private dataTempService: DataTempService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['dataTemp']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.dataTempService.find(id).subscribe(dataTemp => {
            this.dataTemp = dataTemp;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
