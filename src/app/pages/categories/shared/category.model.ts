import { BaseResourceModel } from '../../../shared/models/base-resource.model';

export class Category extends BaseResourceModel {
    id: number;
    name: string;
    description: string;
}