/**
 * Get all available timezones
 * @returns Array of IANA timezone identifiers (e.g., 'Asia/Tehran', 'America/New_York')
 */
export const getAvailableTimezones = (): string[] => {
  if (typeof Intl === "undefined" || typeof Intl.supportedValuesOf !== "function") {
    // Fallback for older environments
    return [];
  }
  return Intl.supportedValuesOf("timeZone");
};

/**
 * Get current timezone
 * @returns IANA timezone identifier
 */
export const getCurrentTimezone = (): string => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};

/**
 * Format timezone for display (e.g., 'Asia/Tehran' -> 'Tehran (Asia)')
 */
export const formatTimezoneDisplay = (timezone: string): string => {
  if (!timezone) return "";
  const parts = (timezone ?? "").split("/");
  if (parts.length === 1) return parts[0] ?? "";
  return `${parts[parts.length - 1]} (${parts[0]})`;
};
