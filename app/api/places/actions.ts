'use server'

import { v4 as uuidv4 } from 'uuid'
import { sql } from '@vercel/postgres'
import { PlaceFormSchema } from '@/app/api/places/validationSchema'

const CreatePlace = PlaceFormSchema.omit({ id: true })

export const createPlace = async (formData: FormData) => {
  const validatedFiles = CreatePlace.safeParse({
    name: formData.get('name'),
    formatted_address: formData.get('formatted_address'),
    lng: Number(formData.get('lng')),
    lat: Number(formData.get('lat'))
  })

  if (!validatedFiles.success) {
    return {
      errors: validatedFiles.error.flatten().fieldErrors,
      message: 'Something went wrong'
    }
  }

  const placeId = uuidv4()
  const { name, formatted_address, lng, lat } = validatedFiles.data

  try {
    await sql`
      INSERT INTO places (id, name, formatted_address, lat, lng)
      VALUES (${placeId}, ${name}, ${formatted_address}, ${lng}, ${lat})
    `
  } catch (error) {
    throw new Error(
      `The place wasn't saved to history. Please try again later.`
    )
  }
}

export const deletePlace = async (id: string) => {
  try {
    await sql`DELETE FROM places WHERE id = ${id}`
  } catch (error) {
    throw new Error('The place deleting was failed')
  }
}
