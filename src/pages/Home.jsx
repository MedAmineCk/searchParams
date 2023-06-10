import {Link, useSearchParams} from "react-router-dom";

const data = [
    { id: 1, name: "John", age: 25, city: "New York" },
    { id: 2, name: "Jane", age: 30, city: "London" },
    { id: 3, name: "Bob", age: 30, city: "Paris" },
    { id: 4, name: "Camelia", age: 30, city: "Paris" },
    { id: 5, name: "Micheal", age: 35, city: "Paris" }
];

export default function Home() {

    const [searchParams, setSearchParams] = useSearchParams()

    const filters = {
        age: searchParams.get('age'),
        city: searchParams.get('city')
    }

    const filteredData = data.filter(item => {
        for (const key in filters){
            if(filters[key] && item[key].toString().toLowerCase() !== filters[key]){
                return false
            }
        }
        return true
    })

    function genNewSearchParamString(key, value) {
        const sp = new URLSearchParams(searchParams)
        if (value === null) {
            sp.delete(key)
        } else {
            sp.set(key, value)
        }
        // return `?${sp.toString()}`
        setSearchParams(sp)
    }


    return (
        <>
            <h1>Home</h1>
            <nav>
                {/*<Link to="?age=25">age 25</Link>*/}
                {/*<Link to="?age=27">age 27</Link>*/}
                {/*<Link to=".">clear</Link>*/}
                <button onClick={() => genNewSearchParamString('age','25')}>age 25</button>
                <button onClick={() => genNewSearchParamString('age','30')}>age 30</button>
                <button onClick={() => genNewSearchParamString('age','35')}>age 35</button>
                <button onClick={() => genNewSearchParamString('age',null)}>clear</button>
            </nav>
            <nav>
                <button onClick={() => genNewSearchParamString('city','paris')}>Paris</button>
                <button onClick={() => genNewSearchParamString('city','london')}>London</button>
                <button onClick={() => genNewSearchParamString('city','new york')}>New York</button>
                <button onClick={() => genNewSearchParamString('city',null)}>clear</button>
            </nav>
            {
                filteredData.length > 0 ?
                    filteredData.map((user, index) => (
                    <div key={index}>
                        <b>Name : </b><span>{user.name}</span><br/>
                        <b>Age : </b><span>{user.age}</span><br/>
                        <b>City : </b><span>{user.city}</span><br/>
                        <hr/>
                    </div>))
                    :
                    <h1>no data found with this filter</h1>
            }


        </>
    )
}
