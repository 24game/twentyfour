import React from 'react';

class Share extends React.Component {

  render() {
    let url = encodeURIComponent("https://24game.github.io/");
    let fbshare = "https://www.facebook.com/sharer/sharer.php?u=" + url;
    let twittershare = "https://twitter.com/share?url=" + url;
    let googleshare = "https://plus.google.com/share?url=" + url;
    return(
      <section className="centered footer-details">
        <p>
          <a className="sharelink" href={fbshare} target="_blank">Facebook</a>
          <span className="divider"> · </span>
          <a className="sharelink" href={twittershare} target="_blank">Twitter</a>
          <span className="divider"> · </span>
          <a className="sharelink" href={googleshare} target="_blank">Google</a>
        </p>
      </section>
    );
  }
}

export default Share;
