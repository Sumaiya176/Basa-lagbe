import { Inputs } from "@/components/MyListing/EditListing";
import React from "react";

export interface IListing extends Inputs {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export type User = {
  _id: string;
  userName: string;
  email: string;
  role: string;
  provider: number;
  status: number;
};

export type Column<T> = {
  key: keyof T;
  header: string;
  className?: string;
  render?: (row: T) => React.ReactNode;
};

export type TSidebar = {
  id: number;
  icon: React.ReactNode;
  title: string;
  url: string;
};
