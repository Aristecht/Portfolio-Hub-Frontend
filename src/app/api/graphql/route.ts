import https from "node:https";
import http from "node:http";
import { type NextRequest, NextResponse } from "next/server";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ?? "http://localhost:4000/graphql";

const SKIP_HEADERS = new Set([
  "host",
  "connection",
  "transfer-encoding",
  "keep-alive",
]);

/** Strip Domain= and fix SameSite so the cookie is accepted for the frontend domain */
function rewriteSetCookie(value: string): string {
  return value
    .split(";")
    .map((part) => part.trim())
    .filter((part) => !part.toLowerCase().startsWith("domain="))
    .map((part) =>
      part.toLowerCase().startsWith("samesite=none") ? "SameSite=Lax" : part
    )
    .join("; ");
}

type ProxyResult = {
  status: number;
  headers: [string, string][];
  body: Uint8Array;
};

function makeRequest(
  url: string,
  method: string,
  headers: Record<string, string>,
  body: Buffer | undefined
): Promise<ProxyResult> {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const isHttps = parsed.protocol === "https:";
    const options = {
      hostname: parsed.hostname,
      port: parsed.port || (isHttps ? 443 : 80),
      path: parsed.pathname + parsed.search,
      method,
      headers,
      rejectUnauthorized: false,
    };

    const req = (isHttps ? https : http).request(options, (res) => {
      const chunks: Buffer[] = [];
      res.on("data", (chunk: Buffer) => chunks.push(chunk));
      res.on("end", () => {
        const responseHeaders: [string, string][] = [];
        for (const [k, v] of Object.entries(res.headers)) {
          if (Array.isArray(v)) {
            v.forEach((val) => responseHeaders.push([k, val]));
          } else if (v != null) {
            responseHeaders.push([k, v]);
          }
        }
        resolve({
          status: res.statusCode ?? 200,
          headers: responseHeaders,
          body: new Uint8Array(Buffer.concat(chunks)),
        });
      });
      res.on("error", reject);
    });

    req.on("error", reject);
    if (body && body.length > 0) req.write(body);
    req.end();
  });
}

async function proxyGraphQL(request: NextRequest) {
  const rawBody = Buffer.from(await request.arrayBuffer());

  const forwardHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => {
    if (!SKIP_HEADERS.has(key.toLowerCase())) {
      forwardHeaders[key] = value;
    }
  });

  const result = await makeRequest(
    BACKEND_URL,
    request.method,
    forwardHeaders,
    rawBody.length > 0 ? rawBody : undefined
  );

  const responseHeaders = new Headers();
  for (const [key, value] of result.headers) {
    if (key.toLowerCase() === "transfer-encoding") continue;
    if (key.toLowerCase() === "set-cookie") {
      responseHeaders.append(key, rewriteSetCookie(value));
    } else {
      responseHeaders.append(key, value);
    }
  }

  return new NextResponse(result.body as unknown as BodyInit, {
    status: result.status,
    headers: responseHeaders,
  });
}

export const POST = proxyGraphQL;
export const GET = proxyGraphQL;
