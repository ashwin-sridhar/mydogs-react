// src/app/api/dogs/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import https from 'https'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log("Request obj"+request.body);  
  console.log("params id :"+params.id);
  const id = params.id
 const restUrl=process.env.NEXT_PUBLIC_FITBARK_REST;
  console.log("REST_URL"+restUrl);
  try {
    const apiRes = await fetch(`${restUrl}/dogs/${id}/activity`)
    const data = await apiRes.json()
    console.log("Data from node"+data);
    return NextResponse.json(data)
  } catch (error) {
    console.log("Error happened"+error)
    return NextResponse.json({ error: 'Error fetching dog data' }, { status: 500 })
  }
}