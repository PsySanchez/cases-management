import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Case } from '../interfaces/case';

@Injectable({
  providedIn: 'root',
})
export class CaseService {
  constructor(private _http: HttpClient) {}

  // mock implementation
  public getCases(): Observable<Case[]> {
    return this._http.get<Case[]>('assets/data/case-list.json');
  }

  // mock implementation
  public getCaseById(id: number): Observable<Case> {
    return this._http.get<Case[]>('assets/data/case-list.json').pipe(
      map((data: Case[]) => {
        const caseItem = data.find((c) => c.id === id);
        if (!caseItem) {
          throw new Error(`Case with id ${id} not found`);
        }
        return caseItem;
      })
    );
  }

  // mock implementation
  public getCasesByStatus(status: string): Observable<Case[]> {
    return this._http.get<Case[]>('assets/data/case-list.json').pipe(
      map((data: Case[]) => {
        return data.filter((c: Case) => c.status.toLowerCase() === status);
      })
    );
  }

  // mock implementation
  public getMyCases(personeId: number): Observable<Case[]> {
    return this._http.get<Case[]>('assets/data/case-list.json').pipe(
      map((data: Case[]) => {
        return data.filter(
          (c: Case) =>
            c.defendantId === personeId || c.plaintiffId === personeId
        );
      })
    );
  }
}
