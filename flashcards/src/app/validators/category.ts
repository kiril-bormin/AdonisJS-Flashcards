import vine from '@vinejs/vine'
const categoryValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3),
  })
)
export { categoryValidator }
