import { create } from "zustand";

export interface userStateInterface {
  username: string | null;
  email: string | null;
  sessionToken: string | null;
  setUser: (username: string, email: string, sessionToken: string) => void;
}

const UserStore = create<userStateInterface>()((set) => ({
  username: null,
  email: null,
  sessionToken: null,
  setUser: (username: string, email: string, sessionToken: string) =>
    set({ username, email, sessionToken }),
}));

export default UserStore;
