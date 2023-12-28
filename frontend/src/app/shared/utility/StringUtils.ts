import { ObjectUtils } from "./ObjectUtils";
import { v4 as uuidv4 } from 'uuid';

export namespace StringUtils {
  /** Convert url query to Map object. */
  export function createUrlQueryMap(): Map<string, string> {
    const url = location.href;
    if (!url.includes("?")) {
      return null;
    }
    const map = new Map<string, string>();
    const strQuery = url.split("?")[1];
    const queries = strQuery.split("&");
    for (const query of queries) {
      const temp = query.split("=");
      if (temp.length != 2) {
        continue;
      }
      map.set(temp[0], temp[1]);
    }
    return map;
  }

  /**
   * Returns the substring at the specified location within a string value.
   * @param v String value
   * @param start
   * @param end
   * @returns
   */
  export function substring(v: string, start: number, end: number) {
    return toString(v).substring(start, end);
  }

  /** Create random string */
  export function generateId() {
    return uuidv4();
  }

  /**
   * Override method padStart in class String
   * @param v
   * @param maxLength
   * @param fillString
   * @returns
   */
  export function padStart(v: string | number, maxLength: number, fillString: string = " "): string {
    return toString(v).padStart(maxLength, fillString);
  }

  /**
   * Convert value to type string
   * @param v
   * @returns
   */
  export function toString(v: any): string {
    if (ObjectUtils.isEmpty(v)) {
      return "";
    }
    if (typeof v == 'string') {
      return v;
    }
    if (typeof v == 'object') {
      return JSON.stringify(v)
    }

    return v.toString();
  }

  /**
   * Replace all substring in a string.
   * @param value Value need to replace
   * @param search
   * @param replacement
   * @returns
   */
  export function replaceAll(value: string, search: string, replacement: string): string {
    if (ObjectUtils.isEmpty(value)) {
      return "";
    }
    const regex = new RegExp(search, "g");
    return value.replace(regex, replacement);
  }

  /**
   * check if input value is date type
   * @param d
   * @returns
   */
  export function checkDateString(v: string | number, pattern: string = "YYYY/MM/DD"): boolean {
    const value = toString(v);
    const yearPattern = '((?:19|20)[0-9]{2,2})';
    const monthPattern = '(0[1-9]|1[012])';
    const dayPattern = '(0[1-9]|[12][0-9]|3[01])';

    if (ObjectUtils.isEmpty(value)) {
      return false;
    }

    switch (pattern) {
      case "YYYY/MM/DD":
        return (new RegExp("^" + yearPattern + "[/]" + monthPattern + "[/]" + dayPattern + "$").test(value));
      case "DD/MM/YYYY":
        return (new RegExp("^" + dayPattern + "[/]" + monthPattern + "[/]" + yearPattern + "$").test(value));
      case "MM/DD/YYYY":
        return (new RegExp("^" + monthPattern + "[/]" + dayPattern + "[/]" + yearPattern + "$").test(value));
      case "YYYYMMDD":
        return (new RegExp("^" + yearPattern + monthPattern + dayPattern + "$").test(value));
      case "DDMMYYYY":
        return (new RegExp("^" + dayPattern + monthPattern + yearPattern + "$").test(value));
      case "MMDDYYYY":
        return (new RegExp("^" + monthPattern + dayPattern + yearPattern + "$").test(value));
      case "YYYY-MM-DD":
        return (new RegExp("^" + yearPattern + "[-]" + monthPattern + "[-]" + dayPattern + "$").test(value));
      case "DD-MM-YYYY":
        return (new RegExp("^" + dayPattern + "[-]" + monthPattern + "[-]" + yearPattern + "$").test(value));
      case "MM-DD-YYYY":
        return (new RegExp("^" + monthPattern + "[-]" + dayPattern + "[-]" + yearPattern + "$").test(value));
      default:
        return false;
    }
  }
}
