import {z} from "zod"

export const iconsSearchResponseSchema = z.object({
  icons: z.array(z.string()),
  total: z.number(),
  limit: z.number(),
  start: z.number(),
  collections: z.record(
    z.object({
      name: z.string(),
      total: z.number(),
      version: z.string(),
      author: z.object({
        name: z.string(),
        url: z.string().url()
      }),
      license: z.object({
        title: z.string(),
        spdx: z.string(),
        url: z.string().url()
      }),
      samples: z.array(z.string()),
      height: z.number(),
      displayHeight: z.number().optional(),
      category: z.string(),
      palette: z.boolean()
    })
  ),
  request: z.object({
    query: z.string(),
    limit: z.string()
  })
});
