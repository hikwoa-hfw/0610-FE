"use client";

import { fromUnixTime, isAfter } from "date-fns";
import { jwtDecode } from "jwt-decode";
import { signOut, useSession } from "next-auth/react";
import { FC, PropsWithChildren, useEffect } from "react";

const TokenProvider: FC<PropsWithChildren> = ({ children }) => {
  const session = useSession();
  const accessToken = session.data?.user.accessToken;

  useEffect(() => {
    const checkTokenValidity = () => {
      if (accessToken) {
        try {
          const decodedToken = jwtDecode(accessToken);
          const tokenExpiry = fromUnixTime(decodedToken.exp!);

          if (isAfter(new Date(), tokenExpiry)) {
            signOut();
          }
        } catch (error) {
          signOut();
        }
      }
    };

    const interval = setInterval(checkTokenValidity, 15000);

    return () => clearInterval(interval);
  }, []);
  return <>{children}</>;
};

export default TokenProvider;
