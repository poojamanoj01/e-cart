import React from 'react'
import Header from '../components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { removeWishlistItem } from '../redux/slices/wishlistSlice'
import { addToCart } from '../redux/slices/cartSlice'


const Wishlist = () => {

  const myCart = useSelector(state => state.cartReducer)


  const myWishlist = useSelector(state => state.wishlistReducer)

  const dispatch = useDispatch()


  const handleAddToCart = (product) => {
    const exstingProduct = myCart?.find(item => item.id == product.id)
    if (exstingProduct) {
      dispatch(addToCart(product))
      dispatch(removeWishlistItem(product.id))
      alert("product quantity is incrementing!!!")

    } else {
      dispatch(addToCart(product))
      dispatch(removeWishlistItem())
    }

  }

  return (
    <>

      <Header />
      <div style={{ marginTop: '100px' }} className='container mx-auto px-4'>
        {
          myWishlist.length > 0 ?
            <>
              <h1 className="text-red-500 text-3xl font-bold mb-5">Your wishlist</h1>
              <div className='grid grid-cols-4 gap-4'>

                {
                  myWishlist?.map(product => (
                    <div key={product?.id} className='rounded border p-2 shadow'>
                      <img style={{ width: '100%', height: '200px' }} src={product?.thumbnail} alt="" />
                      <div className='text-center'>
                        <h3 className='text-xl font-bold'>{product?.title}</h3>
                        <div className="flex justify-between mt-3">
                          <button onClick={() => dispatch(removeWishlistItem(product?.id))} className='text-xl'><i className="fa-solid fa-heart-circle-xmark text-red-600"></i></button>
                          <button onClick={()=>handleAddToCart(product)} className='text-xl'><i className="fa-solid fa-cart-plus text-green-600"></i></button>

                        </div>
                      </div>

                    </div>
                  ))
                }



              </div>

            </>
            :
            <div style={{ height: '70vh' }} className='flex flex-col items-center justify-center w-full'>

              <img src="https://static.vecteezy.com/system/resources/previews/008/515/488/large_2x/empty-cart-flat-illustration-concept-vector.jpg" alt="" />

              <h1 className='text-3xl font-bold text-blue-600'>your wishlist is empty!!!</h1>
            </div>
        }
      </div>




    </>)
}

export default Wishlist