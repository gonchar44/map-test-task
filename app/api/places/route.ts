import { NextRequest, NextResponse } from 'next/server'
import { createPlace } from '@/app/api/places/actions'
import { Place } from '@/types'
import { sql } from '@vercel/postgres'

export const GET = async () => {
  try {
    const data = await sql<Place>`
      SELECT id, name, formatted_address, lat, lng
      FROM places
      ORDER BY created_at DESC
    `

    return NextResponse.json({ data: data.rows })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch places data.' },
      { status: 500 }
    )
  }
}

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData()
    await createPlace(formData)

    return NextResponse.json({ message: 'Place created successfully!' })
  } catch (error) {
    return NextResponse.json(
      { error: "The place wasn't saved to history. Please try again later." },
      { status: 500 }
    )
  }
}
