import { Component, OnInit } from '@angular/core';
import { Case } from '../../interfaces/case';
import { CaseComponent } from '../case/case.component';

//angular material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CaseService } from '../../services/case.service';
import { Person } from '../../interfaces';
import { PersonService } from '../../services';

@Component({
  selector: 'app-case-list',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CaseComponent,
    MatSelectModule,
  ],
  templateUrl: './case-list.component.html',
  styleUrl: './case-list.component.css',
})
export class CaseListComponent implements OnInit {
  public caseList: Case[] = [];
  public sortBy: any[] = [
    { key: 'createdAt', value: 'תאריך פתיחה' },
    { key: 'id', value: 'מספר תיק' },
  ];
  public filterStatus = 'all';

  private _user!: Person;

  constructor(
    private _caseService: CaseService,
    private _personService: PersonService
  ) {}

  ngOnInit() {
    this._getMyData();
    this._getCases();
  }

  public filterByStatus(status: string) {
    this.filterStatus = status;

    switch (status) {
      case 'open':
      case 'closed':
        this._filterByStatus(status);
        break;
      case 'myCases':
        this._filtreMyCases();
        break;
      default:
        this._getCases();
        break;
    }
  }

  public sortCaseBy(sortBy: string) {
    switch (sortBy) {
      case 'createdAt':
        this._sortByCreatedAt();
        break;
      case 'id':
        this._sortById();
        break;
    }
  }

  private _sortByCreatedAt() {
    this.caseList = this.caseList.sort((a: Case, b: Case) => {
      if (a.createdAt < b.createdAt) {
        return -1;
      }
      if (a.createdAt > b.createdAt) {
        return 1;
      }
      return 0;
    });
  }

  private _sortById() {
    this.caseList = this.caseList.sort((a: Case, b: Case) => {
      if (a.id < b.id) {
        return -1;
      }
      if (a.id > b.id) {
        return 1;
      }
      return 0;
    });
  }

  private _filtreMyCases() {
    this._caseService.getMyCases(this._user.id).subscribe({
      next: (data: Case[]) => {
        this.caseList = data;
      },
    });
  }

  private _filterByStatus(status: string) {
    this._caseService.getCasesByStatus(status).subscribe({
      next: (data: Case[]) => {
        this.caseList = data;
      },
    });
  }

  private _getCases() {
    this._caseService.getCases().subscribe({
      next: (data: Case[]) => {
        this.caseList = data;
      },
    });
  }

  private _getMyData() {
    this._personService.getMyData().subscribe({
      next: (data: Person) => {
        this._user = data;
      },
    });
  }
}
