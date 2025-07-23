import React from 'react';
import SubscriptionPricing from './SubcribtionPricenig/SubscriptionPricing';
import MostViewArticle from './MostViewArticle/MostViewArticle';
import AllPublisher from './AllPublisher/AllPublisher';
import StatisticPage from './StatisticPage/StatisticPage';
import SubscriptionPromptModal from "../Home/SubscriptionPromptModal/SubscriptionPromptModal";
import useUserRole from '../../Hooks/useUserRole';

const Home = () => {
    const {userInfo} = useUserRole()
    
    return (
        <div className='max-w-[1350px] mx-auto'>
            <MostViewArticle/>
            <AllPublisher/>
            <StatisticPage/>
            <SubscriptionPricing/>
            {
                !userInfo.premiumToken && <SubscriptionPromptModal />
            }
            
        </div>
    );
};

export default Home;