import { Component, OnInit } from '@angular/core';
import { EntryService } from '../shared/entry.service';
import { Entry } from '../shared/entry.model';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.scss']
})
export class EntryListComponent implements OnInit {

  entries: Entry[] = [];

  constructor(private entryService: EntryService) { }

  ngOnInit() {
    this.entryService.getAll().subscribe(
      entries => this.entries = entries.sort((a,b) => b.id - a.id ),
      error => alert('Erro ao carregar a lista')
    );
  }

  deleteEntry(entry) {
    const confirmDelete = confirm('Deseja realmente excluir este item?');

    if(confirmDelete) {
      this.entryService.delete(entry.id).subscribe(
        () => this.entries = this.entries.filter(element => element != entry),
        () => alert('Érro ao tentar excluir')
      );
    }
  }

}
