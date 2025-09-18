// Simple Persian date utility functions
export const persianMonths = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

export const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

// Convert English digits to Persian
export function toPersianDigits(input: string): string {
  return input.replace(/[0-9]/g, (digit) => persianDigits[parseInt(digit)]);
}

// Convert Persian digits to English
export function toEnglishDigits(input: string): string {
  return input.replace(/[۰-۹]/g, (digit) =>
    persianDigits.indexOf(digit).toString()
  );
}

// Simple Persian to Gregorian date conversion
export function persianToGregorian(persianDate: string): Date {
  try {
    // Convert Persian digits to English
    const englishDate = toEnglishDigits(persianDate);
    const [year, month, day] = englishDate.split("/").map(Number);

    if (!year || !month || !day) {
      throw new Error("Invalid date format");
    }

    // Simple approximation: Persian year 1403 ≈ Gregorian 2024
    // This is a simplified conversion for demo purposes
    const gregorianYear = year + 621;
    const gregorianMonth = month - 1; // JavaScript months are 0-indexed

    return new Date(gregorianYear, gregorianMonth, day);
  } catch (error) {
    return new Date(); // Return current date as fallback
  }
}

// Format Gregorian date to Persian
export function formatToPersian(date: Date): string {
  try {
    // Simple approximation for demo
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const monthName = persianMonths[month - 1] || "نامشخص";

    return `${toPersianDigits(day.toString())} ${monthName}`;
  } catch (error) {
    return "نامشخص";
  }
}
