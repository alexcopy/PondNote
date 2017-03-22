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
import { TankPondSuffixDetailComponent } from '../../../../../../main/webapp/app/entities/tank/tank-pond-suffix-detail.component';
import { TankPondSuffixService } from '../../../../../../main/webapp/app/entities/tank/tank-pond-suffix.service';
import { TankPondSuffix } from '../../../../../../main/webapp/app/entities/tank/tank-pond-suffix.model';

describe('Component Tests', () => {

    describe('TankPondSuffix Management Detail Component', () => {
        let comp: TankPondSuffixDetailComponent;
        let fixture: ComponentFixture<TankPondSuffixDetailComponent>;
        let service: TankPondSuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [TankPondSuffixDetailComponent],
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
                    TankPondSuffixService
                ]
            }).overrideComponent(TankPondSuffixDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TankPondSuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TankPondSuffixService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new TankPondSuffix(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.tank).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
