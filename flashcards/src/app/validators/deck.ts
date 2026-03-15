import vine from '@vinejs/vine'
const deckValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2),
    description: vine.string().trim(),
    categoryId: vine.number(),
  })
)
export { deckValidator }
