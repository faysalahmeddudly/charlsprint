import { apiClient } from "./api-client"
import type { ContactInput } from "@/lib/validations/contact"

export const contactService = {
  send: (input: ContactInput) => apiClient.post<{ received: boolean }>("/contact", input),
}
