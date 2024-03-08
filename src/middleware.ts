import {NextResponse, NextRequest} from "next/server";

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const rootPathname = pathname === "/";

    if (rootPathname) {
        return NextResponse.redirect(new URL("/control", request.url));
    }
}
export const config = {
    matcher: ["/"],
};
