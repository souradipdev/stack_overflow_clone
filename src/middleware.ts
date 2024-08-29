import {NextRequest, NextResponse} from "next/server";
import getOrCreateDB from "@/models/server/dbSetup";
import getOrCreateStorage from "@/models/server/storageSetup";

let isDbSetupComplete: boolean = false;
let isStorageSetupComplete: boolean = false;


export default async function middleware(request: NextRequest) {

  try {
    if (!isDbSetupComplete) {
      isDbSetupComplete = await getOrCreateStorage();
    }
    if (!isStorageSetupComplete) {
      isStorageSetupComplete = await getOrCreateDB();
    }

    // console.log("Middleware invoked");
    return NextResponse.next();
  } catch (error) {
    console.log("Middleware error: ", error);
  }
}


export const config = {
  /* match all request paths except for the ones that starts with:
  - api
  - _next/static
  - _next/image
  - favicon.com

  */
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};