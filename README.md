# Animox :japanese_goblin:

Animox is a website built using Next.js, TypeScript, Tailwind CSS, MUI React, Headless UI, and MongoDB. This platform allows users to search for their favorite anime, manga, novels, and manhwa, filter by score, genre, year, and source, and add their reviews, watchlists, and ratings.

## Features

- **Search**: Find your favorite anime, manga, novel, and manhwa.
- **Filter**: Filter results by score (1 to 9), genre, year, and source (manga, novel, original, etc.).
- **User Reviews**: Add and view reviews for different titles.
- **Watchlist**: Add titles to your watchlist to keep track of what you want to watch.
- **Ratings**: Rate titles and see average ratings from other users.

## Tech Stack

- **Frontend**:
  - [Next.js]: React framework for server-side rendering and generating static websites.
  - [TypeScript]: Strongly typed programming language that builds on JavaScript.
  - [Tailwind CSS]: Utility-first CSS framework.
  - [MUI React]: React UI library for building interactive interfaces.
  - [Headless UI]: Completely unstyled, fully accessible UI components, designed to integrate beautifully with Tailwind CSS.
- **Backend**:
  - [MongoDB]: NoSQL database for storing user data, reviews, watchlists, and ratings.

## Getting Started

### Prerequisites

- Node.js (v14.x or later)
- npm (v6.x or later) or yarn (v1.x or later)
- MongoDB (v4.x or later)

## Project Structure

```
/animes-website
|-- /components
|   |-- /Anime         # Components related to anime page
|   |-- /Manga         # Components related to manga page
|   |-- /Home          # Components related to home page
|   |-- /Members       # Components related to members page
|   |-- /Profile       # Components related to profile page
|   |-- /Shared        # Components related to all pages
|-- /pages             # Next.js pages
|   |-- /Anime         # anime page
|       |-- /[id]         # anime details page
|   |-- /Manga         # manga page
|       |-- /[id]         # manga details page
|   |-- /Home          # home page
|   |-- /Members       # members page
|   |-- /Profile       # profile page
|   |-- /Home          # home page
|   |-- /Members       # members page
|   |-- /Profile       # profile page
|-- /utils             # Utility functions
|-- /models            # MongoDB models
|-- next.config.js     # Next.js configuration
|-- tailwind.config.js # Tailwind CSS configuration
|-- tsconfig.json      # TypeScript configuration
|-- package.json       # Project dependencies and scripts
```

## Vercel

Visit the live of the Animox Website: <a href="https://Jalal-Amourgha.github.io/Spotify-Clone/" target="_blank">Here</a>

## Usage

### Search

Use the search bar to find your favorite anime, manga, novel, or manhwa by typing keywords.

### Filters

Apply filters to narrow down your search results by score, genre, year, and source.

### Reviews

Add reviews to titles and read reviews from other users.

### Watchlist

Add titles to your watchlist to keep track of what you want to watch.

### Ratings

Rate titles on a scale of 1 to 9 and view average ratings from the community.

## Screnshots

<div>
  <img src="https://media.discordapp.net/attachments/1260908645395337246/1260908843903225936/a1.JPG?ex=6691085e&is=668fb6de&hm=1c8f9d9e9ca4617933d77fbca754e43521152c8b74f301bd294675be58bc6293&=&format=webp&width=735&height=418" width="333" />
  <img src="https://media.discordapp.net/attachments/1260908645395337246/1260908844163530865/a2.JPG?ex=6691085f&is=668fb6df&hm=5a440f6a8b6bba26a864d6697d6e6df4532b93146a2432abb6b4ab82a525d862&=&format=webp&width=734&height=418" width="333" />
  <img src="https://media.discordapp.net/attachments/1260908645395337246/1260908844742082700/a3.JPG?ex=6691085f&is=668fb6df&hm=451d9048f4c87289bea70e70d66fda9e5c16fb700650800b430cbf2eb8900a00&=&format=webp&width=734&height=418" width="333" />
  <img src="https://media.discordapp.net/attachments/1260908645395337246/1260908845010784266/a4.JPG?ex=6691085f&is=668fb6df&hm=70779e157210e78b3b12d7e26c912064a193487a29f672ed003846727574b0a2&=&format=webp&width=734&height=418" width="333" />
  <img src="https://media.discordapp.net/attachments/1260908645395337246/1260908845379747911/a5.JPG?ex=6691085f&is=668fb6df&hm=393bbb9d9eb2ee6af08213a2a3272101696f4c0f96add293e13d4473829be3e0&=&format=webp&width=735&height=418" width="333" />
  <img src="https://media.discordapp.net/attachments/1260908645395337246/1260908845660770335/a6.JPG?ex=6691085f&is=668fb6df&hm=54067a850bf12e8f757e21545a7b0097bdc19fdaa86f3d943090777aed880b02&=&format=webp&width=735&height=418" width="333" />
  <img src="https://media.discordapp.net/attachments/1260908645395337246/1260908846009024532/a7.JPG?ex=6691085f&is=668fb6df&hm=0975906a6b575f5633048b81a91c87e10e755ff067f1eb19f55f165a02f50f2c&=&format=webp&width=735&height=418" width="333" />
  <img src="https://media.discordapp.net/attachments/1260908645395337246/1260908843613814805/a8.JPG?ex=6691085e&is=668fb6de&hm=aa0676a99dc1744c50328c48d1b7818e2ccc0fdcd7e94db7dafd030bd87548ae&=&format=webp&width=735&height=418" width="333" />
  <img src="https://media.discordapp.net/attachments/1260908645395337246/1260908869526229085/a9.JPG?ex=66910865&is=668fb6e5&hm=9531865d01f12346bc5534c97dbb050380aa9ee3d77805112f688145a0eca109&=&format=webp&width=735&height=418" width="333" />
  
</div>
