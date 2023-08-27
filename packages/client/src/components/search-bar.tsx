"use client"

import { useRouter } from "next/navigation";
import { useState } from "react"

export default function SearchBar() {

    const [searchText, setSearchText] = useState("");
    const router = useRouter();

    const handleSearch = (e: any) => {
        if (e.key == 'Enter') router.push("someBasePath/" + searchText);
        else setSearchText(e.target.value);
    }

    return (
        <div className="w-100% bg-slate-100">
            <input className="bg-slate-200" type="text" placeholder="Search..." onKeyUp={handleSearch}/>
        </div>
    )

}