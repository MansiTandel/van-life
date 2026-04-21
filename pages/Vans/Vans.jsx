import React, { useEffect, useState } from 'react'
import "../../server"
import { Link, useSearchParams } from 'react-router-dom'
import { getVans } from '../../api'
function Vans() {

    const [searchParams, setSearchParams] = useSearchParams()
    const [vans, setVans] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const typeFilter = searchParams.get("type")
    console.log(searchParams.toString())
    // useEffect(()=>{
    //  fetch("/api/vans")
    //     .then(res => res.json())
    //     .then(data => setVans(data.vans))
    //     .catch(err => console.error("Error:", err))

    // }, [])
    useEffect(() => {
        async function loadVans() {
            setLoading(true)
            try {
                const data = await getVans()
                 setVans(data)
            }
            catch(err){
                console.log(err)
                setError(err)
            } finally{
                setLoading(false)
            }
           
            
        }
        loadVans()
    }, [])

    const filteredTypes = typeFilter ? vans.filter(char => char.type.toLowerCase() === typeFilter.toLowerCase()) : vans

    const vanElements = filteredTypes.map(van => (
        <div key={van.id} className="van-tile">
            <Link to={van.id}
             state={{ search: `?${searchParams.toString() }`, type: typeFilter}}>
                <img src={van.imageUrl} />
                <div className="van-info">
                    <h3>{van.name}</h3>
                    <p>${van.price}<span>/day</span></p>
                </div>
                <i className={`van-type ${van.type} selected`}>{van.type}</i>
            </Link>
        </div>
    ))
    function handleFilterChange(key, value) {
        setSearchParams(prevParams => {
            if (value === null) {
                prevParams.delete(key)
            } else {
                prevParams.set(key, value)
            }
            return prevParams
        })
    }
    
    if (loading) {
        return <h1 aria-live="polite">Loading...</h1>
    }
     if (error) {
        return <h1 aria-live="assertive">error is:...{error}</h1>
    }
  return (
      <div className="van-list-container">
        <h1>Explore our van options</h1>
        <div className="van-list-filter-buttons">
             <button
                    onClick={() => handleFilterChange("type", "simple")}
                    className={`van-type simple ${typeFilter === "simple" ? "selected" : ""}`}
                >Simple</button>
                <button
                    onClick={() => handleFilterChange("type", "luxury")}
                    className={`van-type luxury ${typeFilter === "luxury" ? "selected" : ""}`}
                >Luxury</button>
                <button
                    onClick={() => handleFilterChange("type", "rugged")}
                    className={`van-type rugged ${typeFilter === "rugged" ? "selected" : ""}`}
                >Rugged</button>
                 {typeFilter ? ( 
                    <button
                        onClick={() => handleFilterChange("type", null)}
                        className="van-type clear-filters"
                    >
                        Clear filter 
                    </button>
                ) : null }
            {/* <button className="van-type clear-filters" onClick={() => setSearchParams({ })}>Clear Filter</button> */}
            {/* <Link className="van-type simple" to="?type=simple">Simple</Link>
            <Link className="van-type luxury" to="?type=luxury">Luxury</Link>
            <Link className="van-type rugged" to="?type=rugged">Rugged</Link>
            <Link className="van-type clear-filters" to=".">Clear Filter</Link> */}
        </div>
            <div className="van-list">
                {vanElements}
            </div>
        </div>
  )
}

export default Vans
