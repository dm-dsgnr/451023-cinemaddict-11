import {
  createElement
} from '../utils.js';

const createCommentTemplate = (comment) => {
  const {
    text,
    author,
    date,
    time,
    avatar
  } = comment;

  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="${avatar}" width="55" height="55" alt="emoji-smile">
      </span>
      <div>
        <p class="film-details__comment-text">${text}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${date} ${time}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`
  );
};

export default class Comment {
  constructor(comment) {
    this._comment = comment;

    this._element = null;
  }

  getTemplate() {
    return createCommentTemplate(this._comment);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}