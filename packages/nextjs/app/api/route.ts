import { NextRequest, NextResponse } from "next/server";

const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : "http://localhost:3000";

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");

  const idAsNumber = id ? Number(id) : 1;

  const nextId = idAsNumber + 1;

  if (idAsNumber === 6) {
    return new NextResponse(`<!DOCTYPE html><html><head>
    <title>Scaffold-ETH 2 - Open source toolkit to build dApps on Ethereum</title>
    <meta property="og:image" content="${baseUrl}/frames/buidlguidl.jpg" />
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="${baseUrl}/frames/buidlguidl.jpg" />
    <meta property="fc:frame:button:1" content="🛠️ GitHub" />
    <meta property="fc:frame:button:1:action" content="link" />
    <meta property="fc:frame:button:1:target" content="https://github.com/scaffold-eth/scaffold-eth-2" />
    <meta property="fc:frame:button:2" content="📃 Docs" />
    <meta property="fc:frame:button:2:action" content="link" />
    <meta property="fc:frame:button:2:target" content="https://docs.scaffoldeth.io/" />
    <meta property="fc:frame:button:3" content="💬 Telegram" />
    <meta property="fc:frame:button:3:action" content="link" />
    <meta property="fc:frame:button:3:target" content="https://t.me/joinchat/KByvmRe5wkR-8F_zz6AjpA" />
    </head></html>`);
  }

  return new NextResponse(`<!DOCTYPE html><html><head>
    <title>Scaffold-ETH 2 - Open source toolkit to build dApps on Ethereum</title>
    <meta property="og:image" content="${baseUrl}/frames/frame-${id}.png" />
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="${baseUrl}/frames/frame-${id}.png" />
    <meta property="fc:frame:button:1" content="Next →" />
    <meta property="fc:frame:post_url" content="${baseUrl}/api?id=${nextId}" />
  </head></html>`);
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = "force-dynamic";
