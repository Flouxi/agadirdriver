import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
export type PassengerDraft = {
  name: string;
  email: string;
  phone: string;
  flight: string;
  notes: string;
};
const DraftContext = createContext<
  [PassengerDraft, Dispatch<SetStateAction<PassengerDraft>>] | null
>(null);
// Kept only in this React tree. No contact data is written to URLs, browser storage or the server.
export function PassengerDraftProvider({ children }: { children: ReactNode }) {
  const state = useState<PassengerDraft>({ name: "", email: "", phone: "", flight: "", notes: "" });
  return <DraftContext.Provider value={state}>{children}</DraftContext.Provider>;
}
export function usePassengerDraft() {
  const state = useContext(DraftContext);
  if (!state) throw new Error("PassengerDraftProvider is required");
  return state;
}
