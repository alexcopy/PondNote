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
import { MeterReadingPondSuffixDetailComponent } from '../../../../../../main/webapp/app/entities/meter-reading/meter-reading-pond-suffix-detail.component';
import { MeterReadingPondSuffixService } from '../../../../../../main/webapp/app/entities/meter-reading/meter-reading-pond-suffix.service';
import { MeterReadingPondSuffix } from '../../../../../../main/webapp/app/entities/meter-reading/meter-reading-pond-suffix.model';

describe('Component Tests', () => {

    describe('MeterReadingPondSuffix Management Detail Component', () => {
        let comp: MeterReadingPondSuffixDetailComponent;
        let fixture: ComponentFixture<MeterReadingPondSuffixDetailComponent>;
        let service: MeterReadingPondSuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [MeterReadingPondSuffixDetailComponent],
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
                    MeterReadingPondSuffixService
                ]
            }).overrideComponent(MeterReadingPondSuffixDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MeterReadingPondSuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MeterReadingPondSuffixService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new MeterReadingPondSuffix(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.meterReading).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
