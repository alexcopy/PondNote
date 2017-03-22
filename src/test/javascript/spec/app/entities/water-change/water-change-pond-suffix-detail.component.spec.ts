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
import { WaterChangePondSuffixDetailComponent } from '../../../../../../main/webapp/app/entities/water-change/water-change-pond-suffix-detail.component';
import { WaterChangePondSuffixService } from '../../../../../../main/webapp/app/entities/water-change/water-change-pond-suffix.service';
import { WaterChangePondSuffix } from '../../../../../../main/webapp/app/entities/water-change/water-change-pond-suffix.model';

describe('Component Tests', () => {

    describe('WaterChangePondSuffix Management Detail Component', () => {
        let comp: WaterChangePondSuffixDetailComponent;
        let fixture: ComponentFixture<WaterChangePondSuffixDetailComponent>;
        let service: WaterChangePondSuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [WaterChangePondSuffixDetailComponent],
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
                    WaterChangePondSuffixService
                ]
            }).overrideComponent(WaterChangePondSuffixDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(WaterChangePondSuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WaterChangePondSuffixService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new WaterChangePondSuffix(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.waterChange).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
