type BookingEvent =
  "booking_search" | "request_prepared" | "whatsapp_outbound_click" | "email_outbound_click";

// Observe intent only. Opening a messaging app is never a received lead or booking.
// No names, contact details, addresses or message content enter analytics.
export function trackBookingEvent(event: BookingEvent, service: "transfer" | "hourly") {
  if (typeof window === "undefined") return;
  const detail = { event, service };
  const analyticsWindow = window as Window & {
    dataLayer?: { push: (value: typeof detail) => unknown };
  };
  try {
    analyticsWindow.dataLayer?.push(detail);
    window.dispatchEvent(new CustomEvent("agadir:conversion", { detail }));
  } catch {
    // Analytics must never interrupt a booking request.
  }
}
