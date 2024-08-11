import { z } from 'zod'

export enum PlaceValidationValues {
  name_min = 3,
  formatted_address_min = 1
}

export const messages = {
  minCharsLength: ({ length }: { length: number }) =>
    `Minimum number of characters is ${length}`
}

export const PlaceFormSchema = z.object({
  id: z.string(),
  name: z.string().min(PlaceValidationValues.name_min, {
    message: messages.minCharsLength({ length: PlaceValidationValues.name_min })
  }),
  formatted_address: z
    .string()
    .min(PlaceValidationValues.formatted_address_min, {
      message: messages.minCharsLength({
        length: PlaceValidationValues.formatted_address_min
      })
    }),
  lat: z.number(),
  lng: z.number()
})
