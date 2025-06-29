import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const buttonMore = document.querySelector('.button-more');
let lightbox = null;

export function createGallery(images) {
  return images
    .map(
      ({
        id,
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
    <li class="list-item" data-id="${id}">
      <a href="${largeImageURL}">
        <img class="image" src="${webformatURL}" alt="${tags}" width="360" />
      </a>
      <ul class="info">
        <li>
          <h3>Likes</h3>
          <p class="info-text">${likes}</p>
        </li>
        <li>
          <h3>Views</h3>
          <p class="info-text">${views}</p>
        </li>
        <li>
          <h3>Comments</h3>
          <p class="info-text">${comments}</p>
        </li>
        <li>
          <h3>Downloads</h3>
          <p class="info-text">${downloads}</p>
        </li>
      </ul>
    </li>
    `
    )
    .join('');
}

export function renderGallery(images) {
  const gallery = document.querySelector('.gallery');
  gallery.insertAdjacentHTML('beforeend', createGallery(images));

  if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
    });
  } else {
    lightbox.refresh();
  }
}

export function clearGallery() {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '';
}

const loader = document.querySelector('.loader');
export function showLoader() {
  loader.style.display = 'block';
}
export function hideLoader() {
  loader.style.display = 'none';
}

export function showLoadMoreButton() {
  buttonMore.classList.remove('hiddenbtn');
}

export function hideLoadMoreButton() {
  buttonMore.classList.add('hiddenbtn');
}