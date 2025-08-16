import React from "react";

const FaqSection = () => {
  return (
    <div className="">
      <h1 className="text-center  mt-10 text-3xl font-bold">Frequently Asked Question</h1>
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 bg-base-100 p-8 md:p-10 space-y-8 md:space-y-0 rounded-2xl mx-2">
        {/* Left - Image */}
        <div className="relative w-full lg:w-1/2">
          <img
            src="https://i.ibb.co.com/b5rgvjbM/curiosity-people-concept-illustration-114360-11034-removebg-preview.png"
            alt="FAQ Illustration"
            className="rounded-xl mx-auto"
          />
        </div>

        {/* Right - FAQ Content */}
        <div className="w-full lg:w-1/2 space-y-6">
          {/* Question 2 */}
          <div className="collapse bg-base-100 border border-base-400">
            <input type="radio" name="faq-accordion" defaultChecked />
            <div className="collapse-title font-semibold">
              Is this newspaper website free to use?
            </div>
            <div className="collapse-content text-sm">
              Yes! All basic features and most articles are free. You can also explore premium content by subscribing.
            </div>
          </div>

          {/* Question 3 */}
          <div className="collapse bg-base-100 border border-base-400">
            <input type="radio" name="faq-accordion" />
            <div className="collapse-title font-semibold">
              How can I subscribe to premium news?
            </div>
            <div className="collapse-content text-sm">
              Click on the "Subscribe" button from the homepage or visit the Subscription page to choose your plan.
            </div>
          </div>

          {/* Question 5 */}
          <div className="collapse bg-base-100 border border-base-400">
            <input type="radio" name="faq-accordion" />
            <div className="collapse-title font-semibold">
              How do you ensure news accuracy?
            </div>
            <div className="collapse-content text-sm">
              Our editorial team verifies all news before publishing, and we rely on trusted sources only.
            </div>
          </div>

          {/* Question 6 */}
          <div className="collapse bg-base-100 border border-base-400">
            <input type="radio" name="faq-accordion" />
            <div className="collapse-title font-semibold">
              Can I publish news articles?
            </div>
            <div className="collapse-content text-sm">
              Yes! if you a normal user you can one article post. But if you premium user you can unlimited article post.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqSection;
