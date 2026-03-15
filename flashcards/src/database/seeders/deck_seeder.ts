import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Category from '#models/category'
import Deck from '#models/deck'
import Card from '#models/card'

export default class MainSeeder extends BaseSeeder {
  async run() {
    // 1. Define and create categories first
    const categoriesData = [
      { name: 'Géographie' }, // Will be ID 1
      { name: 'Langues' }, // Will be ID 2
      { name: 'Histoire' }, // Will be ID 3
      { name: 'Sciences' }, // Will be ID 4
    ]

    const categories = await Category.createMany(categoriesData)

    // 2. Define your decks with a reference to the category index or name
    const decksData = [
      {
        name: 'Capitales du monde',
        description: 'Testez vos connaissances sur les capitales des pays du monde entier',
        category_id: categories[0].id, // Links to Géographie
        cards: [
          { front: 'Quelle est la capitale du Japon ?', back: 'Tokyo' },
          { front: 'Quelle est la capitale du Brésil ?', back: 'Brasília' },
          { front: "Quelle est la capitale de l'Australie ?", back: 'Canberra' },
          { front: 'Quelle est la capitale du Canada ?', back: 'Ottawa' },
          { front: "Quelle est la capitale de l'Argentine ?", back: 'Buenos Aires' },
        ],
      },
      {
        name: 'Vocabulaire anglais',
        description: 'Apprenez du vocabulaire anglais courant',
        category_id: categories[1].id, // Links to Langues
        cards: [
          { front: 'butterfly', back: 'papillon' },
          { front: 'umbrella', back: 'parapluie' },
          { front: 'strawberry', back: 'fraise' },
          { front: 'lighthouse', back: 'phare' },
          { front: 'rainbow', back: 'arc-en-ciel' },
          { front: 'thunder', back: 'tonnerre' },
        ],
      },
      {
        name: 'Histoire de France',
        description: "Les grandes dates et événements de l'histoire de France",
        category_id: categories[2].id, // Links to Histoire
        cards: [
          { front: 'En quelle année a eu lieu la Révolution française ?', back: '1789' },
          { front: 'Qui était le premier consul de France en 1799 ?', back: 'Napoléon Bonaparte' },
          { front: 'En quelle année la France a-t-elle adopté la Ve République ?', back: '1958' },
          { front: 'Quel roi a construit le château de Versailles ?', back: 'Louis XIV' },
          { front: 'En quelle année la Tour Eiffel a-t-elle été construite ?', back: '1889' },
        ],
      },
      {
        name: 'Mathématiques - Formules',
        description: 'Les formules mathématiques essentielles',
        category_id: categories[3].id, // Links to Sciences
        cards: [
          { front: "Formule de l'aire d'un cercle", back: 'A = π × r²' },
          { front: "Formule du périmètre d'un cercle", back: 'P = 2 × π × r' },
          { front: 'Théorème de Pythagore', back: 'a² + b² = c²' },
          { front: "Formule de l'aire d'un triangle", back: 'A = (base × hauteur) / 2' },
          { front: 'Formule quadratique', back: 'x = (-b ± √(b²-4ac)) / 2a' },
        ],
      },
      {
        name: 'Programmation Web',
        description: 'Concepts clés du développement web',
        category_id: categories[3].id, // Links to Sciences
        cards: [
          { front: 'Que signifie HTML ?', back: 'HyperText Markup Language' },
          { front: 'Que signifie CSS ?', back: 'Cascading Style Sheets' },
          { front: 'Que signifie API ?', back: 'Application Programming Interface' },
        ],
      },
    ]

    // 3. Loop through decks to create them and their associated cards
    for (const deckData of decksData) {
      const deck = await Deck.create({
        name: deckData.name,
        description: deckData.description,
        categoryId: deckData.category_id, // Ensure your Deck model has categoryId defined
      })

      await Card.createMany(
        deckData.cards.map((card) => ({
          ...card,
          deckId: deck.id,
        }))
      )
    }
  }
}
