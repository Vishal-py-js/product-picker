import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import AddProduct from '../../components/AddProduct'
import ProductModal from '../../components/ProductModal'


const Container1 = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Container = styled.div`
    height: 100%;
    width: 50%;
    align-self: center;
    align-items: center;
    padding: 50px 0;
    display: flex;
    flex-direction: column;
    gap: 30px;

    h3{
        align-self: flex-start;
        font-weight: 500;
        font-size: 20px;
    }

    .title{
        display: flex;
        justify-content: space-between;
        padding: 0 30px 0 30px;
        width: 80%;
        align-self: flex-end;
        h4{
            font-weight: 500;
            font-size: 18px;
        }
    }
    @media (max-width: 1600px) {
        width: 60%;
    }
    @media (max-width: 1300px) {
        width: 70%;
    }
    @media (max-width: 900px) {
        width: 80%;
    }
    @media (max-width: 900px) {
        width: 90%;
    }
`

const Button = styled.button`
    width: 200px;
    align-self: flex-end;
    padding: 13px 0;
    border: 2px solid rgba(0, 128, 96, 1);
    border-radius: 4px;
    color: rgba(0, 128, 96, 1);
    font-weight: 500;
    background: none;
    cursor: pointer;
`

const Products = styled.div`
    display: flex;
    flex-direction: column;
    align-self: center;
    width: 100%;
    align-items: center;
    gap: 30px;
`


function Picker() {

    const[modal, setModal] = useState(false)    

    const variants = useSelector(state => state.addedProducts)

    const modalOn = () => {
        setModal(true)
    }

    return (
        <Container1> 
            <Container>
                <h3>Add Products</h3>
                <div className='title'>
                    <h4>Product</h4>
                    <h4>Discount</h4>
                </div>
                <Products>
                    {
                        variants.variants.map((item, index) => (
                            <AddProduct item={item} step={index+1}/>
                        ))
                    }
                </Products>
                <Button onClick={()=>modalOn()}>Add Product</Button>
            </Container>
            {
                modal?<ProductModal setModal={setModal}/>:""
            }
             
        </Container1>
    )
}

export default Picker

