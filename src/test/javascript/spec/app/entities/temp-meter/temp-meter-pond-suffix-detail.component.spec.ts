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
import { TempMeterPondSuffixDetailComponent } from '../../../../../../main/webapp/app/entities/temp-meter/temp-meter-pond-suffix-detail.component';
import { TempMeterPondSuffixService } from '../../../../../../main/webapp/app/entities/temp-meter/temp-meter-pond-suffix.service';
import { TempMeterPondSuffix } from '../../../../../../main/webapp/app/entities/temp-meter/temp-meter-pond-suffix.model';

describe('Component Tests', () => {

    describe('TempMeterPondSuffix Management Detail Component', () => {
        let comp: TempMeterPondSuffixDetailComponent;
        let fixture: ComponentFixture<TempMeterPondSuffixDetailComponent>;
        let service: TempMeterPondSuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [TempMeterPondSuffixDetailComponent],
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
                    TempMeterPondSuffixService
                ]
            }).overrideComponent(TempMeterPondSuffixDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TempMeterPondSuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TempMeterPondSuffixService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new TempMeterPondSuffix(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.tempMeter).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
