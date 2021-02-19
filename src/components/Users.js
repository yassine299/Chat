import React, { useEffect, useState } from 'react'


function Users() {
    const [cat, setCat] = useState([]);
    const [change, setchange] = useState(true);


    useEffect(() => {
        getCat();
    }, [change]);
    const getCat = async () => {
        const response = await fetch("https://api.thecatapi.com/v1/images/search");
        const data = await response.json();
        setCat(data[0]);
    }

    return (
        <div>
            <img className="position-absolute top-50 start-50 translate-middle img-fluid" style={{ width: "700px", height: "600px" }} src={cat.url} alt="" />
            <button className="position-absolute top20 start-50 translate-middle img-fluid bg-primary" onClick={() => setchange(!change)}>new</button>
        </div>
    )
}

export default Users
