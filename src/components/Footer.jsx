export default function Footer() {
    return (
        <footer>
            <div className="footer-sections">
                <div className="footer-section">
                    <h3>COMPANY</h3>
                    <a href="#" className="footer-link">About Last.fm</a>
                    <a href="#" className="footer-link">Contact Us</a>
                    <a href="#" className="footer-link">Jobs</a>
                </div>

                <div className="footer-section">
                <h3>HELP</h3>
                <a href="#" className="footer-link">Trac My Music</a>
                <a href="#" className="footer-link">Community Support</a>
                <a href="#" className="footer-link">Community Guidelines</a>
                <a href="#" className="footer-link">Help</a>
                </div>

                <div className="footer-section">
                <h3>GOODIES</h3>
                <a href="#" className="footer-link">Download Scrobbler</a>
                <a href="#" className="footer-link">Developer API</a>
                <a href="#" className="footer-link">Free Music Downloads</a>
                <a href="#" className="footer-link">Marchandize</a>
                </div>

                <div className="footer-section">
                <h3>ACCOUNT</h3>
                <a href="#" className="footer-link">Inbox</a>
                <a href="#" className="footer-link">Settings</a>
                <a href="#" className="footer-link">Last.fm Pro</a>
                <a href="#" className="footer-link">Logout</a>
                </div>

                <div className="footer-section">
                <h3>FOLLOW US</h3>
                <a href="#" className="footer-link">Facebook</a>
                <a href="#" className="footer-link">Twitter</a>
                <a href="#" className="footer-link">Instagram</a>
                <a href="#" className="footer-link">YouTube</a>
                </div>
            </div>

            <div className="language-selector">
                <span>English</span>
                <span>Deutsch</span>
                <span>Español</span>
                <span>Français</span>
                <span>Italiano</span>
                <span>日本語</span>
                <span>Polski</span>
                <span>Português</span>
                <span>Русский</span>
                <span>Svenska</span>
                <span>Türkiye</span>
                <span>简体中文</span>
            </div>

            <div className="copyright">
                Time zone: Europe/Moscow<br/>
                CBS Interactive © 2022 Last.fm Ltd. All rights reserved. 
                Terms of Use · Privacy Policy · Legal Policies · Cookies Policy · Do Not Sell My Personal Information
            </div>
        </footer>
    );
}