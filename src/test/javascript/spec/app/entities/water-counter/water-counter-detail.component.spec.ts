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
import { WaterCounterDetailComponent } from '../../../../../../main/webapp/app/entities/water-counter/water-counter-detail.component';
import { WaterCounterService } from '../../../../../../main/webapp/app/entities/water-counter/water-counter.service';
import { WaterCounter } from '../../../../../../main/webapp/app/entities/water-counter/water-counter.model';

describe('Component Tests', () => {

    describe('WaterCounter Management Detail Component', () => {
        let comp: WaterCounterDetailComponent;
        let fixture: ComponentFixture<WaterCounterDetailComponent>;
        let service: WaterCounterService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [WaterCounterDetailComponent],
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
                    WaterCounterService
                ]
            }).overrideComponent(WaterCounterDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(WaterCounterDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WaterCounterService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new WaterCounter(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.waterCounter).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
