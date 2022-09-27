import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { addProducts } from '../../redux/products/actions'
import Checkbox from '../Checkbox'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    position: relative;
    width: 100%;
    margin-bottom: 50px;

    .title{
        display: flex;
        align-items: center;
        gap: 20px;
        margin-left: 10px;
        font-size: 18px;
        img{
            height: 35px;
            width: 50px;
        }
    }

    input{
        cursor: pointer;
        height: 20px;
    }

    hr{
        border-top: 2px solid rgba(0, 0, 0, 0.2);
    }

    .variants-cont{
        display: flex;
        flex-direction: column;
    }
`

const Variants = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    

    .variants{
        display: flex;
        gap: 10px;
        align-items: center;
        font-size: 17px;
        margin-left: 50px;
    }

    .details{
        display: flex;
        flex-direction: row;
        width: 50%;
        justify-content: space-around;
        align-items: center;

        h5{
            color: rgba(0, 0, 0, 0.9);
            font-size: 19px;
            font-weight: 400;
        }
    }
`

const Cart = styled.div`
    position: fixed;
    bottom: 12.5vh;
    width: 55%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 10px 20px;
    align-items: center;
    border: 2px solid lightgray;
    background-color: #fff;

    h4{
        font-weight: 500;
        font-size: 18px;
    }

    div{
        display: flex;
        gap: 10px;
        align-items: center;
    }

    .cancel{
        border: 1px solid rgba(0, 0, 0, 0.4);
        border-radius: 4px;
        color: rgba(0, 0, 0, 0.6);
        padding: 8px 30px;
        background-color: #fff;
        cursor: pointer;
        font-size: 16px;
    }

    .add{
        border: 2px solid rgba(0, 128, 96, 1);
        border-radius: 4px;
        color: rgba(255, 255, 255, 1);
        background-color: rgba(0, 128, 96, 1);
        padding: 8px 20px;
        cursor: pointer;
        font-size: 16px;
    }
`

function ProductSelector({ product, setModal }) {

    const dispatch = useDispatch()

    const[noOfProducts, setNoOfProducts] = useState(0)
    const[arr, setArr] = useState([])

    const [selectedProducts, setSelectedproducts] = useState([])
    const[checked, setChecked] = useState(
        new Array(product.variants.length).fill(false)
    )
    
    const[selectAl, setSelectAll] = useState(false)
    const[ifSelectedAll, setIfSelectedAll] = useState(false)
    

    const selectedProds = []

    const handleProducts = () => {
        checked.map((item, index) => {
            if(item === true){
                selectedProds.push({name: product.title, variants:product.variants[index]})
            } 
        })

        setNoOfProducts(noOfProducts + 1)
        arr.push(selectedProds)

        setSelectedproducts(selectedProds)
        dispatch(addProducts(selectedProds))
        setModal(false)
    }
   
    const handleOnChange = (position) => {
        const updatedCheckedState = checked.map((item, index) =>
          index === position ? !item : item
        );
    
        setChecked(updatedCheckedState); 
      };
    
    const selectAll = () => {
        let updSt = []
        
        checked.map((item) => {
           updSt.push(true)
        })
        setSelectAll(true)
        setIfSelectedAll(true)
        setChecked(updSt);
        
    };

    const unSelectAll = () => {
        let updSt = []
        
        checked.map((item) => {
           updSt.push(false)
        })
        setSelectAll(false)
        setIfSelectedAll(false)
        setChecked(updSt);   
    };

    const handleSelectAll = () => {
        if(ifSelectedAll){
            unSelectAll()
        } else {
            selectAll()
        }
    }

    return (
        <Container>
            <div className='title'>
                <Checkbox checked={selectAl} handleSelect={handleSelectAll}/>
                <img src={product.image.src} />
                <label >{product.title}</label>
            </div>
            <hr />
            {product.variants.map(({ title, inventory_quantity, price }, index) => {
                 return(
                    <React.Fragment key={index}>
                    <div className='variants-cont' key={index}>
                        <Variants >
                            <div className="variants" key={index}>
                                <Checkbox checked={checked[index]} handleSelect={()=>handleOnChange(index)}/>
                                <label htmlFor={`custom-checkbox-${index}`}>{title}</label>
                            </div>
                            <div className='details'>
                                <h5>{inventory_quantity} available</h5>
                                <h5>${price}</h5>
                            </div>
                        </Variants>
                    </div>
                    <hr />
                    </React.Fragment>
                );
            }
            )}
            <Cart>
                <h4>1 product selected</h4>
                <div>
                    <button onClick={()=>setModal(false)} className='cancel'>Cancel</button>
                    <button onClick={handleProducts} className='add'>Add</button>
                </div>
            </Cart>
        </Container>
    )
}

export default ProductSelector