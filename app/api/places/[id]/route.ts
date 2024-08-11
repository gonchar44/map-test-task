import { NextRequest, NextResponse } from 'next/server'
import { deletePlace } from '@/app/api/places/actions'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'

export const DELETE = async (
  req: NextRequest,
  { params }: { params: Params }
) => {
  try {
    const { id } = params
    if (!id) {
      return NextResponse.json(
        { error: 'Place ID is required.' },
        { status: 400 }
      )
    }

    await deletePlace(id)

    return NextResponse.json({ message: 'Place was deleted successfully!' })
  } catch (error) {
    return NextResponse.json(
      { error: 'The place deleting was failed' },
      { status: 500 }
    )
  }
}
