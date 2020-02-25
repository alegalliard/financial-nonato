import { OnInit, AfterContentChecked, Injector } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { BaseResourceModel } from '../models/base-resource.model';
import { BaseResourceService } from '../services/base-resource.service';

import toastr from 'toastr';
import { switchMap } from 'rxjs/operators';

export abstract class BaseResourceFormComponent<T extends BaseResourceModel> implements OnInit, AfterContentChecked {

  currentAction: string;
  resourceForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm: boolean = false;
  
  protected route: ActivatedRoute;
  protected router: Router;
  protected formBuilder: FormBuilder;

  constructor(
      protected injector: Injector,
      public resource: T,
      protected baseResourceService: BaseResourceService<T>,
      protected jsonDataToResourceFn: (jsonData) => T
  ) { 
      this.router = this.injector.get(Router);
      this.route = this.injector.get(ActivatedRoute);
      this.formBuilder = this.injector.get(FormBuilder);
      
    }

  ngOnInit() {
    this.setCurrentAction();
    this.buildResourceForm();
    this.loadResource();
  }

  ngAfterContentChecked() {
    this.setPageTitle();
  }

  submitForm() {
    this.submittingForm = true;

    if(this.currentAction === 'new')
      this.createResource();
    else
      this.updateResource();
  }

  //protected

  protected setCurrentAction() {
    if(this.route.snapshot.url[0].path === 'new') {
      this.currentAction = 'new';
    } else {
      this.currentAction = 'edit';
    }
  }

  protected loadResource() {
    if(this.currentAction == 'edit') {

      this.route.paramMap.pipe( //observable
        switchMap(params => this.baseResourceService.getById(+params.get('id')))
      )
      .subscribe((resource) => {
          this.resource = resource;
          this.resourceForm.patchValue(resource); //binda os dados da categoria atual para ResourceForm
      },
      (error) => alert('Ocorreu um erro no servidor. Tente novamente mais tarde')); 
    }
  }

  protected setPageTitle() {
      if(this.currentAction === 'new') {
          this.pageTitle = this.createPageTitle();
    } else {
        this.pageTitle = this.editPageTitle();
    }
  }

  protected createPageTitle(): string {
      return 'Novo';
  }

  protected editPageTitle(): string {
      return 'Editar';
  }

  protected createResource() {
    const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);

    this.baseResourceService.create(resource)
        .subscribe(resource => this.actionsForSuccess(resource),
        error => this.actionsForError(error));
  }

  protected updateResource() {
    const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);

    this.baseResourceService.update(resource)
        .subscribe(resource => this.actionsForSuccess(resource),
                      error => this.actionsForError(error));
        
  }

  protected actionsForSuccess(resource: T) {
    toastr.success('Solicitação processada com sucesso');

    const baseComponentPath = this.route.snapshot.parent.url[0].path;

    this.router.navigateByUrl(baseComponentPath, { skipLocationChange: true}) //skipLocationChange não grava no historico
        .then(() => {
            console.log(resource.id)
            return this.router.navigate([baseComponentPath, resource.id, 'edit'])
        })
  }

  protected actionsForError(error: any) {
    toastr.error('Ocorreu um erro ao salvar.');

    this.submittingForm = false;

    if(error.status === 422)
      this.serverErrorMessages = JSON.parse(error._body).errors;
    else
      this.serverErrorMessages = ['Falha na comunicação com o servidor.']
  }

  protected abstract buildResourceForm():void //o TS obrigará a criar um buildResourceForm, como uma interface.

}
