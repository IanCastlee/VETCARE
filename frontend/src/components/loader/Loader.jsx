import "./Loader.scss";

const Loader = ({ _label }) => {
  return (
    <div className="loader-container">
      <div className="loader">
        <div className="dog">
          <div className="dog-body">
            <div className="dog-tail">
              <div className="dog-tail">
                <div className="dog-tail">
                  <div className="dog-tail">
                    <div className="dog-tail">
                      <div className="dog-tail">
                        <div className="dog-tail">
                          <div className="dog-tail"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="dog-torso"></div>
          <div className="dog-head">
            <div className="dog-ears">
              <div className="dog-ear"></div>
              <div className="dog-ear"></div>
            </div>
            <div className="dog-eyes">
              <div className="dog-eye"></div>
              <div className="dog-eye"></div>
            </div>
            <div className="dog-muzzle">
              <div className="dog-tongue"></div>
            </div>
          </div>
        </div>
      </div>

      <h1 className="wait">{_label}</h1>
    </div>
  );
};

export default Loader;
