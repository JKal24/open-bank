import logo from '@/assets/logo.png'

export default function Footer() {
    return (
        <div className="bg-footer relative bottom-0 w-100% text-center px-10% py-3 mt-auto">
            <div className="text-center w-fit ">
                <a href="#"><img src={logo.src}/></a>
                <div className='mt-2 font-bold text-slate-500'>Consolidate Your Banking</div>
            </div>
            <hr className='solid'/>
            <p>© 2023 Multibank. All rights reserved</p>
        </div>
    )
}