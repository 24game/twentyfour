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
          <a id="fbShare" href={fbshare} target="_blank">facebook</a>
          <span className="divider"> · </span>
          <a id="twitterShare" href={twittershare} target="_blank">twitter</a>
          <span className="divider"> · </span>
          <a id="googleShare" href={googleshare} target="_blank">google+</a>
        </p>
      </section>
    );
  }
}

export default Share;
