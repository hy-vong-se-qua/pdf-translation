import { Subject } from 'rxjs';
import { Directive } from '@angular/core'
import { IDialogCore } from '../interface/IDialogCore';

@Directive()
export abstract class DialogCore implements IDialogCore {
  public closed$: Subject<boolean> = new Subject();

  public onHide() {
    this.closed$.next(true);
  }
}
