import { Component, computed, effect, inject, input, output, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PaginationService } from './pagination.service';

@Component({
  selector: 'pagination-component',
  templateUrl: './pagination-component.component.html',
})
export class PaginationComponentComponent {
  router = inject(Router);
  paginationService = inject(PaginationService);

  items = input.required<number>();
  limit = input.required<string>()

  totalPages = signal<number>(0);
  initialPage = input<number>(this.paginationService.pageInUrl());
  page = signal<number>(this.initialPage());

  getPages = effect(() => {
    const pagesObtained = Math.ceil(this.items() / parseInt(this.limit()));
    console.log(pagesObtained);
    this.totalPages.set(pagesObtained);
  });

  navigator = computed(() => {
    return Array.from({length: this.totalPages()}, (_, i) => i + 1);
  }) 

  onNextClick(){
    const data = this.navigator()[(this.page() - 1) + 1];

    //Checks if data is undefined
    if(!data) throw Error('Posición sin valor existente');

    this.page.set(data);
    this.router.navigate([], {queryParams: {page: this.page()}});
  }

  onBeforeClick(){
    const data = this.navigator()[(this.page() - 1) - 1];

    //Checks if data is undefined
    if(!data) throw Error('Posición sin valor existente');

    this.page.set(data);
    this.router.navigate([], {queryParams: {page: this.page()}});
  }
}
