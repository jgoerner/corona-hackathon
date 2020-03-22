/* tslint:disable */
import { Injectable, NgModule } from '@angular/core';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
export interface Dictionary<V> {
    [key: string]: V;
}

export type LocalTime = {};


export interface Account {
    email: string;
    id: string;
    password: string;
    role: string;
}

export interface Contract {
    employeeId: string;
    id: string;
    jobId: string;
    signed: boolean;
    timestamp: LocalTime;
    videoVerified: boolean;
}

export interface Employee {
    ageGroup: string;
    englishSkill: boolean;
    germanSkill: boolean;
    id: string;
    licenseSkill: boolean;
    location: string;
    name: string;
    studentSkill: boolean;
}

export interface Employer {
    domain: string;
    homepage: string;
    id: string;
    name: string;
}

export interface Job {
    description: string;
    englishSkill: boolean;
    germanSkill: boolean;
    id: string;
    licenseSkill: boolean;
    location: string;
    qty: number;
    salary: number;
    studentSkill: boolean;
    title: string;
}

export interface JobRecommendation {
    explanation: string;
    jobId: string;
    score: number;
}

export function registerDefaultSerializers(config: ApinaConfig) {
    config.registerIdentitySerializer('LocalTime');


    config.registerClassSerializer('Account', {
        'email': 'string',
        'id': 'string',
        'password': 'string',
        'role': 'string'
    });

    config.registerClassSerializer('Contract', {
        'employeeId': 'string',
        'id': 'string',
        'jobId': 'string',
        'signed': 'boolean',
        'timestamp': 'LocalTime',
        'videoVerified': 'boolean'
    });

    config.registerClassSerializer('Employee', {
        'ageGroup': 'string',
        'englishSkill': 'boolean',
        'germanSkill': 'boolean',
        'id': 'string',
        'licenseSkill': 'boolean',
        'location': 'string',
        'name': 'string',
        'studentSkill': 'boolean'
    });

    config.registerClassSerializer('Employer', {
        'domain': 'string',
        'homepage': 'string',
        'id': 'string',
        'name': 'string'
    });

    config.registerClassSerializer('Job', {
        'description': 'string',
        'englishSkill': 'boolean',
        'germanSkill': 'boolean',
        'id': 'string',
        'licenseSkill': 'boolean',
        'location': 'string',
        'qty': 'number',
        'salary': 'number',
        'studentSkill': 'boolean',
        'title': 'string'
    });

    config.registerClassSerializer('JobRecommendation', {
        'explanation': 'string',
        'jobId': 'string',
        'score': 'number'
    });

}

export class ApinaConfig {

    /** Prefix added for all API calls */
    baseUrl: string = "";

    private serializers: SerializerMap = {
        any: identitySerializer,
        string: identitySerializer,
        number: identitySerializer,
        boolean: identitySerializer
    };

    constructor() {
        registerDefaultSerializers(this);
    }

    serialize(value: any, type: string): any {
        return this.lookupSerializer(type).serialize(value);
    }

    deserialize(value: any, type: string): any {
        return this.lookupSerializer(type).deserialize(value);
    }

    registerSerializer(name: string, serializer: Serializer) {
        this.serializers[name] = serializer;
    }

    registerEnumSerializer(name: string, enumObject: any) {
        this.registerSerializer(name, enumSerializer(enumObject));
    }

    registerClassSerializer(name: string, fields: any) {
        this.registerSerializer(name, this.classSerializer(fields));
    }

    registerIdentitySerializer(name: string) {
        this.registerSerializer(name, identitySerializer);
    }

    registerDiscriminatedUnionSerializer(name: string, discriminator: string, types: { [key: string]: string; }) {
        this.registerSerializer(name, this.discriminatedUnionSerializer(discriminator, types));
    }

    private classSerializer(fields: any): Serializer {
        function mapProperties(obj: any, propertyMapper: (value: any, type: string) => any) {
            if (obj === null || obj === undefined) {
                return obj;
            }

            const result: any = {};

            for (const name in fields) {
                if (fields.hasOwnProperty(name)) {
                    const value: any = obj[name];
                    const type: string = fields[name];
                    result[name] = propertyMapper(value, type);
                }
            }

            return result;
        }

        const serialize = this.serialize.bind(this);
        const deserialize = this.deserialize.bind(this);
        return {
            serialize(obj) {
                return mapProperties(obj, serialize);
            },
            deserialize(obj) {
                return mapProperties(obj, deserialize);
            }
        };
    }

    private discriminatedUnionSerializer(discriminatorProperty: string, types: { [key: string]: string; }): Serializer {
        const resolveSerializer = (localType: string) => {
            return this.lookupSerializer(types[localType]);
        };

        return {
            serialize(obj) {
                if (obj == null) return null;

                const localType = obj[discriminatorProperty];
                const result = resolveSerializer(localType).serialize(obj);
                result[discriminatorProperty] = localType;
                return result;
            },
            deserialize(obj) {
                if (obj == null) return null;

                const localType = obj[discriminatorProperty];
                const result = resolveSerializer(localType).deserialize(obj);
                result[discriminatorProperty] = localType;
                return result;
            }
        };
    }

    private lookupSerializer(type: string): Serializer {
        if (!type) throw new Error("no type given");

        if (type.indexOf('[]', type.length - 2) !== -1) { // type.endsWith('[]')
            const elementType = type.substring(0, type.length - 2);
            const elementSerializer = this.lookupSerializer(elementType);
            return arraySerializer(elementSerializer);
        }
        const serializer = this.serializers[type];
        if (serializer) {
            return serializer;
        } else {
            throw new Error(`could not find serializer for type '${type}'`);
        }
    }
}

function arraySerializer(elementSerializer: Serializer): Serializer {
    function safeMap(value: any[], mapper: (a: any) => any) {
        if (!value)
            return value;
        else
            return value.map(mapper);
    }

    return {
        serialize(value) {
            return safeMap(value, elementSerializer.serialize.bind(elementSerializer));
        },
        deserialize(value) {
            return safeMap(value, elementSerializer.deserialize.bind(elementSerializer));
        }
    }
}

export interface RequestData {
    uriTemplate: string;
    method: string;
    pathVariables?: any;
    requestParams?: any;
    requestBody?: any;
    responseType?: string;
}

export interface Serializer {
    serialize(o: any): any;
    deserialize(o: any): any;
}

const identitySerializer: Serializer = {
    serialize(o) {
        return o;
    },
    deserialize(o) {
        return o;
    }
};

function enumSerializer(enumObject: any): Serializer {
    return {
        serialize(o) {
            if (o === null || o === undefined)
                return o;
            else
                return enumObject[o];
        },
        deserialize(o) {
            if (o === null || o === undefined)
                return o;
            else
                return enumObject[o];
        }
    }
}

interface SerializerMap {
    [name: string]: Serializer;
}

export abstract class ApinaEndpointContext {

    constructor(protected config: ApinaConfig) {
    }

    abstract request(data: RequestData): Observable<any>

    serialize(value: any, type: string): any {
        return this.config.serialize(value, type);
    }

    deserialize(value: any, type: string): any {
        return this.config.deserialize(value, type);
    }

    protected buildUrl(uriTemplate: String, pathVariables: any): string {
        return this.config.baseUrl + uriTemplate.replace(/{([^}]+)}/g, (match, name) => pathVariables[name]);
    }
}

@Injectable()
export class DefaultApinaEndpointContext extends ApinaEndpointContext {

    constructor(private httpClient: HttpClient, config: ApinaConfig) {
        super(config);
    }

    request(data: RequestData): Observable<any> {
        const url = this.buildUrl(data.uriTemplate, data.pathVariables);

        const requestParams = data.requestParams;
        let params: HttpParams | undefined = undefined;
        if (requestParams != null) {
            const filteredParams: { [key: string]: any }  = {};
            for (const key of Object.keys(requestParams)) {
                const value = requestParams[key];
                if (value != null)
                    filteredParams[key] = value;
            }

            params = new HttpParams({fromObject: filteredParams});
        }


        return this.httpClient.request(data.method, url, { params: params, body: data.requestBody })
            .pipe(map(r => data.responseType ? this.config.deserialize(r, data.responseType) : r));
    }
}

@Injectable()
export class AccountEndpoint {
    constructor(private context: ApinaEndpointContext) {
    }

    activeAccount(): Observable<Account> {
        return this.context.request({
            'uriTemplate': '/api/v1/user',
            'method': 'GET',
            'responseType': 'Account'
        });
    }

    changePassword(oldPassword: string, newPassword: string): Observable<Account> {
        return this.context.request({
            'uriTemplate': '/api/v1/user',
            'method': 'PUT',
            'requestParams': {
                'oldPassword': this.context.serialize(oldPassword, 'string'),
                'newPassword': this.context.serialize(newPassword, 'string')
            },
            'responseType': 'Account'
        });
    }

    register(email: string, password: string): Observable<boolean> {
        return this.context.request({
            'uriTemplate': '/api/v1/register',
            'method': 'POST',
            'requestParams': {
                'email': this.context.serialize(email, 'string'),
                'password': this.context.serialize(password, 'string')
            },
            'responseType': 'boolean'
        });
    }

    session(): Observable<boolean> {
        return this.context.request({
            'uriTemplate': '/api/v1/session',
            'method': 'GET',
            'responseType': 'boolean'
        });
    }

}

@Injectable()
export class AllocatorWebEndpoint {
    constructor(private context: ApinaEndpointContext) {
    }

    findMatchesById(employeeId: string): Observable<JobRecommendation[]> {
        return this.context.request({
            'uriTemplate': '/api/v1/matches',
            'method': 'GET',
            'requestParams': {
                'id': this.context.serialize(employeeId, 'string')
            },
            'responseType': 'JobRecommendation[]'
        });
    }

}

@Injectable()
export class ContractWebEndpoint {
    constructor(private context: ApinaEndpointContext) {
    }

    create(jobId: string): Observable<Contract> {
        return this.context.request({
            'uriTemplate': '/api/v1/job/{jobId}/contract',
            'method': 'POST',
            'pathVariables': {
                'jobId': this.context.serialize(jobId, 'string')
            },
            'responseType': 'Contract'
        });
    }

    findAll(jobId: string): Observable<Contract[]> {
        return this.context.request({
            'uriTemplate': '/api/v1/job/{jobId}/contract',
            'method': 'GET',
            'pathVariables': {
                'jobId': this.context.serialize(jobId, 'string')
            },
            'responseType': 'Contract[]'
        });
    }

    findById(jobId: string, contractId: string): Observable<Contract> {
        return this.context.request({
            'uriTemplate': '/api/v1/job/{jobId}/contract/{contractId}',
            'method': 'GET',
            'pathVariables': {
                'jobId': this.context.serialize(jobId, 'string'),
                'contractId': this.context.serialize(contractId, 'string')
            },
            'responseType': 'Contract'
        });
    }

    update(jobId: string, contractId: string, signed: boolean, videoVerified: boolean): Observable<Contract> {
        return this.context.request({
            'uriTemplate': '/api/v1/job/{jobId}/contract/{contractId}',
            'method': 'PUT',
            'pathVariables': {
                'jobId': this.context.serialize(jobId, 'string'),
                'contractId': this.context.serialize(contractId, 'string')
            },
            'requestParams': {
                'signed': this.context.serialize(signed, 'boolean'),
                'videoVerified': this.context.serialize(videoVerified, 'boolean')
            },
            'responseType': 'Contract'
        });
    }

}

@Injectable()
export class EmployeeWebEndpoint {
    constructor(private context: ApinaEndpointContext) {
    }

    create(name: string, ageGroup: string, location: string, germanSkill: boolean, englishSkill: boolean, licenseSkill: boolean, studentSkill: boolean): Observable<Employee> {
        return this.context.request({
            'uriTemplate': '/api/v1/employee',
            'method': 'POST',
            'requestParams': {
                'name': this.context.serialize(name, 'string'),
                'ageGroup': this.context.serialize(ageGroup, 'string'),
                'location': this.context.serialize(location, 'string'),
                'germanSkill': this.context.serialize(germanSkill, 'boolean'),
                'englishSkill': this.context.serialize(englishSkill, 'boolean'),
                'licenseSkill': this.context.serialize(licenseSkill, 'boolean'),
                'studentSkill': this.context.serialize(studentSkill, 'boolean')
            },
            'responseType': 'Employee'
        });
    }

    deleteById(id: string): Observable<void> {
        return this.context.request({
            'uriTemplate': '/api/v1/employee/{id}',
            'method': 'DELETE',
            'pathVariables': {
                'id': this.context.serialize(id, 'string')
            }
        });
    }

    getById(id: string): Observable<Employee> {
        return this.context.request({
            'uriTemplate': '/api/v1/employee/{id}',
            'method': 'GET',
            'pathVariables': {
                'id': this.context.serialize(id, 'string')
            },
            'responseType': 'Employee'
        });
    }

    getCurrent(): Observable<Employee> {
        return this.context.request({
            'uriTemplate': '/api/v1/employee/me',
            'method': 'GET',
            'responseType': 'Employee'
        });
    }

    update(id: string, name: string, ageGroup: string, location: string, germanSkill: boolean, englishSkill: boolean, licenseSkill: boolean, studentSkill: boolean): Observable<Employee> {
        return this.context.request({
            'uriTemplate': '/api/v1/employee/{id}',
            'method': 'PUT',
            'pathVariables': {
                'id': this.context.serialize(id, 'string')
            },
            'requestParams': {
                'name': this.context.serialize(name, 'string'),
                'ageGroup': this.context.serialize(ageGroup, 'string'),
                'location': this.context.serialize(location, 'string'),
                'germanSkill': this.context.serialize(germanSkill, 'boolean'),
                'englishSkill': this.context.serialize(englishSkill, 'boolean'),
                'licenseSkill': this.context.serialize(licenseSkill, 'boolean'),
                'studentSkill': this.context.serialize(studentSkill, 'boolean')
            },
            'responseType': 'Employee'
        });
    }

}

@Injectable()
export class EmployerWebEndpoint {
    constructor(private context: ApinaEndpointContext) {
    }

    create(name: string, domain: string, homepage: string): Observable<Employer> {
        return this.context.request({
            'uriTemplate': '/api/v1/employer',
            'method': 'POST',
            'requestParams': {
                'name': this.context.serialize(name, 'string'),
                'domain': this.context.serialize(domain, 'string'),
                'homepage': this.context.serialize(homepage, 'string')
            },
            'responseType': 'Employer'
        });
    }

    getById(id: string): Observable<Employer> {
        return this.context.request({
            'uriTemplate': '/api/v1/employer/{id}',
            'method': 'GET',
            'pathVariables': {
                'id': this.context.serialize(id, 'string')
            },
            'responseType': 'Employer'
        });
    }

    getCurrent(): Observable<Employer> {
        return this.context.request({
            'uriTemplate': '/api/v1/employer/me',
            'method': 'GET',
            'responseType': 'Employer'
        });
    }

    update(id: string, name: string, domain: string, homepage: string): Observable<Employer> {
        return this.context.request({
            'uriTemplate': '/api/v1/employer/{id}',
            'method': 'PUT',
            'pathVariables': {
                'id': this.context.serialize(id, 'string')
            },
            'requestParams': {
                'name': this.context.serialize(name, 'string'),
                'domain': this.context.serialize(domain, 'string'),
                'homepage': this.context.serialize(homepage, 'string')
            },
            'responseType': 'Employer'
        });
    }

}

@Injectable()
export class JobWebEndpoint {
    constructor(private context: ApinaEndpointContext) {
    }

    create(description: string, title: string, location: string, qty: number, salary: number, germanSkill: boolean, englishSkill: boolean, licenseSkill: boolean, studentSkill: boolean): Observable<Job> {
        return this.context.request({
            'uriTemplate': '/api/v1/job',
            'method': 'POST',
            'requestParams': {
                'descr': this.context.serialize(description, 'string'),
                'title': this.context.serialize(title, 'string'),
                'location': this.context.serialize(location, 'string'),
                'qty': this.context.serialize(qty, 'number'),
                'salary': this.context.serialize(salary, 'number'),
                'germanSkill': this.context.serialize(germanSkill, 'boolean'),
                'englishSkill': this.context.serialize(englishSkill, 'boolean'),
                'licenseSkill': this.context.serialize(licenseSkill, 'boolean'),
                'studentSkill': this.context.serialize(studentSkill, 'boolean')
            },
            'responseType': 'Job'
        });
    }

    delete(jobId: string): Observable<void> {
        return this.context.request({
            'uriTemplate': '/api/v1/job/{id}',
            'method': 'DELETE',
            'pathVariables': {
                'id': this.context.serialize(jobId, 'string')
            }
        });
    }

    findAll(): Observable<Job[]> {
        return this.context.request({
            'uriTemplate': '/api/v1/job',
            'method': 'GET',
            'responseType': 'Job[]'
        });
    }

    findById(id: string): Observable<Job> {
        return this.context.request({
            'uriTemplate': '/api/v1/job/{id}',
            'method': 'GET',
            'pathVariables': {
                'id': this.context.serialize(id, 'string')
            },
            'responseType': 'Job'
        });
    }

    update(id: string, title: string, description: string, location: string, qty: number, salary: number, germanSkill: boolean, englishSkill: boolean, licenseSkill: boolean, studentSkill: boolean): Observable<Job> {
        return this.context.request({
            'uriTemplate': '/api/v1/job/{id}',
            'method': 'PUT',
            'pathVariables': {
                'id': this.context.serialize(id, 'string')
            },
            'requestParams': {
                'title': this.context.serialize(title, 'string'),
                'descr': this.context.serialize(description, 'string'),
                'location': this.context.serialize(location, 'string'),
                'qty': this.context.serialize(qty, 'number'),
                'salary': this.context.serialize(salary, 'number'),
                'germanSkill': this.context.serialize(germanSkill, 'boolean'),
                'englishSkill': this.context.serialize(englishSkill, 'boolean'),
                'licenseSkill': this.context.serialize(licenseSkill, 'boolean'),
                'studentSkill': this.context.serialize(studentSkill, 'boolean')
            },
            'responseType': 'Job'
        });
    }

}


export function apinaConfigFactory() {
    return new ApinaConfig();
}

@NgModule({
    imports: [HttpClientModule],
    providers: [
        AccountEndpoint,
        AllocatorWebEndpoint,
        ContractWebEndpoint,
        EmployeeWebEndpoint,
        EmployerWebEndpoint,
        JobWebEndpoint,
        { provide: ApinaEndpointContext, useClass: DefaultApinaEndpointContext },
        { provide: ApinaConfig, useFactory: apinaConfigFactory }
    ]
})
export class ApinaModule {}
