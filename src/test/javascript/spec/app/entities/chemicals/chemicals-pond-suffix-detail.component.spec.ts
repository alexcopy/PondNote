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
import { ChemicalsPondSuffixDetailComponent } from '../../../../../../main/webapp/app/entities/chemicals/chemicals-pond-suffix-detail.component';
import { ChemicalsPondSuffixService } from '../../../../../../main/webapp/app/entities/chemicals/chemicals-pond-suffix.service';
import { ChemicalsPondSuffix } from '../../../../../../main/webapp/app/entities/chemicals/chemicals-pond-suffix.model';

describe('Component Tests', () => {

    describe('ChemicalsPondSuffix Management Detail Component', () => {
        let comp: ChemicalsPondSuffixDetailComponent;
        let fixture: ComponentFixture<ChemicalsPondSuffixDetailComponent>;
        let service: ChemicalsPondSuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [ChemicalsPondSuffixDetailComponent],
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
                    ChemicalsPondSuffixService
                ]
            }).overrideComponent(ChemicalsPondSuffixDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ChemicalsPondSuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ChemicalsPondSuffixService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new ChemicalsPondSuffix(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.chemicals).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
