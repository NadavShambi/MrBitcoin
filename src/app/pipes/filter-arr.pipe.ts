import { Pipe, PipeTransform } from '@angular/core';

interface Item {
  [key: string]: any;
}

@Pipe({
  name: 'filterArr',
})
export class FilterArrPipe implements PipeTransform {
  transform<T extends Item, Key extends keyof T>(
    items: T[],
    itemProp: Key,
    term: string
  ): T[] {
    const regExp = new RegExp(term, 'i');
    return items.filter((item) => regExp.test(item[itemProp]));
  }


}
