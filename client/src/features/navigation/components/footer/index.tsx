import "./index.css";

export const Footer = () => {
  return (
    <div className="footer">
      <p className="footer-text">568 Library Street, TW 86279</p>
      <p className="footer-text">Retuen Policy</p>
      <p className="footer-text">Late Fees</p>
      <p className="footer-text">Library Card Conditions</p>
      <div className="footer-social-cluster">
        <p className="footer-social-text footer-social">Socials</p>
        <i className="ri-youtube-fill footer-social" />
        <i className="ri-twitter-fill footer-social" />
        <i className="ri-facebook-box-fill footer-social" />
        <i className="ri-instagram-fill footer-social" />
      </div>
    </div>
  );
};
