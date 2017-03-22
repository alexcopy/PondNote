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
import { LiveStockPondSuffixDetailComponent } from '../../../../../../main/webapp/app/entities/live-stock/live-stock-pond-suffix-detail.component';
import { LiveStockPondSuffixService } from '../../../../../../main/webapp/app/entities/live-stock/live-stock-pond-suffix.service';
import { LiveStockPondSuffix } from '../../../../../../main/webapp/app/entities/live-stock/live-stock-pond-suffix.model';

describe('Component Tests', () => {

    describe('LiveStockPondSuffix Management Detail Component', () => {
        let comp: LiveStockPondSuffixDetailComponent;
        let fixture: ComponentFixture<LiveStockPondSuffixDetailComponent>;
        let service: LiveStockPondSuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [LiveStockPondSuffixDetailComponent],
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
                    LiveStockPondSuffixService
                ]
            }).overrideComponent(LiveStockPondSuffixDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LiveStockPondSuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LiveStockPondSuffixService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new LiveStockPondSuffix(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.liveStock).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
