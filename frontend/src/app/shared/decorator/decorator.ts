import { Injector, ProviderToken } from "@angular/core";
import { LoadingService } from "../service/loading.service";

export class Decorator {
  static injector: Injector;
}

/**
 * @description: The decorator used when need to catch exception and showing dialog.
 */
export function ExceptionHandler() {
  return function (target: any, propertyKey: string, descriptor: any) {
    const originalMethod: Function = descriptor.value;
    descriptor.value = async function (...args) {
      try {
        const result = await originalMethod.apply(this, args);
        return result;
      } catch (error) {
        console.error(error)
      }
    };
  };
}

/**
 * @description: The decorator used when called API (only when using promise).
 */
export function ApiProcess() {
  return function (target: any, propertyKey: string, descriptor: any) {
    const originalMethod: Function = descriptor.value;
    descriptor.value = async function (...args) {
      const loading = getInjector(LoadingService).show();
      try {
        const result = await originalMethod.apply(this, args);
        return result;
      } catch (error) {
        console.error(error)
      } finally {
        loading.destroy();
      }
    };
  };
}

/** Get injectable instance */
export function getInjector<T>(token: ProviderToken<T>) {
  const injector = Decorator.injector;
  return injector.get(token);
}
