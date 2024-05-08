import {NextResponse, NextRequest} from "next/server";
import { cookies } from 'next/headers'

const publicRoutes = ['/login', '/']


export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const rootPathname = pathname === "/";

    const isProtectedRoute = pathname.startsWith('/control');
    const isPublicRoute = publicRoutes.includes(pathname)

    const cookie = cookies().get('user_session')?.value


    if (rootPathname) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (isProtectedRoute && !cookie){
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (
        isPublicRoute &&
        cookie &&
        !pathname.startsWith('/control')
      ) {
        return NextResponse.redirect(new URL('/control', request.url))
      }
     
      return NextResponse.next()
    }

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
