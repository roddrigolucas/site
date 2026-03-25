import { revalidatePath, revalidateTag } from 'next/cache';
import { NextResponse, type NextRequest } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

import { env } from '@/env.mjs';

export async function POST(req: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody<{
      _type: string;
      slug?: string | undefined;
    }>(req, env.SANITY_WEBHOOK_SECRET);

    if (!isValidSignature) {
      return new Response('Invalid Signature', { status: 401 });
    }

    if (!body?._type) {
      return new Response('Bad Request', { status: 400 });
    }

    revalidateTag(body._type);
    revalidatePath('/');
    revalidatePath('/en');
    revalidatePath('/es');
    revalidatePath('/pt-BR');

    //Contact
    revalidatePath('/contact');
    revalidatePath('/en/contact');
    revalidatePath('/es/contact');
    revalidatePath('/pt-BR/contact');

    return NextResponse.json({
      status: 200,
      revalidated: true,
      now: Date.now(),
      body,
    });
  } catch (error: any) {
    console.error(error);

    return new Response(error.message, { status: 500 });
  }
}
