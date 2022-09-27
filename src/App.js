import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import Picker from './pages/ProductPicker';
import { getProducts } from './redux/products/actions';


function App() {

    useEffect(() => {
        getData()
    }, [])

    const dispatch = useDispatch()
    const getData = async() => {
        let data = await axios.get("https://stageapibc.monkcommerce.app/admin/shop/product?search=Fo&page=1")
        dispatch(getProducts(data.data))
    }


    return (
        <div className="App">
          <Picker />
        </div>
    );
}

export default App;
