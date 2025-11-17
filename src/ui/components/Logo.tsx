"use client";

import { usePathname } from "next/navigation";
import { LinkWithChannel } from "../atoms/LinkWithChannel";

const companyName = "Теанин";

export const Logo = () => {
	const pathname = usePathname();

	if (pathname === "/") {
		return (
      //<h1 className="flex items-center font-bold" aria-label="homepage">
			//	{companyName}
			//</h1>
      <img className="flex items-center font-bold" aria-label="homepage" src="/logo-literal.png"/>
		);
	}
	return (
		<div className="flex items-center font-bold">
      {/*<LinkWithChannel aria-label="homepage" href="/">
			 {companyName}
			</LinkWithChannel>*/}
      <img className="h-5" aria-label="homepage" src="/logo-literal.png"/>
		</div>
	);
};
