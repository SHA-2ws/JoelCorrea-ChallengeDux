// uso de las server functions para evitar exponer la api en el cliente
"use server"

import { User, UserStatus } from "@/types/user";

const SECTOR = 2000;

const API_URL = "https://staging.duxsoftware.com.ar/api/personal";

export const getUsersWithPagination = async (page: number = 0, rows: number = 5, search: string = "", status: UserStatus | null = null) => {
  const base_url = new URL(API_URL);
  base_url.searchParams.set("sector", SECTOR.toString());
  if (search) {
    base_url.searchParams.set("usuario_like", search);
    base_url.searchParams.set("_sort", "usuario");
    base_url.searchParams.set("_order", "asc");
  }
  if (status) {
    base_url.searchParams.set("estado", status);
  }
  base_url.searchParams.set("_limit", rows.toString());
  base_url.searchParams.set("_page", page.toString());
  const response = await fetch(base_url.toString());
  const data = await response.json();
  return {
    data: data,
    total: response.headers.get("X-Total-Count")
  }
};

export const addUser = async (user: User) => {
  const response = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json"
    }
  });
  if (!response.ok) {
    throw new Error("Failed to add user");
  }
  return response.json();
}

export const editUser = async (user: User, id: number) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (!response.ok) {
    throw new Error("Failed to edit user");
  }
  return response.json();
}

export const deleteUser = async (id: number) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });
  if (!response.ok) {
    throw new Error("Failed to delete user");
  }
  return response.json();
} 


