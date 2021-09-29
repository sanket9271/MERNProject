import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Treak from '../components/Treak';
import Loader from './Loader';
import Error from './Error'
import 'antd/dist/antd.css';
import { DatePicker, Space } from 'antd';
import moment from 'moment';
const { RangePicker } = DatePicker;

function HomeScreen() {
    const [treaks, settreaks] = useState([]);
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState();
    const [searchkey,setsearchkey]=useState('');
    const [type,settype]=useState('All');
    const [duplicatetreaks, setduplicatetreaks] = useState([]);
    useEffect(async () => {
        try {
            setloading(true);
            const data = (await axios.get('api/treaks/getalltreaks')).data.treaks;
            settreaks(data);
            setduplicatetreaks(data);
            console.log(data);
            setloading(false);

        } catch (error) {
            seterror(true);
            console.log(error);
            setloading(false);
        }

    }, [])

    function filterByDate(dates) {
        console.log(moment(dates[0]).format('DD-MM-YYYY'));
        console.log(moment(dates[1]).format('DD-MM-YYYY'));
    }

    function filterBySearch(){
        const temptreak=duplicatetreaks.filter(treaks=>treaks.name.toLowerCase().includes(searchkey))
        settreaks(temptreak)
    }
    function filterByType(e){
        settype(e)
        if(e!=='All'){
            const temptreak=duplicatetreaks.filter(treaks=>treaks.difficulty.toLowerCase()==e.toLowerCase())
            settreaks(temptreak)
        }
        else{
            settreaks(duplicatetreaks)
        }
        
    }

    return (
        <div className='container'>
            <div className='row mt-5 bs'>
                <div className='col-md-6'>
                    <input type='text' className='form-control' placeholder='search treaks' 
                        value={searchkey} onChange={(e)=>{setsearchkey(e.target.value)}} onKeyUp={filterBySearch}
                    />
                </div>

                <div className='col-md-6'>
                    <select className='form-control' value={type} onChange={(e)=>{filterByType(e.target.value)}}>
                        <option>All</option>
                        <option>Easy</option>
                        <option>Moderate</option>
                        <option>Hard</option>
                    </select>
                </div>



            </div>
            <div className="row justify-content-center">
                {loading ? (<h1><Loader /></h1>) : error ? (<h1><Error /></h1>) : (treaks.map(treak => {
                    return <div className="col-md-9">
                        <Treak treak={treak} />
                    </div>;
                }))}
            </div>
        </div>
    )
}

export default HomeScreen;