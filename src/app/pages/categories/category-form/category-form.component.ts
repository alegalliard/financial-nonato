import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Category } from '../shared/category.model';
import { CategoryService } from '../shared/category.service';
import toastr from 'toastr';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

  currentAction: string;
  categoryForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm: boolean = false;
  category: Category = new Category();

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.setCurrentAction();
    this.buildCategoryForm();
    this.loadCategory();
  }

  ngAfterContentChecked() {
    this.setPageTitle();
  }

  submitForm() {
    this.submittingForm = true;

    if(this.currentAction === 'new')
      this.createCategory();
    else
      this.updateCategory();
  }

  //private

  private setCurrentAction() {
    if(this.route.snapshot.url[0].path === 'new') {
      this.currentAction = 'new';
    } else {
      this.currentAction = 'edit';
    }
  }

  private buildCategoryForm() {
    this.categoryForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null]
    });
  }

  private loadCategory() {
    if(this.currentAction == 'edit') {

      this.route.paramMap.pipe( //observable
        switchMap(params => this.categoryService.getById(+params.get('id')))
      )
      .subscribe((category) => {
          this.category = category;
          this.categoryForm.patchValue(category); //binda os dados da categoria atual para CategoryForm
      },
      (error) => alert('Ocorreu um erro no servidor. Tente novamente mais tarde')); 
    }
  }

  private setPageTitle() {
    if(this.currentAction === 'new') {
      this.pageTitle = 'Cadastro de nova categoria';
    } else {
      const categoryName = this.category.name || '';
      this.pageTitle = `Editando categoria ${categoryName}`;
    }
  }

  private createCategory() {
    const category: Category = Object.assign(new Category(), this.categoryForm.value);

    this.categoryService.create(category)
        .subscribe(category => this.actionsForSuccess(category),
        error => this.actionsForError(error));
  }

  private updateCategory() {
    const category: Category = Object.assign(new Category(), this.categoryForm.value);

    this.categoryService.update(category)
        .subscribe(category => this.actionsForSuccess(category),
                      error => this.actionsForError(error));
        

  }

  private actionsForSuccess(category: Category) {
    toastr.success('Solicitação processada com sucesso');

    this.router.navigateByUrl('categories', { skipLocationChange: true}) //skipLocationChange não grava no historico
        .then(() => this.router.navigate(['categories', category.id, 'edit']))
  }

  private actionsForError(error: any) {
    toastr.error('Ocorreu um erro ao salvar.');

    this.submittingForm = false;

    if(error.status === 422)
      this.serverErrorMessages = JSON.parse(error._body).errors;
    else
      this.serverErrorMessages = ['Falha na comunicação com o servidor.']
  }

}
