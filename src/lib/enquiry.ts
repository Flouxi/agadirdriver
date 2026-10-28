export function validateEnquiryContact(contact: { name: string; email: string; phone: string }) {
  if (contact.name.trim().length < 2) return "name";
  if (contact.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email.trim()))
    return "email";
  if (contact.phone.trim()) {
    const digits = contact.phone.replace(/\D/g, "");
    if (!/^\+?[\d\s().-]+$/.test(contact.phone.trim()) || digits.length < 8 || digits.length > 15)
      return "phone";
  }
  return null;
}

export function enquiryEmailHref(message: string) {
  return `mailto:support@agadirdriver.com?subject=${encodeURIComponent("Agadir Driver — Booking request")}&body=${encodeURIComponent(message)}`;
}
