import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
// import { setModalFalse } from '../../redux/modal/actions'
import ProductSelector from '../ProductSelector'
import Searchbar from '../SearchBar'

const close = "/assets/icons/close.svg"

const Container = styled.div`
    height: 75vh;
    width: 55vw;
    border: 1px solid lightgray;
    position: fixed;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 10px;
    z-index: 5;
    background-color: #fff;
    box-shadow: 15px 16px 16px rgba(0, 0, 0, 0.2);
    
    hr{
        width: 100%;
        border-top: 2px solid rgba(0, 0, 0, 0.2)
    }
`

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 10px;
    h3{
        font-weight: 500;
    }
    img{
        cursor: pointer;
    }
`

const Products = styled.div`
    display: flex;
    height: 55vh;
    margin: 0 0 55px 0;
    
    overflow-y: scroll;
    ::-webkit-scrollbar{
        display: none;
    }
`


function ProductModal({setModal}) {

    const dispatch = useDispatch()

    const modalOff = () => {
        // dispatch(setModalFalse())
        setModal(false)
    }

    const products = useSelector(state => state.products.products)

    return (
        <Container>
            <Header>
                <h3>Select Products</h3>
                <img onClick={modalOff} src={close} alt="close"/>
            </Header>
            <hr />
            <Searchbar />
            <hr />
                
            <Products>
                {
                    products.map((product) => (
                        <ProductSelector setModal={setModal} key={product.id} product={product}/>
                    ))
                }
            </Products>
        </Container>
    )
}

export default ProductModal