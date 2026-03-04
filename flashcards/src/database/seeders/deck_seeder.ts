import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Deck from '#models/deck'
import Card from '#models/card'

export default class DeckSeeder extends BaseSeeder {
  async run() {
    const decks = [
      {
        name: 'Capitales du monde',
        description: 'Testez vos connaissances sur les capitales des pays du monde entier',
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
        cards: [
          { front: 'Que signifie HTML ?', back: 'HyperText Markup Language' },
          { front: 'Que signifie CSS ?', back: 'Cascading Style Sheets' },
          { front: 'Que signifie API ?', back: 'Application Programming Interface' },
          {
            front: "Qu'est-ce qu'une requête GET ?",
            back: 'Une requête HTTP pour récupérer des données depuis un serveur',
          },
          {
            front: "Qu'est-ce qu'une requête POST ?",
            back: 'Une requête HTTP pour envoyer des données à un serveur',
          },
          {
            front: 'Que signifie ORM ?',
            back: 'Object-Relational Mapping - permet de manipuler une BDD avec des objets',
          },
        ],
      },
    ]

    for (const deckData of decks) {
      const deck = await Deck.create({
        name: deckData.name,
        description: deckData.description,
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
