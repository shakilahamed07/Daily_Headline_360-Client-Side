import React from "react";
import SubscriptionPricing from "./SubcribtionPricenig/SubscriptionPricing";
import MostViewArticle from "./MostViewArticle/MostViewArticle";
import AllPublisher from "./AllPublisher/AllPublisher";
import StatisticPage from "./StatisticPage/StatisticPage";
import SubscriptionPromptModal from "../Home/SubscriptionPromptModal/SubscriptionPromptModal";
import useUserRole from "../../Hooks/useUserRole";
import FaqSection from "./Faq/FaqSection";
import ContactUs from "./ContactUs/ContactUs";
import LatestNews from "./LatestNews/LatestNews";

const Home = () => {
  const { userInfo } = useUserRole();

  return (
    <div className="max-w-[1250px] mx-auto">
      <MostViewArticle />
      <LatestNews/>
      <AllPublisher />
      <StatisticPage />
      <SubscriptionPricing />
      {!userInfo.premiumToken && <SubscriptionPromptModal />}
      <FaqSection/>
      <ContactUs/>
    </div>
  );
};

export default Home;
