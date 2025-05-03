import "./Medicine.scss";

//IMAGES
import bgImage from "../../assets/imges/signinimaeg.png";
import navgard from "../../assets/imges/navgard.jpg";

//ICONS
import { CiSearch } from "react-icons/ci";
import { useEffect, useState } from "react";

const Medicine = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal]);
  return (
    <>
      <div className="medicine-client">
        <div className="containerr">
          <div className="top">
            <div className="left">
              <h1>VETCARE SHOP</h1>
            </div>
            <div className="right">
              <img src={bgImage} alt="" />
            </div>
          </div>

          <div className="content">
            <div className="med-navbar">
              <span className="capsule-label">DOG MEDICINE</span>
              <span className="capsule-label">CAT MEDICINE</span>
              <span className="capsule-label">BIRD MEDICINE</span>
            </div>

            <div className="search-container">
              <div className="search-input-icon">
                <input type="text" placeholder="Search Veterinarian" />

                <CiSearch className="search-icon" />
              </div>
            </div>

            <div className="main-container">
              <div className="medicine-content">
                <div className="top-med">
                  <span className="title-med">Flea & Tick Prevention</span>
                </div>
                <div className="card-container">
                  <div className="card">
                    <div className="med-items">
                      <div className="item-card">
                        <div className="left">
                          <img src={navgard} alt="" />
                        </div>

                        <div className="right">
                          <div className="info">
                            <span>Nextgard</span>
                            <span>Stock : 3 box</span>
                            <span>Price : 100 per tablet</span>
                          </div>
                          <button onClick={() => setShowModal(true)}>
                            Read More
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="med-items">
                      <div className="item-card">
                        <div className="left">
                          <img src={navgard} alt="" />
                        </div>

                        <div className="right">
                          <div className="info">
                            <span>Nextgard</span>
                            <span>Stock : 3 box</span>
                            <span>Price : 100 per tablet</span>
                          </div>
                          <button>Read More</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="med-items">
                      <div className="item-card">
                        <div className="left">
                          <img src={navgard} alt="" />
                        </div>

                        <div className="right">
                          <div className="info">
                            <span>Nextgard</span>
                            <span>Stock : 3 box</span>
                            <span>Price : 100 per tablet</span>
                          </div>
                          <button>Read More</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="med-items">
                      <div className="item-card">
                        <div className="left">
                          <img src={navgard} alt="" />
                        </div>

                        <div className="right">
                          <div className="info">
                            <span>Nextgard</span>
                            <span>Stock : 3 box</span>
                            <span>Price : 100 per tablet</span>
                          </div>
                          <button>Read More</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="medicine-content">
                <div className="top-med">
                  <span className="title-med">
                    Dewormers / Parasite Control
                  </span>
                </div>
                <div className="card-container">
                  <div className="card">
                    <div className="med-items">
                      <div className="item-card">
                        <div className="left">
                          <img src={navgard} alt="" />
                        </div>

                        <div className="right">
                          <div className="info">
                            <span>Nextgard</span>
                            <span>Stock : 3 box</span>
                            <span>Price : 100 per tablet</span>
                          </div>
                          <button>Read More</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="med-items">
                      <div className="item-card">
                        <div className="left">
                          <img src={navgard} alt="" />
                        </div>

                        <div className="right">
                          <div className="info">
                            <span>Nextgard</span>
                            <span>Stock : 3 box</span>
                            <span>Price : 100 per tablet</span>
                          </div>
                          <button>Read More</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="med-items">
                      <div className="item-card">
                        <div className="left">
                          <img src={navgard} alt="" />
                        </div>

                        <div className="right">
                          <div className="info">
                            <span>Nextgard</span>
                            <span>Stock : 3 box</span>
                            <span>Price : 100 per tablet</span>
                          </div>
                          <button>Read More</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="med-items">
                      <div className="item-card">
                        <div className="left">
                          <img src={navgard} alt="" />
                        </div>

                        <div className="right">
                          <div className="info">
                            <span>Nextgard</span>
                            <span>Stock : 3 box</span>
                            <span>Price : 100 per tablet</span>
                          </div>
                          <button>Read More</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal-viewmore-overlay">
          <div className="modal-viewmore">
            <div className="top">
              <div className="left">Lorem ipsum dolor sit amet.</div>

              <span onClick={() => setShowModal(false)}>xlose</span>
            </div>

            <div className="content">
              <span>Price: ₱100 per tablet</span>
              <span>Category: Flea & Tick Prevention</span>
              <span>For: Dogs (all sizes, adjust dosage by weight)</span>
              <span>Dosage: 1 chewable tablet per month</span>
              <span>Active Ingredient: Afoxolaner</span>
              <span>Use: Kills fleas & ticks within 24 hours</span>
              <span>Availability: Over-the-counter / Vet prescription</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Medicine;
