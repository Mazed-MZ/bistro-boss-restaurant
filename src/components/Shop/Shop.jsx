import React from 'react'
import Burger from '../Foods Menu/Burger/Burger'
import Desserts from '../Foods Menu/Desserts/Desserts'
import Soup from '../Foods Menu/Soups/Soup'

export default function Shop() {
    return (
        <div className="pt-32 pb-32">
            <div role="tablist" className="tabs tabs-bordered">
                <input type="radio" name="my_tabs_1" role="tab" className="md:ml-80 md:text-2xl tab" aria-label="BURGER" />
                <div role="tabpanel" className="tab-content pt-10"><Burger></Burger></div>

                <input type="radio" name="my_tabs_1" role="tab" className="md:ml-32 md:text-2xl tab" aria-label="DESSERTS" />
                <div role="tabpanel" className="tab-content pt-10"><Desserts></Desserts></div>

                <input type="radio" name="my_tabs_1" role="tab" className="md:ml-32 md:text-2xl tab" aria-label="SOUPS" />
                <div role="tabpanel" className="tab-content pt-10"><Soup></Soup></div>

                <input type="radio" name="my_tabs_1" role="tab" className="md:ml-32 md:text-2xl tab" aria-label="SALADS" />
                <div role="tabpanel" className="tab-content pt-10">Salads</div>

                <input type="radio" name="my_tabs_1" role="tab" className="md:ml-32 md:text-2xl tab" aria-label="PIZZA" />
                <div role="tabpanel" className="tab-content pt-10">PIZZA</div>
            </div>
        </div>
    )
}
