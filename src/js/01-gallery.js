import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

const galleryEl = document.querySelector('.gallery');

const itemsGalleryMarkup = createItemsGalleryMarkup(galleryItems);

function createItemsGalleryMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item">
    <a class="gallery__item" href="${original}">
  <img class="gallery__image" src="${preview}" alt="${description}" />
</a>
    </div>`;
    })
    .join('');
}

galleryEl.insertAdjacentHTML('beforeend', itemsGalleryMarkup);

galleryEl.addEventListener('click', onClickGallery);

function onClickGallery(event) {
  event.preventDefault();
  console.log(event.target);
}

const addOptionsLightBox = {
  captionType: 'attr',
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
  heightRatio: 1,
};

let gallery = new SimpleLightbox('.gallery a', addOptionsLightBox);

gallery.on('show.simplelightbox');
