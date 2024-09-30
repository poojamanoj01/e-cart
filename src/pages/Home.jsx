import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllProducts } from '../redux/slices/productSlice'
import Header from '../components/Header'
const Home = () => {

  const dispatch = useDispatch()

  const { allProducts, loading, error } = useSelector(state => state.productReducer)
  // console.log(allProducts);

const [currentPage,setCurrentPage] = useState(1)
const productPerPage = 8
const totalPages = Math.ceil(allProducts?.length/productPerPage)
const currentPageLastProductIndex = currentPage * productPerPage
const currentPageStartProductIndex = currentPageLastProductIndex - productPerPage
const visibleProductCart = allProducts?.slice(currentPageStartProductIndex,currentPageLastProductIndex)





  useEffect(() => {
    dispatch(fetchAllProducts())
  }, [])


  const navigateToNextPage = ()=>{
    if(currentPage!=totalPages){
      setCurrentPage(currentPage+1)

    }
  }

  const navigateToPrevPage = ()=>{
    if(currentPage!=1){
      setCurrentPage(currentPage-1)

    }
  }



  return (
    <>

      <Header insideHome={true} />
      <div style={{ marginTop: '80px' }} className='container mx-auto px-4'>

        {
          loading ?
            <div style={{ height: '60vh' }} className="flex justify-center items-center font-bold">
              <img width={'90px'} height={'90px'} className='me-4' src="https://www.superiorlawncareusa.com/wp-content/uploads/2020/05/loading-gif-png-5.gif" alt="" />

              Loading...

            </div>

            :
           <>
              <div className='grid grid-cols-4 gap-4'>
                {
                  allProducts.length > 0 ?
                  visibleProductCart?.map(product => (
                      <div key={product.id} className='rounded border p-2 shadow'>
                        <img style={{ width: '100%' }} src={product?.thumbnail} alt="" />
                        <div className='text-center'>
                          <h3 className='text-xl font-bold'>{product?.title}</h3>
                          <Link className='bg-violet-500 text-white p-1 inline-block rounded' to={`/${product?.id}/view`}>view more</Link>      </div>
  
                      </div>
                    ))
                    :
                    <div className="font-bolde text-center mt-5 mb-5 text-red-600">
                      Product Not found
                    </div>
                }
  
  
  
  
              </div>
              {/* pagination */}

              <div className="flex justify-center items-center mt-5 mb-5">
                <span onClick={navigateToPrevPage} style={{cursor:'pointer'}}><i className="fa-solid fa-backward me-5"></i></span>
                <span className='font-bold'>{currentPage} of {totalPages}</span>
                <span onClick={navigateToNextPage}  style={{cursor:'pointer'}}><i className="fa-solid fa-forward ms-5"></i></span>

              </div>
           </>
        }

      </div>


    </>


  )
}

export default Home