import { ApplicationRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Injector, Type } from '@angular/core';
import { IDialogService } from '../interface/IDialogService';

/**
 * Reference: https://medium.com/hackernoon/angular-pro-tip-how-to-dynamically-create-components-in-body-ba200cc289e6
 */
export abstract class DynamicComponentService implements IDialogService {
  constructor(
    protected componentFactoryResolver: ComponentFactoryResolver,
    protected appRef: ApplicationRef,
    protected injector: Injector
  ) { }

  public appendDialogToBody<T>(componentType: Type<T>): ComponentRef<T> {
    const componentRef = this.componentFactoryResolver.resolveComponentFactory(componentType).create(this.injector);

    this.appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as EmbeddedViewRef<HTMLElement>).rootNodes[0];
    document.body.appendChild(domElem);

    return componentRef;
  }
}
