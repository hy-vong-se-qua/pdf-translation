import * as _ from "lodash";
import { NumberUtils } from "./NumberUtils";

export namespace ObjectUtils {
  /**
   * Check any type value is empty
   * @param v : Value to check
   * @returns : Is value empty
   */
  export function isEmpty(v: any): boolean {
    return v === undefined || v === null || v === "";
  }

  /**
   * Static function used for check two object contain same value.
   * @param obj1 Object 1
   * @param obj2 Object 2
   * @param base Object's blueprint used for a custom compares data.
   * @example isEqual(obj1, obj2, new Class());
   * @returns
   */
  export function isEqual(obj1: any, obj2: any, base: Object = null): boolean {
    if (!base) {
      return _.isEqual(obj1, obj2);
    }
    if (typeof obj1 != typeof obj2) {
      return false;
    }
    if (Array.isArray(obj1)) {
      return compareTwoArray(obj1, obj2);
    }
    const keys = Object.keys(base);
    for (const key of keys) {
      if (obj1[key] === obj2[key]) {
        continue;
      }
      return false;
    }
    return true;
  }

  /** Static function used for check two array contain same value. */
  export function compareTwoArray(arr1: Object, arr2: Object) {
    if (!Array.isArray(arr1) || !Array.isArray(arr2)) return false;
    if (arr1.length != arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      const v1 = arr1[i];
      const v2 = arr2[i];
      if (v1 === v2) {
        continue;
      }
      return false;
    }
    return true;
  }

  /**
   * Check array is empty
   * @param v : Value to check
   * @returns : Is value empty
   */
  export function isArrayEmpty(v: any): boolean {
    return !Array.isArray(v) || v.length == 0;
  }

  /** Check data is contained value. */
  export function isContainKey(data: any, v: any): boolean {
    if (isEmpty(data)) {
      return false;
    }
    if (typeof data == "string") {
      return data.includes(v);
    }
    if (typeof data == "number") {
      return data.toString().includes(v);
    }
    if (Array.isArray(data)) {
      return data.includes(v);
    }
    if (typeof data == "object") {
      return data.hasOwnProperty(v);
    }
    return false;
  }

  /**
   * Convert any type value to boolean value
   * @param v : Value to convert
   * @returns : Value is converted to boolean
   */
  export function toBoolean(v: any): boolean {
    try {
      if (isEmpty(v)) {
        return false;
      }
      if (typeof v === "boolean") {
        return v;
      }
      if (NumberUtils.isNumeric(v)) {
        return Number(v) === 0 ? false : true;
      }

      return JSON.parse(v);
    } catch {
      return false;
    }
  }

  /**
   * Clone reference variable (object)
   * @param v : Origin object to be copied
   * @returns : Object is cloned
   */
  export function cloneData<T>(v: T): T {
    try {
      return _.cloneDeep(v);
    } catch {
      return v;
    }
  }
}
