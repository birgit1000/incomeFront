import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {IncomeStatementTypesComponent} from './income-statement-types.component';

describe('IncomeStatementTypesComponent', () => {
  let component: IncomeStatementTypesComponent;
  let fixture: ComponentFixture<IncomeStatementTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomeStatementTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeStatementTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
