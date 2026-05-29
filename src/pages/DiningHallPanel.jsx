import { useState, useEffect, Fragment } from "react"
import { Pages, Panels } from "../constants/pages"


function LocationsPanel({setPanel, locations:{choices,setAmount}}) {
    const [listoflocs, setlistoflocs] = useState("")
    let locs = [
        {label: "1", value: "bplate"},
        {label: "2", value: "feast"},
        {label: "3", value: "de neve"},
        {label: "4", value: "bcafe"},
        {label: "5", value: "cafe 1919"},
        {label: "6", value: "epicuria"},
        {label: "7", value: "rendezvous"},
        {label: "8", value: "the study"}
    ]

    const handleSubmit =(e)=>{
        e.preventDefault();
        console.log("This ran");
    };

    async function handleLocations(e) {
        if (listoflocs.length === 0) {
            alert("yo you gotta select a location my user")
            setSelectedLocations(false)
            return
        }
    }
    const onSubmit = async(e) => {
        try {
            setlistoflocs(locs)
            setPage(Pages.HOME)
        } catch(e) {
            alert("pick at least one option!")
        }
    }
    return (
        <form id="dropdownform"
        onSubmit={handleSubmit(onSubmit)}>
            <label>
            <select>
                <option selection disable>Choose the dining locations!</option>
                <option value="1">bplate</option>
                <option value="2">feast</option>
                <option value="3">de neve</option>
                <option value="4">bcafe</option>
                <option value="5">cafe 1919</option>
                <option value="6">epicuria</option>
                <option value="7">rendezvous</option>
                <option value="8">the study</option>
            </select>
            {locs.map((loc) => (
                <option selectedloc = {loc.label}>{loc.value}</option>
            ))}
            </label>
            <label>
                <select>
                    <option selection disable>
                        Choose the hours!
                    </option>
                    <option value="1">breakfast</option>
                    <option value="2">lunch</option>
                    <option value="3">dinner</option>
                    <option value="4">late night</option>
                </select>
                {locs.map((loc) => (
                <option selectedloc = {loc.label}>{loc.value}</option>
            ))}
            </label>
            <button type="submit">press this to update boss</button>
        </form>
    )
}

export default LocationsPanel