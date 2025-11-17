import { Suspense } from "react";
import { LoginButton } from "./LoginButton";
import { executeGraphQL } from "@/lib/graphql";
import { CurrentUserDocument } from "@/gql/graphql";
import { Loader } from "@/ui/atoms/Loader";
import { getServerAuthClient } from "@/app/config";

const saleorApiUrl = process.env.NEXT_PUBLIC_SALEOR_API_URL!;
const storefrontUrl = process.env.NEXT_PUBLIC_STOREFRONT_URL!;
 
export default async function LoginPage() {
	const { me: user } = await executeGraphQL(CurrentUserDocument, {
		cache: "no-cache",
    withAuth: true
	});

  const authClient = await getServerAuthClient();
  if (!user) {
    return (
      <Suspense fallback={<Loader />}>
        <section className="mx-auto max-w-7xl p-8">
          <LoginButton/>
        </section>
      </Suspense>
    );
  }

  return (
    <p>penis</p>
  );
}
