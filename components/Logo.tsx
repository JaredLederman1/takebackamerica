import Image from "next/image";
import Link from "next/link";
import { assetPath } from "@/lib/paths";

export default function Logo({ reversed = false }: { reversed?: boolean }) {
  return (
    <Link href="/" className={`logo brand-logo ${reversed ? "brand-logo-reversed" : ""}`} aria-label="Take Back America home">
      <Image
        src={assetPath(reversed ? "/brand/logo-reversed.png" : "/brand/logo-horizontal.png")}
        alt="Take Back America — A Stronger Tomorrow"
        width={reversed ? 1600 : 1200}
        height={reversed ? 854 : 227}
        sizes={reversed ? "200px" : "(max-width: 380px) 155px, (max-width: 600px) 190px, 300px"}
      />
    </Link>
  );
}
