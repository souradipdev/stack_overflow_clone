import {NextRequest, NextResponse} from "next/server";
import getOrCreateDB from "@/models/server/dbSetup";
import getOrCreateStorage from "@/models/server/storageSetup";

let isDbSetupComplete = false;
let isStorageSetupComplete = false;


export default async function middleware(request: NextRequest) {

  try {
    if (!isDbSetupComplete) {
      await getOrCreateStorage();
      isDbSetupComplete = true;
    }
    if (!isStorageSetupComplete) {
      await getOrCreateDB();
      isStorageSetupComplete = true;
    }
    console.log("Middleware invoked");
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