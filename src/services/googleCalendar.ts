// Replace your calendar module with this version.
// It returns [] if env vars are missing OR the API fails OR no events are found.

const CALENDAR_ID = (import.meta.env.VITE_GOOGLE_CALENDAR_ID || "").trim();
const API_KEY = (import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY || "").trim();

export interface CalendarEvent {
  day: string;
  date: string;
  start: string;
  end: string;
  summary?: string;
}

function formatTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "America/New_York",
  });
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
    timeZone: "America/New_York",
  });
}

function getDayOfWeek(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    timeZone: "America/New_York",
  });
}

export async function fetchCalendarEvents(): Promise<CalendarEvent[]> {
  // If env vars aren't set, return nothing (and log why)
  if (!API_KEY || !CALENDAR_ID) {
    console.warn(
      "Calendar fetch skipped: missing VITE_GOOGLE_CALENDAR_API_KEY and/or VITE_GOOGLE_CALENDAR_ID"
    );
    return [];
  }

  try {
    const now = new Date();
    const weekFromNow = new Date();
    weekFromNow.setDate(now.getDate() + 7);

    const timeMin = now.toISOString();
    const timeMax = weekFromNow.toISOString();

    const url =
      `https://www.googleapis.com/calendar/v3/calendars/` +
      `${encodeURIComponent(CALENDAR_ID)}/events` +
      `?key=${encodeURIComponent(API_KEY)}` +
      `&timeMin=${encodeURIComponent(timeMin)}` +
      `&timeMax=${encodeURIComponent(timeMax)}` +
      `&singleEvents=true&orderBy=startTime&maxResults=50`;

    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = `API error: ${response.status} ${response.statusText}`;

      try {
        const errorData = JSON.parse(errorText);
        if (errorData?.error?.message) errorMessage = errorData.error.message;
      } catch {
        // ignore parse errors
      }

      console.error("Google Calendar API Error:", errorMessage);
      return [];
    }

    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      console.warn("No calendar events found.");
      return [];
    }

    return data.items.map((item: any) => {
      const startDateTime = item.start.dateTime || item.start.date;
      const endDateTime = item.end.dateTime || item.end.date;

      return {
        day: getDayOfWeek(startDateTime),
        date: formatDate(startDateTime),
        start: formatTime(startDateTime),
        end: formatTime(endDateTime),
        summary: item.summary,
      };
    });
  } catch (error) {
    console.error("Error fetching calendar events:", error);
    return [];
  }
}
