import { Link } from 'react-router-dom';
import service2Img from '../assets/service_2.jpg';
import './MetaverseDev.css';

export default function MetaverseDev() {
  return (
    <main style={{ paddingTop: 0 }}>
      {/* Hero Banner */}
      <section className="metaverse-hero">
        <div className="metaverse-hero-inner">
          <div className="metaverse-hero-left">
            <h1>Metaverse Development<br />Services</h1>
            <p>
              Metaverse is a buzzword and for a good reason. It offers a potential to
              enter various fields and cover numerous use cases. DreamTech is a pioneer in
              the metaverse development with in-depth expertise in the industry and
              related technologies.
            </p>
            <Link to="/contact" className="metaverse-hero-btn">Book A Call</Link>
          </div>
          <div className="metaverse-hero-right">
            <img src={service2Img} alt="Metaverse Development" className="metaverse-hero-img" />
          </div>
        </div>
      </section>
    </main>
  );
}
