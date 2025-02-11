import {render} from './framework/render.js';
import NewTaskButtonView from './view/new-task-button-view';
import FilterView from './view/filter-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import TaskModel from './model/tasks-model.js';

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = siteMainElement.querySelector('.main__control');
const taskModel = new TaskModel();

const boardPresenter = new BoardPresenter({
  boardContainer: siteMainElement,
  taskModel,
});

render(new NewTaskButtonView(), siteHeaderElement);
render(new FilterView(), siteMainElement);

boardPresenter.init();
