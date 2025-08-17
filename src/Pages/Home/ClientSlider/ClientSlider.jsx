import Marquee from "react-fast-marquee";

import client1 from '../../../assets/clients/client1.png';
import client2 from '../../../assets/clients/client2.png';
import client3 from '../../../assets/clients/client3.png';
import client4 from '../../../assets/clients/client4.png';
import client5 from '../../../assets/clients/client5.png';
import client6 from '../../../assets/clients/client6.png';
import client7 from '../../../assets/clients/client7.png';

const logos = [client1, client2, client3, client4, client5, client6, client7];

const ClientSlider = () => {
  return (
    <section className="mb-20">
      <h2 className="text-3xl font-bold text-center mb-10 " >Trusted by Top Brands</h2>

      <Marquee direction="right" speed={60} pauseOnHover={true} gradient={false}>
        {logos.map((logo, index) => (
          <div key={index} className="mx-15">
            <img src={logo} alt={`client-${index}`} className="h-6 w-auto" />
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default ClientSlider;