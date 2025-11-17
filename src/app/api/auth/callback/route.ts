import { NextRequest, NextResponse } from "next/server";
import { ExternalProvider, SaleorExternalAuth } from "@saleor/auth-sdk";
import { serialize } from "cookie";
import { getAccessTokenCookieName, getRefreshTokenCookieName, getStorageAuthStateCookieName } from "@/lib/utils";

const saleorApiUrl = process.env.NEXT_PUBLIC_SALEOR_API_URL;
if (!saleorApiUrl) throw new Error("NEXT_PUBLIC_SALEOR_URL is not set");

const externalAuth = new SaleorExternalAuth(saleorApiUrl, ExternalProvider.OpenIDConnect);

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const state = searchParams.get("state");
	const code = searchParams.get("code");

	if (!state || !code) {
		throw new Error("Missing state or code");
	}

	const { token, refreshToken } = await externalAuth.obtainAccessToken({ state, code });

	const response = NextResponse.redirect(new URL("/", request.nextUrl));

  response.cookies.set(getAccessTokenCookieName(saleorApiUrl), token, { secure: true, path: "/" });
  response.cookies.set(getRefreshTokenCookieName(saleorApiUrl), refreshToken, { secure: true, path: "/" });
  response.cookies.set(getStorageAuthStateCookieName(saleorApiUrl), "signedIn", { secure: true, path: "/" });

	return response;
}
