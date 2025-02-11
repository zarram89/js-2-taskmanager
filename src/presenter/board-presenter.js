import LoadMoreButtonView from '../view/load-more-button-view.js';

export default class BoardPresenter {
  #boardContainer = null;
  #tasksModel = null;

  #boardComponent = new BoardView();
  #taskListComponent = new TaskListView();

  #boardTasks = [];

  constructor({boardContainer, tasksModel}) {
    this.#boardContainer = boardContainer;
    this.#tasksModel = tasksModel;
  }

  init() {
    this.#boardTasks = [...this.#tasksModel.tasks];

    render(this.#boardComponent, this.#boardContainer);
    render(new SortView(), this.#boardComponent.element);
    render(this.#taskListComponent, this.#boardComponent.element);
    render(new TaskEditView({task: this.#boardTasks[0]}), this.#taskListComponent.element);

    for (let i = 1; i < this.#boardTasks.length; i++) {
      render(new TaskView({task: this.#boardTasks[i]}), this.#taskListComponent.element);
    }

    render(new LoadMoreButtonView(), this.#boardComponent.element);
  }
}
