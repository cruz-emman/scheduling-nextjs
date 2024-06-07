export function isValidDate(d: any) {
    const parsedDate = new Date(d);
    return parsedDate instanceof Date && !Number.isNaN(parsedDate);
  }
  