import {
  MOCK_CARTS,
  DEMO_CART,
} from '@/lib/data';

export async function GET(): Promise<Response> {
  return Response.json(MOCK_CARTS);
}

export async function GET_DEMO_CART(): Promise<Response> {
  return Response.json(DEMO_CART);
}

export async function POST(): Promise<Response> {
  const body = await request.json();
  return Response.json({
    ok: true,
    message: 'Demo mode — cart data not persisted',
    received: body,
  });
}

export async function OPTIONS(): Promise<Response> {
  return Response.status(200)
    .headers({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-Custom-Header',
      'Content-Length': 0,
    })
    .end();
}