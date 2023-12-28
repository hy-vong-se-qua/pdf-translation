import { ComponentRef, Type } from '@angular/core';
import { DialogCore } from '../core/DialogCore';

export interface IDialogService {
  appendDialogToBody<T extends DialogCore>(componentType: Type<T>): ComponentRef<T>;
}
