"use client";

import { signIn } from "next-auth/react";

export const loginClick = async () => {
  await signIn();
};
