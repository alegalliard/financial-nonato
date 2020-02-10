import { Category } from '../../categories/shared/category.model';
import { BaseResourceModel } from '../../../shared/models/base-resource.model';

export class Entry extends BaseResourceModel {

    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public amount?: string,
        public paid?:  boolean,
        public categoryId?: number,
        public category?: Category,
        public date?: string,
        public type?: string,
    ){
        super();
    }

        // public id?: number;
        // public name?: string;
        // public description?: string;
        // public amount?: string;
        // public paid?:  boolean;
        // public categoryId?: number;
        // public date?: string;
        // public type?: string;


    static types = {
        expense: 'Despesa',
        revenue: 'Receita'
    }

    public paidText(): string {
        return this.paid? 'Pagou' : 'Pendente'
    }
}