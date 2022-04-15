import { NextRequest, NextFetchEvent, NextResponse } from "next/server";

//los middlewares se ejecutan del lado del servidor
// este solo le esta afectado a index.ts porque esta en esa carpeta

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  // if(req.page.name === "/api/entries") return NextResponse.next()

  const id = req.page.params?.id || "";

  const checkMongoIDRegExp = new RegExp("^[0-9a-fA-F]{24}$");

  if (!checkMongoIDRegExp.test(id)) {
    return new Response(JSON.stringify({ message: "Not valid ID" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return NextResponse.next();
}
