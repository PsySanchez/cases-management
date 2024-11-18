import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Person } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  constructor(private _http: HttpClient) {}

  // mock implementation
  public getPersoneById(id: number): Observable<Person> {
    return this._http.get<Person[]>('assets/data/person-list.json').pipe(
      map((data: Person[]) => {
        const person = data.find((person) => person.id === id);
        if (!person) {
          throw new Error(`Person with id ${id} not found`);
        }
        return person;
      })
    );
  }

  // mock implementation
  public getMyData(): Observable<Person> {
    return new Observable((observer) => {
      observer.next({
        id: 1,
        name: 'John Doe',
      });
      observer.complete();
    });
  }
}
