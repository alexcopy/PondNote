import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { Http, BaseRequestOptions } from '@angular/http';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils } from 'ng-jhipster';
import { JhiLanguageService } from 'ng-jhipster';
import { MockLanguageService } from '../../../helpers/mock-language.service';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { FilterPumpCleaningPondSuffixDetailComponent } from '../../../../../../main/webapp/app/entities/filter-pump-cleaning/filter-pump-cleaning-pond-suffix-detail.component';
import { FilterPumpCleaningPondSuffixService } from '../../../../../../main/webapp/app/entities/filter-pump-cleaning/filter-pump-cleaning-pond-suffix.service';
import { FilterPumpCleaningPondSuffix } from '../../../../../../main/webapp/app/entities/filter-pump-cleaning/filter-pump-cleaning-pond-suffix.model';

describe('Component Tests', () => {

    describe('FilterPumpCleaningPondSuffix Management Detail Component', () => {
        let comp: FilterPumpCleaningPondSuffixDetailComponent;
        let fixture: ComponentFixture<FilterPumpCleaningPondSuffixDetailComponent>;
        let service: FilterPumpCleaningPondSuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [FilterPumpCleaningPondSuffixDetailComponent],
                providers: [
                    MockBackend,
                    BaseRequestOptions,
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    {
                        provide: Http,
                        useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
                            return new Http(backendInstance, defaultOptions);
                        },
                        deps: [MockBackend, BaseRequestOptions]
                    },
                    {
                        provide: JhiLanguageService,
                        useClass: MockLanguageService
                    },
                    FilterPumpCleaningPondSuffixService
                ]
            }).overrideComponent(FilterPumpCleaningPondSuffixDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FilterPumpCleaningPondSuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FilterPumpCleaningPondSuffixService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new FilterPumpCleaningPondSuffix(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.filterPumpCleaning).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
