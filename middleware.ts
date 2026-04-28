import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Admin only routes
    if (path.startsWith("/admin") && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // Role-based restrictions can be added here if certain dashboard pages are restricted
    // e.g., Pilot only pages
    const pilotOnlyRoutes = ["/planner", "/live", "/job-sheets"];
    if (pilotOnlyRoutes.some(route => path.startsWith(route)) && token?.role === "CLIENT") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // Client only pages
    const clientOnlyRoutes = ["/briefs/new"];
    if (clientOnlyRoutes.some(route => path.startsWith(route)) && token?.role === "PILOT") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/briefs/:path*",
    "/planner/:path*",
    "/live/:path*",
    "/media/:path*",
    "/job-sheets/:path*",
    "/reports/:path*",
    "/pilots/:path*",
    "/dispatch/:path*",
    "/payments/:path*",
    "/settings/:path*",
    "/admin/:path*",
  ],
};
