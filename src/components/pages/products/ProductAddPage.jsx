import React, { useState } from 'react'
import Header from '../../main/Header'
import { useDispatch } from 'react-redux'

function ProductAddPage() {
    const dispatch = useDispatch();
    const [is_confirmed, setConfirm] = useState(false)
    
    const to_check_product = () => {
        
    }
    

    return (
        <div>
            <Header />
            <div className='flex justify-center font-mono text-2xl items-center my-10 flex-col gap-3'>
                <h1>Добавление товара для демпинга</h1>
                <div>

                </div>
                <div className='flex flex-col gap-3 mt-5 text-xl'>
                    <label htmlFor="vender_code">Введите артикул из каспи кабинета </label>
                    <input type="number" min={0} name="vender_code" id="vender_code" className='border-2 p-2 rounded-2xl' />
                    <div className={`flex flex-col gap-3 ${is_confirmed ? '': 'hidden'}`}>
                        <label htmlFor="vender_code">Введите <span className='font-bold'>минимальный</span> порог цен (тг.)</label>
                        <input type="number" min={0} name="vender_code" id="vender_code" className='border-2 p-2 rounded-2xl' />
                        <label htmlFor="vender_code">Введите <span className='font-bold'>максимальный</span> порог цен (тг.)</label>
                        <input type="number" min={0} name="vender_code" id="vender_code" className='border-2 p-2 rounded-2xl' />
                        <label htmlFor="vender_code">Введите шаг (тг.)</label>
                        <input type="number" min={0} name="vender_code" id="vender_code" className='border-2 p-2 rounded-2xl' />
                        <label htmlFor="vender_code">Введите интервал репрайса (мин.)</label>
                        <input type="number" min={0} name="vender_code" id="vender_code" className='border-2 p-2 rounded-2xl' />
                    </div>
                </div>
                <button className='p-2 px-4 rounded-xl bg-blue-300 flex flex-row gap-2 items-center text-white hover:text-gray-200 '>
                    <span>
                        Проверить
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24"><g fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="m4 12.9l3.143 3.6L15 7.5" opacity="0.5" /><path d="m20 7.563l-8.571 9L11 16" /></g></svg>
                </button>
            </div>
        </div>
    )
}

export default ProductAddPage