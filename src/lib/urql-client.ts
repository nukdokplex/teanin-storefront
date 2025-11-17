import { createSaleorAuthClient } from "@saleor/auth-sdk";
import { cacheExchange, createClient, fetchExchange } from "urql";
import { getServerAuthClient } from "@/app/config";

const saleorApiUrl = process.env.NEXT_PUBLIC_STOREFRONT_URL!;

export const saleorAuthClient = createSaleorAuthClient({
  saleorApiUrl,
});

export const makeUrqlClient = () => {
  const client = createClient({
    url: saleorApiUrl,
    fetch: (input, init) => saleorAuthClient.fetchWithAuth(input as NodeJS.fetch.RequestInfo, init),
    exchanges: [cacheExchange, fetchExchange]
  });
  return client;
}
