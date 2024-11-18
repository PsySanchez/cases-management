import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Case } from '../../interfaces/case';
import { CaseService, PersonService } from '../../services';
import { Person } from '../../interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-case',
  standalone: true,
  imports: [],
  templateUrl: './case.component.html',
  styleUrl: './case.component.css',
})
export class CaseComponent implements OnInit, OnDestroy {
  @Input() case!: Case;

  public plaintiff!: Person;
  public defendant!: Person;

  // unsubscribe to all subscriptions
  private _subscription = new Subscription();

  constructor(
    private _personService: PersonService,
    private _caseService: CaseService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit() {
    if (this.case) {
      if (this.case?.plaintiffId) this._getPlaintiff();
      if (this.case?.defendantId) this._getDefendant();
    } else {
      this._getCase();
    }
  }

  private _getCase(): void {
    const id = parseInt(this._activatedRoute.snapshot.params['id']);

    if (Number.isNaN(id)) this._router.navigate(['/cases']);

    this._subscription.add(
      this._caseService.getCaseById(id).subscribe({
        next: (data: Case) => {
          this.case = data;
          if (this.case?.plaintiffId) this._getPlaintiff();
          if (this.case?.defendantId) this._getDefendant();
        },
        error: () => {
          alert('Case not found');
          this._router.navigate(['/cases']);
        },
      })
    );
  }

  private _getPlaintiff(): void {
    this._subscription.add(
      this._personService
        .getPersoneById(this.case.plaintiffId)
        .subscribe((data: Person) => {
          this.plaintiff = data;
        })
    );
  }

  private _getDefendant(): void {
    this._subscription.add(
      this._personService
        .getPersoneById(this.case.defendantId)
        .subscribe((data: Person) => {
          this.defendant = data;
        })
    );
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
