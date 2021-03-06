import AbstractComponent from './abstract-component.js';

import {
  maybePluralize,
  formatDate,
  formatTime
} from '../utils/common.js';

import {
  MAX_DESCRIPTION_SYMBOLS
} from '../const.js';

const createButtonMarkup = (name, isActive = false) => {
  const buttonLabel = (name === `watchlist` ? `Add to ` : `Mark as `) + name;

  let className = name;

  switch (className) {
    case (`watchlist`):
      className = `add-to-` + name;
      break;
    case (`watched`):
      className = `mark-as-` + name;
      break;
  }

  return (
    `<button class="film-card__controls-item button film-card__controls-item--${className} ${isActive ? `film-card__controls-item--active` : ``}">${buttonLabel}</button>`
  );
};

const createMovieTemplate = (movie) => {
  const {
    title,
    rating,
    year,
    duration,
    genre,
    poster,
    description,
    comments,
    isWatchlist,
    isWatched,
    isFavorite,
  } = movie;

  const commentsCount = comments.length;

  const movieGenre = genre[0];

  const movieYear = formatDate(year, true);
  const movieDuration = formatTime(duration);

  const watchlistButton = createButtonMarkup(`watchlist`, isWatchlist);
  const watchedButton = createButtonMarkup(`watched`, isWatched);
  const favoriteButton = createButtonMarkup(`favorite`, isFavorite);

  const getMovieDescription = (descr) => {


    let visibleText = descr.slice(0, MAX_DESCRIPTION_SYMBOLS);

    if (descr.length > MAX_DESCRIPTION_SYMBOLS) {
      visibleText = `${visibleText}...`;
    } else {
      visibleText = descr;
    }

    return visibleText;
  };

  const commentsWord = maybePluralize(`comment`, comments);

  const cardMovieDescription = getMovieDescription(description);

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${movieYear}</span>
        <span class="film-card__duration">${movieDuration}</span>
        <span class="film-card__genre">${movieGenre}</span>
      </p>
      <img src="./${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${cardMovieDescription}</p>
      <a class="film-card__comments">${commentsCount} ${commentsWord}</a>
      <form class="film-card__controls">
        ${watchlistButton}
        ${watchedButton}
        ${favoriteButton}
      </form>
    </article>`
  );
};

export default class Movie extends AbstractComponent {
  constructor(movie) {
    super();
    this._movie = movie;
  }

  getTemplate() {
    return createMovieTemplate(this._movie);
  }

  setMovieCardClickHandler(handler) {
    const movieCardClickable = this.getElement().querySelectorAll(`.film-card__poster, .film-card__title, .film-card__comments`);

    movieCardClickable
      .forEach((element) => element.addEventListener(`click`, handler));
  }

  setWatchlistButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, handler);
  }

  setWatchedButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, handler);
  }

  setFavoritesButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, handler);
  }
}
