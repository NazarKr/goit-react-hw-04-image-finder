import React from 'react';
import { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
// import ModalWindow from './Modal/ModalWindow';
import Spinner from './share/Loader/Spinner';
import { fetchImages } from '../components/share/Servises/images-api'



export const App = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  // const [showModal, setModal] = useState(false);
  // const [modalImg, setModalImg] = useState(null);

//   setModalImg = imageObj => {
//     this.setState({ modalImg: imageObj });
//   };
  // const addModalImg = modalImg => {
  //   setModalImg(modalImg)
  // }

  useEffect(() => {
    // console.log("fetch")
    if (search === '') {
      return;
    }

    setLoading(true);
    fetchData(search, page, )
      .then(result => setItems(prevState => [...prevState, ...result]))
      .catch(error => setError(error.message))
      .finally(() => setLoading(false));
  }, [search, page]);

  const fetchData = async (search, page) => {
    try {
      const { hits } = await fetchImages(search, page);
      if (hits.length === 0) {
        alert('No images!');
      }
      return hits;
    }
    catch (error) {
      setError(error.massage)
    }
    // finally {
    //   setItems({ loading: false })
    // }
  };

  const searchImages = search => {
    setItems([]);
    setSearch(search);
    setPage(1);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1)
  };

  // const toggleModal = () => {
  //   setModal(!showModal)
  // (prevState => !prevState)
  // }
  
    return (
      <div className='App'>
        <Searchbar onSubmit={searchImages} />
        
        <ImageGallery
          items={items}
          // onClick={toggleModal}
          // setImg={setModalImg}
          loading={loading}
          loadMore={loadMore}
          pege={page}
        />

        {loading && <Spinner/>}

        {error && <p>{error}</p>}
        {/* {showModal && (
          <ModalWindow
            onClick={toggleModal}
            children={<img src={modalImg.img} alt={modalImg.alt} />} >
        </ModalWindow>)} */}
      </div>
    )
  }


// import React, { Component } from 'react';
// import './Styles/styles.css'
// import Searchbar from './Searchbar/Searchbar';
// import ImageGallery from './ImageGallery/ImageGallery';
// import ModalWindow from './Modal/ModalWindow';
// import Spinner from './Loader/Spinner';
// import { fetchImages } from '../components/Servises/images-api'

// export class App extends Component {
//   state = {
//     search: '',
//     items: [],
//     loading: false,
//     error: null,
//     page: 1,
//     showModal: false,
//     modalImg: null,
//     imageDetails: null,
//   }
  
//   componentDidUpdate(prevProps, prevState) {
//     const { fetchData } = this;
//     const { search, page } = this.state;

//     if (prevState.search !== search || prevState.page !== page) {
//       fetchData();
//     }
//   }

//   fetchData = async (search, pege, perPage) => {
//     try {
//       this.setState({ loading: true });
//       const { search, page } = this.state;
//       const { hits } = await fetchImages(search, page);
//       this.setState(({ items }) => ({
//         items: [...items, ...hits]
//       }))
//     }
//     catch (error) {
//       this.setState({error: error.massage})
//     }
//     finally {
//       this.setState({loading:false})
//     }
//   }

//   searchImages = ({ search }) => {
//     this.setState({ search, items: [], page: 1 });
//   }

//   setModalImg = imageObj => {
//     this.setState({ modalImg: imageObj });
//   };
  
//   loadMore = () => {
//     const { page } = this.state;
//     this.setState({page: page +1})
//   }

//   toggleModal = () => {
//     this.setState(({ showModal }) => ({
//       showModal: !showModal,
//     }))
//   }

//   render() {
//     const { items, loading, error, showModal, modalImg, page } = this.state;
//     const { searchImages, loadMore, toggleModal, setModalImg } = this;

//     return (
//       <div className='App'>
//         <Searchbar onSubmit={searchImages} />
        
//         <ImageGallery
//           items={items}
//           onClick={toggleModal}
//           setImg={setModalImg}
//           loading={loading}
//           loadMore={loadMore}
//           pege={page}
//         />

//         {loading && <Spinner/>}

//         {error && <p>{error}</p>}
//         {showModal && (
//           <ModalWindow
//             onClick={toggleModal}
//             children={<img src={modalImg.img} alt={modalImg.alt} />} >
//         </ModalWindow>)}
//       </div>
//     )
//   }
// };