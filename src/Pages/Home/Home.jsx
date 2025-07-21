import React from 'react';
import SubscriptionPricing from './SubcribtionPricenig/SubscriptionPricing';
import MostViewArticle from './MostViewArticle/MostViewArticle';
import AllPublisher from './AllPublisher/AllPublisher';
import StatisticPage from './StatisticPage/StatisticPage';

const Home = () => {
    
    return (
        <div className='max-w-[1350px] mx-auto'>
            <MostViewArticle/>
            <AllPublisher/>
            <StatisticPage/>
            <SubscriptionPricing/>
        </div>
    );
};

export default Home;