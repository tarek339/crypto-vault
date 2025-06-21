"use server";

import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

/**
 * In the above code, we have defined two arrays authPages and unAuthPages to list the paths
  that require authentication and do not require authentication, respectively.
  We have also defined a middleware function that checks for the presence of a JWT token in the cookie and verifies it.
  If the token is valid, it continues the request; otherwise, it redirects to the login page.
  We have also defined a  config  object that specifies the paths where the middleware should be applied.
  Now, let’s create a new page  /balance/[userId].tsx  that will display the balance of the authenticated user.
 */

const authPages = [
  "/profile",
  "/balance",
  "/deposit",
  "/payout",
  "/transactions",
];
const unAuthPages = ["/", "/authentication"];

export const middleware = async (req: NextRequest) => {
  const cookie = await cookies();
  const token = cookie.get("token")?.value;

  // Check if the request is for an authenticated page
  const isAuthPage = authPages.some((page) =>
    req.nextUrl.pathname.startsWith(page),
  );
  const isUnAuthPage = unAuthPages.includes(req.nextUrl.pathname);

  if (token) {
    try {
      // Verify the JWT token
      const { payload } = await jwtVerify(
        token ?? "",
        new TextEncoder().encode(process.env.SECRET_TOKEN ?? ""),
      );
      const tokenData = payload as { userId: string };

      // If authenticated and trying to access an unauth page, redirect to the home page
      if (isUnAuthPage) {
        return NextResponse.redirect(
          new URL(`/balance/${tokenData.userId}`, req.url),
        );
      }

      // If authenticated and accessing an auth page, continue
      return NextResponse.next();
    } catch (error) {
      // If token verification fails, redirect to the login page and delete the token
      console.error("JWT verification failed:", (error as Error).message);
      cookie.delete("token");
      return NextResponse.redirect(new URL("/authentication", req.url));
    }
  } else {
    // If no token and trying to access an auth page, redirect to the login page
    if (isAuthPage) {
      return NextResponse.redirect(new URL("/authentication", req.url));
    }

    // If no token and accessing an unauth page, continue
    return NextResponse.next();
  }
};

// Export config to apply middleware only on specified paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"], // Apply to defined pages
};
