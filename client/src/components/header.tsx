import logo from '@/assets/logo.png'

export default function Header() {
    return (
        <div className='w-full h-20'>
            <div className='flex m-auto w-100% justify-between px-20%'>
                <a href="#"><img src={logo.src}/></a>
                <div className='table'> 
                    <a className='font-bold align-bottom table-cell pr-3' href="#">About Us</a>
                    <a className='font-bold align-bottom table-cell' href="#">Resources</a>
                </div>
            </div>
        </div>
    )
}