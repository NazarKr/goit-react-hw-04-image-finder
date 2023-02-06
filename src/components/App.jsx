import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ModalWindow from '../components/share/Modal/ModalWindow';
import Spinner from './share/Loader/Spinner';
import { fetchImages } from '../components/share/Servises/images-api'

export const App = () => {
  const [search, setSearch] = useState('');
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setModal] = useState(false);
  const [modalImg, setModalImg] = useState(null);

  useEffect(() => {
    if (!search) {
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const { hits } = await fetchImages(search, page);
        setItems(prevItems => ([...prevItems, ...hits]))
      }
      catch (error) {
        setError(error.massage);
      }
      finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [page, search]);

  const searchImages = search => {
    setSearch(search);
    setItems([]);
    setPage(1);
  };

  const loadMore = useCallback(() => {
    setPage(prevPage => prevPage + 1)
  }, []);

  const toggleModal = useCallback(() => {
    setModal(prevState => !prevState)
  }, [])

  const addModalImg = modalImg => {
    setModalImg(modalImg)
  }
  
  return (
    <div className='App'>
      <Searchbar onSubmit={searchImages} />

      <ImageGallery
        items={items}
        onClick={toggleModal}
        setImg={addModalImg}
        loading={loading}
        loadMore={loadMore}
        pege={page}
      />

      {loading && <Spinner />}

      {error && <p>{error}</p>}
      {showModal && (
        <ModalWindow
          onClick={toggleModal}
          children={<img src={modalImg.img} alt={modalImg.alt} />} >
        </ModalWindow>)}
    </div>
  )
};