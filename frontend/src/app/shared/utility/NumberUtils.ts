import { ObjectUtils } from "./ObjectUtils";
import { StringUtils } from "./StringUtils";

export namespace NumberUtils {
  /**
   * Check value is numeric
   * @param v
   * @returns
   */
  export function isNumeric(v: string | number): boolean {
    return !ObjectUtils.isEmpty(v) && !isNaN(Number(v));
  }

  export function toNumber(v): number {
    if (typeof v === 'number') {
      return v;
    }
    if (typeof v === 'boolean') {
      return v ? 1 : 0;
    }
    if (typeof v !== 'string') {
      return null;
    }
    if (isNumeric(v)) {
      return Number(v);
    }
    const t = StringUtils.replaceAll(v, ",", "");
    if (!isNaN(Number(t))) {
      return Number(t);
    }
    return null;
  }
}
