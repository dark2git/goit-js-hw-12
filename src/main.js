import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { fetchImages } from './js/pixabay-api.js';
import {
  renderGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const buttonMore = document.querySelector('.button-more');
let currentQuery = '';
let currentPage = 1;
const perPage = 15;
let totalHits = 0;

form.addEventListener('submit', handleSubmit);
buttonMore.addEventListener('click', handleLoadMore);

async function handleSubmit(event) {
  event.preventDefault();
  const inputValue = form.elements['search-text'].value.trim();
  currentQuery = inputValue;
  currentPage = 1;

  if (inputValue === '') {
    iziToast.warning({
      message: 'Введіть назву зображення!',
      position: 'topRight',
    });
    return;
  }

  gallery.innerHTML = '';
  hideLoadMoreButton();
  showLoader();

  try {
    const response = await fetchImages(currentQuery, currentPage);
    const images = response.hits;

    totalHits = response.totalHits;
    const totalPages = Math.ceil(totalHits / perPage);

    if (images.length === 0) {
      iziToast.info({
        message: 'Зображень не знайдено.',
        position: 'topRight',
      });
    } else {
      renderGallery(images);

      if (currentPage < totalPages) {
        showLoadMoreButton();
        buttonMore.disabled = false;
      } else {
        hideLoadMoreButton();
      }
    }
  } catch (error) {
    iziToast.error({
      message: 'Сталася помилка при запиті!',
      position: 'topRight',
    });
    console.error('Error:', error);
  } finally {
    hideLoader();
  }

  form.reset();
}

async function handleLoadMore() {
  currentPage += 1;
  showLoader();
  buttonMore.disabled = true;

  try {
    const data = await fetchImages(currentQuery, currentPage);
    const images = data.hits;

    renderGallery(images);

    const totalPages = Math.ceil(totalHits / perPage);
    if (currentPage < totalPages) {
      buttonMore.disabled = false;
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      iziToast.info({
        message: 'Усі результати завантажено.',
        position: 'bottomCenter',
        timeout: 3000,
      });
    }

    const card = document.querySelector('.list-item');
    if (card) {
      const cardHeight = card.getBoundingClientRect().height;
      window.scrollBy({
        left: 0,
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }
  } catch (error) {
    iziToast.error({
      message: 'Помилка при завантаженні додаткових зображень',
      position: 'topRight',
    });
    buttonMore.disabled = false;
  } finally {
    hideLoader();
  }
}