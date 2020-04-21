import AbstractComponent from './abstract-component.js';

const createMoviesListTemplate = () => {
  return (
    `<section class="films-list">
      <h2 class="films-list__title visually-hidden">
        All movies. Upcoming
      </h2>
      <div class="films-list__container"></div>
    </section>`
  );
};

export default class MoviesList extends AbstractComponent {
  getTemplate() {
    return createMoviesListTemplate();
  }
}
