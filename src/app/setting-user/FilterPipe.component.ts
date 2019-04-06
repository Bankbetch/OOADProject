// import { Injectable, Pipe, PipeTransform } from '@angular/core';

// @Pipe({
//   name: 'filterPipe',
// })
// @Injectable()
// export class FilterPipe implements PipeTransform {
//   transform(items: any[], field: string, value: string): any[] {

//     console.log(field)
//     if (!items) {
//       return [];
//     }
//     if (!field || !value) {
//       return items;
//     }
//     return items.filter(singleItem =>
//       singleItem[field].toLowerCase().includes(value.toLowerCase())
//     );
//   }
// }

// import { Pipe, PipeTransform } from '@angular/core';

// @Pipe({
//   name: 'filterPipe'
// })
// export class FilterPipe implements PipeTransform {

//   transform(items: any[], searchToken: string) {


//         if (searchToken == null)
//             searchToken = "";


//         searchToken = searchToken.toLowerCase();

//         return items.filter(elem => elem.name.toLowerCase().indexOf(searchToken) > -1);
//     }

// }


import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipe implements PipeTransform {
  transform(items: any, filter: any, defaultFilter: boolean): any {
    if (!filter){
      return items;
    }

    if (!Array.isArray(items)){
      return items;
    }

    if (filter && Array.isArray(items)) {
      let filterKeys = Object.keys(filter);

      if (defaultFilter) {
        return items.filter(item =>
            filterKeys.reduce((x, keyName) =>
                (x && new RegExp(filter[keyName], 'gi').test(item[keyName])) || filter[keyName] == "", true));
      }
      else {
        return items.filter(item => {
          return filterKeys.some((keyName) => {
            return new RegExp(filter[keyName], 'gi').test(item[keyName]) || filter[keyName] == "";
          });
        });
      }
    }
  }
}