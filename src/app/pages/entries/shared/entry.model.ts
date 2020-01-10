import { Category } from '../../categories/shared/category.model';

export class Entry {
    public id: number;
    public name: string;
    public description: string;
    public amount: string;
    public paid:  boolean;
    public categoryId: number;
    public date: string;
    public type: string;
    public category: Category;


    static types = {
        expense: 'Despesa',
        revenue: 'Receita'
    }

    public get paidText(): string {
        return this.paid? 'Pago' : 'Pendente'
    }
}