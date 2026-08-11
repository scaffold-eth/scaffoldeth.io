import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { SITE_URL } from "~~/utils/site";

type MetaHeaderProps = {
  title?: string;
  description?: string;
  image?: string;
  twitterCard?: string;
  children?: React.ReactNode;
};

// The frame endpoint is served by whichever deployment renders the page.
const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/` : "/";

export const MetaHeader = ({
  title = "Scaffold-ETH 2 - Open source toolkit to build dApps on Ethereum",
  description = "An open-source, up-to-date toolkit for building decentralized applications (dapps) on the Ethereum blockchain. It's designed to make it easier for developers to create and deploy smart contracts and build user interfaces that interact with those contracts.",
  image = "og-image.png",
  twitterCard = "summary_large_image",
  children,
}: MetaHeaderProps) => {
  const { asPath } = useRouter();
  // Social images need an absolute URL that stays valid across deploys.
  const imageUrl = `${SITE_URL}/${image}`;
  const twitterImageUrl = `${SITE_URL}/twitterThumbnail.png`;
  // Query strings and hashes are dropped so each page has one canonical address.
  const canonicalUrl = SITE_URL + asPath.split(/[?#]/)[0];

  return (
    <Head>
      {title && (
        <>
          <title>{title}</title>
          <meta property="og:title" content={title} />
          <meta name="twitter:title" content={title} />
        </>
      )}
      {description && (
        <>
          <meta name="description" content={description} />
          <meta property="og:description" content={description} />
          <meta name="twitter:description" content={description} />
        </>
      )}
      {image && (
        <>
          <meta property="og:image" content={imageUrl} />
          <meta name="twitter:image" content={twitterImageUrl} />

          <meta property="fc:frame" content="vNext" />
          <meta property="fc:frame:image" content={imageUrl} />

          <meta property="fc:frame:button:1" content="🛠️ GitHub" />
          <meta property="fc:frame:button:1:action" content="link" />
          <meta property="fc:frame:button:1:target" content="https://github.com/scaffold-eth/scaffold-eth-2" />

          <meta property="fc:frame:button:2" content="📃 Docs" />
          <meta property="fc:frame:button:2:action" content="link" />
          <meta property="fc:frame:button:2:target" content="https://docs.scaffoldeth.io/" />

          <meta property="fc:frame:button:3" content="Features →" />
          <meta property="fc:frame:post_url" content={`${baseUrl}api?id=1`} />
        </>
      )}
      {twitterCard && <meta name="twitter:card" content={twitterCard} />}
      <link rel="canonical" href={canonicalUrl} />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
      {children}
    </Head>
  );
};
