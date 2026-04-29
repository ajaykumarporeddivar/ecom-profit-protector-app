import {
  MOCK_COUPONS,
} from '@/lib/data';

export async function GET(): Promise<Response> {
  return Response.json(MOCK_COUPONS);
}

export async function POST(): Promise<Response> {
  const body = await request.json();
  return Response.json({
    ok: true,
    message: 'Demo mode — coupon data not persisted',
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