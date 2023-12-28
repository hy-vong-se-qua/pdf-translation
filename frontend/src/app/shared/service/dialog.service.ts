import { ApplicationRef, ComponentFactoryResolver, EmbeddedViewRef, Injectable, Injector, Type } from '@angular/core';
import { DialogCore } from '../core/DialogCore';
import { DynamicComponentService } from './dynamic-component.service';

@Injectable()
export class DialogService extends DynamicComponentService {
  constructor(
    protected componentFactoryResolver: ComponentFactoryResolver,
    protected appRef: ApplicationRef,
    protected injector: Injector
  ) {
    super(componentFactoryResolver, appRef, injector);
  }

  show<T extends DialogCore>(componentType: Type<T>): T {
    const componentRef = this.appendDialogToBody(componentType);
    const component = componentRef.instance;
    component.closed$.subscribe(v => {
      if (v) {
        this.appRef.detachView(componentRef.hostView);
        componentRef.destroy();
      }
    });
    return component;
  }
}
