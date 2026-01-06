export default function AdminFooter(){
    return (
        <footer className="content-footer footer bg-footer-theme">
              <div className="container-xxl d-flex flex-wrap justify-content-between py-2 flex-md-row flex-column">
                <div className="mb-2 mb-md-0">
                  © {new Date().getFullYear()}, fait avec ❤️ by{' '}
                  <a 
                    href="https://www.linkedin.com/in/ophélie-andzala/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="footer-link fw-bolder"
                  >
                  Coffe tek
                  </a>
                </div>
              </div>
            </footer>
    );
}