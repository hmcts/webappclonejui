import {TestBed, inject} from '@angular/core/testing';
import { HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {SharedModule} from '../../shared/shared.module';
import {BrowserTransferStateModule} from '@angular/platform-browser';
import {DomainModule} from '../domain.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {HearingService} from './hearing.service';
import {ConfigService} from '../../config.service';

const configMock = {
    config: {
        api_base_url: 'http://test-doodah/api/hearings/'
    }
};

describe('HearingService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule(({
            imports: [
                DomainModule,
                SharedModule,
                BrowserTransferStateModule,
                HttpClientModule,
                HttpClientTestingModule,
                RouterTestingModule
            ],
            providers: [
                HearingService,
                {
                    provide: ConfigService,
                    userValue: configMock
                }
            ]
        }));
    });

    it('should be created', inject([HearingService], (service: HearingService) => {
        expect(service).toBeTruthy();
    }));
});
