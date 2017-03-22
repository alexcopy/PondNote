import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { ChemicalsPondSuffix } from './chemicals-pond-suffix.model';
import { ChemicalsPondSuffixService } from './chemicals-pond-suffix.service';

@Component({
    selector: 'jhi-chemicals-pond-suffix-detail',
    templateUrl: './chemicals-pond-suffix-detail.component.html'
})
export class ChemicalsPondSuffixDetailComponent implements OnInit, OnDestroy {

    chemicals: ChemicalsPondSuffix;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private chemicalsService: ChemicalsPondSuffixService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['chemicals']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.chemicalsService.find(id).subscribe(chemicals => {
            this.chemicals = chemicals;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
