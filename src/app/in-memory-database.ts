import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Category } from './pages/categories/shared/category.model'; 
import { Entry } from './pages/entries/shared/entry.model';

export class InMemoryDatabase implements InMemoryDbService {
    createDb() {
        const categories: Category[] = [
            { id: 1, name: 'Moradia', description: 'Pagamentos das contas da casa' },
            { id: 2, name: 'Saúde', description: 'Plano de Saúde e Remédios' },
            { id: 3, name: 'Lazer', description: 'Passeios, viagens, etc' },
            { id: 4, name: 'Salário', description: 'Recebimento de salário' },
            { id: 5, name: 'Freelas', description: 'Trabalhos como freelancer' }
        ];

        const entries: Entry[] = [
            { id: 1, name: 'Gás', description: '', date: '25/10/2020', amount: '85,00', paid: true, categoryId: categories[1].id, category: categories[1], type: 'expense' } as Entry,
            { id: 2, name: 'Suplementos', description: '', date: '15/11/2020', amount: '120,00', paid: true, categoryId: categories[2].id, category: categories[2], type: 'expense' } as Entry,
            { id: 3, name: 'Cinema', description: '', date: '15/11/2020', amount: '25,00', paid: false, categoryId: categories[3].id, category: categories[3], type: 'revenue' } as Entry,
            { id: 4, name: 'Água', description: '', date: '15/11/2020', amount: '73,00', paid: false, categoryId: categories[4].id, category: categories[4], type: 'expense' } as Entry,
            { id: 4, name: 'Água', description: '', date: '15/11/2020', amount: '73,00', paid: false, categoryId: categories[4].id, category: categories[4], type: 'expense' } as Entry,
            { id: 4, name: 'Água', description: '', date: '15/11/2020', amount: '73,00', paid: false, categoryId: categories[4].id, category: categories[4], type: 'expense' } as Entry,
            { id: 4, name: 'Freela', description: '', date: '04/10/2020', amount: '1000,00', paid: false, categoryId: categories[4].id, category: categories[4], type: 'revenue' } as Entry,
        ]

        return { categories, entries };
    }
}