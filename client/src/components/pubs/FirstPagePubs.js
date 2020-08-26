import React, { useState, useEffect, useRef, Fragment } from "react";
import axios from "axios";
import { connect } from "react-redux";
import store from "../../store/store";
import PropTypes from "prop-types";
import PubCard from "./PubCard";

import { loadPubs } from "../../actions/pub";

// import './fp-posts.scss';

const FirstPagePubs = ({ pubs }) => {
  const [loading, setLoading] = useState(undefined);

  const getImages = async () => {
    const res = await axios.get("/upload");
    setLoading(false);
  };

  useEffect(() => {
    store.dispatch(loadPubs());
    getImages();
    // console.log('loading posts');
  }, []);
  // <h2>Check last posts</h2>

  return (
    <div className="fp-posts-container">
      <h2>Current Pubs </h2>
      <div className="posts">
        {pubs.map((pub) => (
          <PubCard
            key={pub._id}
            image={pub.pubImage}
            name={pub.pubName}
            adress={pub.pubAdress}
            rentPrice={pub.rentPrice}
            capacity={pub.pubCapacity}
            additionalPersonnel={pub.additionalPersonnel}
            additionalServices={pub.additionalServices}
            pub_id={pub._id}
          />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  pubs: state.pub.pubs,
  currentPub: state.pub.currentPub,
});

export default connect(mapStateToProps)(FirstPagePubs);
