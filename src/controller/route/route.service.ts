import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Route } from '../../model/route/route.interface';

@Injectable()
export class RouteService {
    constructor(
        @Inject('ROUTE_MODEL')
        private readonly routeModel: Model<Route>,
    ) { }

    async queryRouteList(): Promise<Route[]> {
        return await this.routeModel.find({}).sort({ id: 1 });
    }
}
