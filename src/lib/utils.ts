export const formatDate = (date: Date | number) => {
	return new Intl.DateTimeFormat("ru-RU", { dateStyle: "medium" }).format(date);
};

export const formatMoney = (amount: number, currency: string) =>
	new Intl.NumberFormat("ru-RU", {
		style: "currency",
		currency,
	}).format(amount);
	/*new Intl.NumberFormat("ru-RU", {
		style: "currency",
		currency,
	}).format(amount);*/

export const formatMoneyRange = (
	range: {
		start?: { amount: number; currency: string } | null;
		stop?: { amount: number; currency: string } | null;
	} | null,
) => {
	const { start, stop } = range || {};
	const startMoney = start && formatMoney(start.amount, start.currency);
	const stopMoney = stop && formatMoney(stop.amount, stop.currency);

	if (startMoney === stopMoney) {
		return startMoney;
	}

	return `${startMoney} - ${stopMoney}`;
};

export function getHrefForVariant({
	productSlug,
	variantId,
}: {
	productSlug: string;
	variantId?: string;
}): string {
	const pathname = `/products/${encodeURIComponent(productSlug)}`;

	if (!variantId) {
		return pathname;
	}

	const query = new URLSearchParams({ variant: variantId });
	return `${pathname}?${query.toString()}`;
}


export const getStorageAuthEventCookieName = (prefix?: string) =>
  [prefix, "saleor_storage_auth_change"].filter(Boolean).join("+");
export const getStorageAuthStateCookieName = (prefix?: string) =>
  [prefix, "saleor_auth_module_auth_state"].filter(Boolean).join("+");
export const getRefreshTokenCookieName = (prefix?: string) =>
  [prefix, "saleor_auth_module_refresh_token"].filter(Boolean).join("+");
export const getAccessTokenCookieName = (prefix?: string) =>
  [prefix, "saleor_auth_access_token"].filter(Boolean).join("+");

/**
 * This function assumes that the token is a JWT and gets the expiration date from it.
 * It silences all errors and returns undefined instead.
 */
export const tryGetExpFromJwt = (token: string, nowInSeconds = (Date.now() / 1000)): undefined | Date => {
  try {
    const parsedToken = JSON.parse(atob(token.split(".")[1] ?? ""));
    try {
      const refreshToken = (parsedToken as { oauth_refresh_token?: unknown }).oauth_refresh_token;
      if (refreshToken && typeof refreshToken === "string") {
        return tryGetExpFromJwt(refreshToken, nowInSeconds);
      }
    }
    catch { }
    try {
      const exp = (parsedToken as { exp?: unknown }).exp;
      if (exp && typeof exp === "number" && exp > nowInSeconds) {
        return new Date(exp * 1000);
      }
    } catch { }
  }
  catch { }
	return undefined;
};
