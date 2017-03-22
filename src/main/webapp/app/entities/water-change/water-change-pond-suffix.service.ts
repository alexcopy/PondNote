import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, BaseRequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { WaterChangePondSuffix } from './water-change-pond-suffix.model';
import { DateUtils } from 'ng-jhipster';
@Injectable()
export class WaterChangePondSuffixService {

    private resourceUrl = 'api/water-changes';
    private resourceSearchUrl = 'api/_search/water-changes';

    constructor(private http: Http, private dateUtils: DateUtils) { }

    create(waterChange: WaterChangePondSuffix): Observable<WaterChangePondSuffix> {
        let copy: WaterChangePondSuffix = Object.assign({}, waterChange);
        copy.changeDate = this.dateUtils
            .convertLocalDateToServer(waterChange.changeDate);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(waterChange: WaterChangePondSuffix): Observable<WaterChangePondSuffix> {
        let copy: WaterChangePondSuffix = Object.assign({}, waterChange);
        copy.changeDate = this.dateUtils
            .convertLocalDateToServer(waterChange.changeDate);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<WaterChangePondSuffix> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            let jsonResponse = res.json();
            jsonResponse.changeDate = this.dateUtils
                .convertLocalDateFromServer(jsonResponse.changeDate);
            return jsonResponse;
        });
    }

    query(req?: any): Observable<Response> {
        let options = this.createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: any) => this.convertResponse(res))
        ;
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    search(req?: any): Observable<Response> {
        let options = this.createRequestOption(req);
        return this.http.get(this.resourceSearchUrl, options)
            .map((res: any) => this.convertResponse(res))
        ;
    }

    private convertResponse(res: any): any {
        let jsonResponse = res.json();
        for (let i = 0; i < jsonResponse.length; i++) {
            jsonResponse[i].changeDate = this.dateUtils
                .convertLocalDateFromServer(jsonResponse[i].changeDate);
        }
        res._body = jsonResponse;
        return res;
    }

    private createRequestOption(req?: any): BaseRequestOptions {
        let options: BaseRequestOptions = new BaseRequestOptions();
        if (req) {
            let params: URLSearchParams = new URLSearchParams();
            params.set('page', req.page);
            params.set('size', req.size);
            if (req.sort) {
                params.paramsMap.set('sort', req.sort);
            }
            params.set('query', req.query);

            options.search = params;
        }
        return options;
    }
}