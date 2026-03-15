import vine from '@vinejs/vine'
const cardValidator = vine.compile(
  vine.object({
    front: vine.string().trim().minLength(1),
    back: vine.string().trim().minLength(1),
  })
)
export { cardValidator }
