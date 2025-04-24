"use client"
import { User, UserStatus } from "@/types/user";
import { createContext, Dispatch, SetStateAction, use, useState } from "react";


type LazyState = {
  first: number;
  rows: number;
  page: number;
  search: string;
  status: UserStatus | null;

}
type UserStoreContextType = {
  users: User[];
  setUsers: Dispatch<SetStateAction<User[]>>
  lazyState: LazyState;
  setLazyState: Dispatch<SetStateAction<LazyState>>
  total: number;
  setTotal: Dispatch<SetStateAction<number>>
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>
  modalType: "add" | "edit" | null;
  setModalType: Dispatch<SetStateAction<"add" | "edit" | null>>
  selectedUser: User | null
  setSelectedUser: Dispatch<SetStateAction<User | null>>
};

const UserStoreContext = createContext<UserStoreContextType | null>(null);



export const UserStoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [total, setTotal] = useState<number>(0);
  const [lazyState, setLazyState] = useState<LazyState>({
    first: 0,
    rows: 5,
    page: 1,
    search: "",
    status: null

  });
  const [modalType, setModalType] = useState<"add" | "edit" | null>(null);

  return (
    <UserStoreContext.Provider value={{ users, setUsers, lazyState, setLazyState, total, setTotal, isLoading, setIsLoading, modalType, setModalType, selectedUser, setSelectedUser  }}>
      {children}
    </UserStoreContext.Provider>

  );
};



export const useUserStore = () => {
  const context = use(UserStoreContext);
  if (!context) {
    throw new Error("useUserStore must be used within a UserStoreProvider");
  }
  return context;
};
