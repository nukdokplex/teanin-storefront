"use client";

import { useSaleorExternalAuth } from "@saleor/auth-sdk/react";
import { ExternalProvider } from "@saleor/auth-sdk";
import { Link } from "lucide-react";
import { Loader } from "@/ui/atoms/Loader";

const saleorApiUrl = process.env.NEXT_PUBLIC_SALEOR_API_URL!;
const storefrontUrl = process.env.NEXT_PUBLIC_STOREFRONT_URL!;

export const LoginButton = () => {
	const {
		authURL,
		loading: isLoadingExternalAuth,
		error: externalAuthError,
	} = useSaleorExternalAuth({
		saleorURL: saleorApiUrl,
		provider: ExternalProvider.OpenIDConnect,
		redirectURL: `${storefrontUrl}/api/auth/callback`,
	});

	if (isLoadingExternalAuth) {
		return <Loader />;
	}

	if (externalAuthError) {
		return <p>error</p>;
	}

	return (
		<a
			href={authURL}
		>
			Войти
		</a>
	);
};
