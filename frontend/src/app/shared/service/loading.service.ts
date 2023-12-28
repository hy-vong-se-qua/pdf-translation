import { Injectable, ComponentRef, Injector, ApplicationRef, ComponentFactoryResolver } from '@angular/core';
import { LoadingComponent } from '../ui/loading/loading.component';
import { DynamicComponentService } from './dynamic-component.service';

@Injectable({ providedIn: 'root' })
export class LoadingService extends DynamicComponentService {
  private componentRef: ComponentRef<LoadingComponent>;

  constructor(
    protected componentFactoryResolver: ComponentFactoryResolver,
    protected appRef: ApplicationRef,
    protected injector: Injector
  ) {
    super(componentFactoryResolver, appRef, injector);
  }

  public show(): ComponentRef<LoadingComponent> {
    const componentRef = this.appendDialogToBody(LoadingComponent);
    this.componentRef = componentRef;
    componentRef.instance.onDestroyed$.subscribe(x => {
      console.log(x)
    })
    return this.componentRef;
  }
}
