import * as dayjs from "dayjs";
import { ObjectUtils } from "./ObjectUtils";

export class DateUtils {
  public static clone(d: any) {
    return dayjs(d).clone().toDate();
  }

  /** Return monday of the week of select day */
  public static getMonday(v: any) {
    if (!DateUtils.isDate(v)) {
      return null;
    }
    const d = DateUtils.parseDate(v);
    const day = d.getDay();
    const diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
    return new Date(d.setDate(diff));
  }

  /**
   * Convert date format string to date
   * @param v
   * @returns
   */
  public static parseDate(v: any): Date {
    if (!v) return null;
    return dayjs(v).toDate();
  }

  /**
   * Check value is date or date type string.
   * @param v
   * @returns true (date) / false (not date)
   */
  public static isDate(v: any): boolean {
    if (ObjectUtils.isEmpty(v)) {
      return false;
    }
    const d = new Date(v);
    return !isNaN(d.getDate());
  }

  /**
   * Convert date / date string to
   * @param d
   * @param format
   * @description date format - yyyy: year, mm: month, dd: date
   * @description time format - hh: hour 24, mi: minute, ss: second
   * @returns string datetime format
   */
  public static formatDateTime(d: any, format: string = "YYYY/MM/DD"): string {
    if (ObjectUtils.isEmpty(d)) {
      return d;
    }

    const date = DateUtils.parseDate(d);

    if (!DateUtils.isDate(date)) {
      return null;
    }

    return dayjs(d).format(format);
  }
}
