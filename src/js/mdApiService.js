import axios from 'axios';

export default class ImageApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  async fetchImages() {
    try {
      const response = await axios.get(
        'https://api.themoviedb.org/3/trending/movie/week?api_key=38f6f2c88436f6a6fb5d137cfc7b2688'
      );
      this.page += 1;
      // console.log(response.data);
      return response.data;
    } catch (error) {}
  }

  async fetchGenres() {
    try {
      const response = await axios.get(
        'https://api.themoviedb.org/3/genre/movie/list?api_key=38f6f2c88436f6a6fb5d137cfc7b2688&language=en-US'
      );
      console.log(response.data);
      // return response.genres;
    } catch (error) {}
  }

  insertGenresToMovieObj() {
    return this.fetchImages().then(data => {
      return this.fetchGenres().then(genresList => {
        return data.map(movie => ({
          ...movie,
          release_date: movie.release_date.split('-')[0],
          genres: movie.genre_ids
            .map(id => genresList.filter(el => el.id === id))
            .flat(),
        }));
      });
    });
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

// const BASE_URL = `https://api.themoviedb.org/3`;
// const KEY = `d91911ebb88751cf9e5c4b8fdf4412c9`;
// export default class NewApiService {
//   constructor() {
//     this.searchQuery = '';
//     this.page = 1;
//   }
//   fetchPopularArticles() {
//     const url = `${BASE_URL}/movie/popular?api_key=${KEY}&language=en-US&page=${this.page}`;
//     return fetch(url)
//       .then(response => response.json())
//       .then(({ results }) => {
//         return results;
//       });
//   }
//   fetchSearchArticles() {
//     const url = `${BASE_URL}/search/movie?api_key=${KEY}&language=en-US&page=${this.page}&query=${this.searchQuery}`;
//     return fetch(url)
//       .then(response => response.json())
//       .then(({ results }) => {
//         return results;
//       });
//   }
//   fetchPopularArticlesPages() {
//     const url = `${BASE_URL}/movie/popular?api_key=${KEY}&language=en-US&page=${this.page}`;
//     return fetch(url).then(response => response.json());
//   }
//   fetchSearchArticlesPages() {
//     const url = `${BASE_URL}/search/movie?api_key=${KEY}&language=en-US&page=${this.page}&query=${this.searchQuery}`;
//     return fetch(url).then(response => response.json());
//   }
//   fetchGenres() {
//     const url = `${BASE_URL}/genre/movie/list?api_key=${KEY}`;
//     return fetch(url)
//       .then(response => response.json())
//       .then(data => {
//         return data.genres;
//       });
//   }
//   insertGenresToMovieObj() {
//     return this.fetchPopularArticles().then(data => {
//       return this.fetchGenres().then(genresList => {
//         return data.map(movie => ({
//           ...movie,
//           release_date: movie.release_date.split('-')[0],
//           genres: movie.genre_ids
//             .map(id => genresList.filter(el => el.id === id))
//             .flat(),
//         }));
//       });
//     });
//   }
//   insertGenresToSearchObj() {
//     return this.fetchSearchArticles().then(data => {
//       return this.fetchGenres().then(genresList => {
//         let release_date;
//         return data.map(movie => ({
//           ...movie,
//           release_date: movie.release_date
//             ? movie.release_date.split('-')[0]
//             : 'n/a',
//           genres: movie.genre_ids
//             ? movie.genre_ids
//                 .map(id => genresList.filter(el => el.id === id))
//                 .flat()
//             : 'n/a',
//         }));
//       });
//     });
//   }
//   get query() {
//     return this.searchQuery;
//   }
//   set query(newQuery) {
//     this.searchQuery = newQuery;
//   }
//   get pageNum() {
//     return this.page;
//   }
//   set pageNum(newPage) {
//     this.page = newPage;
//   }
// }
