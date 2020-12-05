export class IGame {

    constructor(
      public id: string,
      public name: string,
      public imageUrl: string,
      public description: string,
      public bullets: string,
      public requirements: string,
      public youtubeTrailerUrl: string
    ) {  }
  
  }