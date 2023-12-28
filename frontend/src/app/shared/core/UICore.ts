import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from "rxjs";

@Injectable()
export abstract class UICore implements OnDestroy {

  public onDestroyed$: Subject<any> = new Subject();

  ngOnDestroy() {
    this.onDestroyed$.next(true);
    this.onDestroyed$.complete();
  }
}
