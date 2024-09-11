// src/app/api/dogs/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log("Request obj"+request.body);
  console.log("params :"+params);
  const id = params.id
  console.log("URL"+process.env.NEXT_PUBLIC_FITBARK_REST);
  try {
    const apiRes = await fetch(`${process.env.NEXT_PUBLIC_FITBARK_REST}/dogs/${id}/activity`)
    const data = await apiRes.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching dog data' }, { status: 500 })
  }
}